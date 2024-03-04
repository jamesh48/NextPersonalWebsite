import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

interface PersonalWebsiteStackProps extends cdk.StackProps {
  aws_env: {
    AWS_ACM_CERTIFICATE_ARN: string;
    AWS_CLUSTER_ARN: string;
    AWS_DEFAULT_SG: string;
    AWS_VPC_ID: string;
  };
  svc_env: {
    SVC_CLOUDFRONT_LINK: string;
  };
}

export class PersonalWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PersonalWebsiteStackProps) {
    super(scope, id, props);

    const fshFargateService = new ecs.FargateService(
      this,
      'fsh-fargate-service',
      {
        assignPublicIp: false,
        desiredCount: 1,
        capacityProviderStrategies: [
          {
            capacityProvider: 'FARGATE_SPOT',
            weight: 1,
          },
        ],
        taskDefinition: new ecs.FargateTaskDefinition(
          this,
          'fsh-task-definition',
          {
            taskRole: iam.Role.fromRoleName(
              this,
              'jh-ecs-task-definition-role',
              'jh-ecs-task-definition-role'
            ),
            executionRole: iam.Role.fromRoleName(
              this,
              'jh-ecs-task-execution-role',
              'jh-ecs-task-execution-role'
            ),
          }
        ),
        cluster: ecs.Cluster.fromClusterAttributes(
          this,
          'jh-imported-cluster',
          {
            securityGroups: [
              ec2.SecurityGroup.fromSecurityGroupId(
                this,
                'imported-default-sg',
                props.aws_env.AWS_DEFAULT_SG
              ),
            ],
            clusterName: 'jh-e1-ecs-cluster',
            clusterArn: props.aws_env.AWS_CLUSTER_ARN,
            vpc: ec2.Vpc.fromLookup(this, 'jh-imported-vpc', {
              vpcId: props.aws_env.AWS_VPC_ID,
            }),
          }
        ),
        enableExecuteCommand: true,
      }
    );

    const container = fshFargateService.taskDefinition.addContainer(
      'fsh-container',
      {
        environment: {
          NEXT_PUBLIC_CLOUDFRONTLINK: props.svc_env.SVC_CLOUDFRONT_LINK,
        },
        image: ecs.ContainerImage.fromAsset('code/src'),
        logging: new ecs.AwsLogDriver({
          streamPrefix: 'fsh-container',
          logRetention: RetentionDays.FIVE_DAYS,
        }),
      }
    );

    container.addPortMappings({
      containerPort: 80,
      hostPort: 80,
    });

    const importedALBListener = elbv2.ApplicationListener.fromLookup(
      this,
      'imported-listener',
      {
        listenerArn:
          'arn:aws:elasticloadbalancing:us-east-1:471507967541:listener/app/jh-alb/5927623bf7b387b8/202d118fecee2aa5',
      }
    );

    const targetGroup = new elbv2.ApplicationTargetGroup(this, 'fsh-tg', {
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [fshFargateService],
      vpc: ec2.Vpc.fromLookup(this, 'jh-imported-vpc-tg', {
        vpcId: props.aws_env.AWS_VPC_ID,
      }),
      healthCheck: {
        path: '/',
        unhealthyThresholdCount: 2,
        healthyHttpCodes: '200',
        healthyThresholdCount: 5,
        interval: cdk.Duration.seconds(30),
        port: '80',
        timeout: cdk.Duration.seconds(10),
      },
    });

    importedALBListener.addTargetGroups('fsh-listener-tg', {
      targetGroups: [targetGroup],
      priority: 10,
      conditions: [
        elbv2.ListenerCondition.hostHeaders([
          '*.fullstackhrivnak.com',
          'fullstackhrivnak.com',
        ]),
        elbv2.ListenerCondition.pathPatterns(['/', '/fullstack/*', '/_next/*']),
      ],
    });

    // const _fshService = new ecsPatterns.ApplicationLoadBalancedFargateService(
    //   this,
    //   'fsh-fullstack-hrivnak-alb',
    //   {
    //     certificate: acm.Certificate.fromCertificateArn(
    //       this,
    //       'fsh-imported-certificate',
    //       props.aws_env.AWS_ACM_CERTIFICATE_ARN
    //     ),
    //     cluster: ecs.Cluster.fromClusterAttributes(
    //       this,
    //       'fsh-imported-cluster',
    //       {
    //         securityGroups: [
    //           ec2.SecurityGroup.fromSecurityGroupId(
    //             this,
    //             'imported-default-sg',
    //             props.aws_env.AWS_DEFAULT_SG
    //           ),
    //         ],
    //         clusterName: 'jh-e1-ecs-cluster',
    //         clusterArn: props.aws_env.AWS_CLUSTER_ARN,
    //         vpc: ec2.Vpc.fromLookup(this, 'jh-imported-vpc', {
    //           vpcId: props.aws_env.AWS_VPC_ID,
    //         }),
    //       }
    //     ),
    //     loadBalancerName: 'fsh-fullstack-hrivnak-alb',
    //     redirectHTTP: true,
    //     assignPublicIp: true,
    //     taskImageOptions: {
    //       image: ecs.ContainerImage.fromAsset('code/src'),
    //       taskRole: iam.Role.fromRoleName(
    //         this,
    //         'jh-ecs-task-definition-role',
    //         'jh-ecs-task-definition-role'
    //       ),
    //       executionRole: iam.Role.fromRoleName(
    //         this,
    //         'jh-ecs-task-execution-role',
    //         'jh-ecs-task-execution-role'
    //       ),
    //       environment: {
    //         NEXT_PUBLIC_CLOUDFRONTLINK: props.svc_env.SVC_CLOUDFRONT_LINK,
    //       },
    //     },
    //     capacityProviderStrategies: [
    //       {
    //         capacityProvider: 'FARGATE_SPOT',
    //         weight: 1,
    //       },
    //     ],
    //     desiredCount: 1,
    //     enableExecuteCommand: true,
    //   }
    // );
  }
}
