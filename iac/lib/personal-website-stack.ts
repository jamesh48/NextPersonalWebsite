import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

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

    const _fshService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'fsh-fullstack-hrivnak-alb',
      {
        certificate: acm.Certificate.fromCertificateArn(
          this,
          'fsh-imported-certificate',
          props.aws_env.AWS_ACM_CERTIFICATE_ARN
        ),
        cluster: ecs.Cluster.fromClusterAttributes(
          this,
          'fsh-imported-cluster',
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
        loadBalancerName: 'fsh-fullstack-hrivnak-alb',
        redirectHTTP: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset('code/src'),
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
          environment: {
            NEXT_PUBLIC_CLOUDFRONTLINK: props.svc_env.SVC_CLOUDFRONT_LINK,
          },
        },
        capacityProviderStrategies: [
          {
            capacityProvider: 'FARGATE_SPOT',
            weight: 1,
          },
        ],
        desiredCount: 1,
        enableExecuteCommand: true,
      }
    );
  }
}
