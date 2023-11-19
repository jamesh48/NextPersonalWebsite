import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class PersonalWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const _fshService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'fsh-fullstack-hrivnak-alb',
      {
        vpc: ec2.Vpc.fromLookup(this, 'jh-imported-vpc', {
          vpcId: 'vpc-081edc60bd2157d7e',
        }),
        certificate: acm.Certificate.fromCertificateArn(
          this,
          'fsh-imported-certificate',
          'arn:aws:acm:us-east-1:471507967541:certificate/a1bf61c4-5380-40b8-99a5-4c0bf7d3212e'
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
            NEXT_PUBLIC_CLOUDFRONTLINK: 'https://d1y3bjxf7c78hf.cloudfront.net',
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
