declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_ACCOUNT_NUMBER: string | undefined;
      AWS_ACM_CERTIFICATE_ARN: string | undefined;
      AWS_DEFAULT_SG: string | undefined;
      AWS_CLUSTER_ARN: string | undefined;
      AWS_VPC_ID: string | undefined;
      CDK_REGION: 'us-east-1' | 'us-east-2';
      SVC_CLOUDFRONT_LINK: string | undefined;
    }
  }
}

export {};
