import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export class PersonalWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const _fshService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'fsh-fullstack-hrivnak-alb',
      {
        // certificate,
        loadBalancerName: 'fsh-fullstack-hrivnak-alb',
        // redirectHTTP: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset('code/src'),
          environment: {
            NEXT_PUBLIC_CLOUDFRONTLINK: 'https://static.fullstackhrivnak.com',
          },
        },
        enableExecuteCommand: true,
      }
    );
  }
}
