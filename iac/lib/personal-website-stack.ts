import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as targets from 'aws-cdk-lib/aws-route53-targets'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import type { Construct } from 'constructs'

interface PersonalWebsiteStackProps extends cdk.StackProps {
	aws_env: {
		AWS_ACM_CERTIFICATE_ARN: string
	}
}

export class PersonalWebsiteStack extends cdk.Stack {
	public readonly distributionDomainName: string
	public readonly bucketName: string

	constructor(scope: Construct, id: string, props: PersonalWebsiteStackProps) {
		super(scope, id, props)

		// Create S3 bucket for static website hosting
		const websiteBucket = new s3.Bucket(this, 'fsh-website-bucket', {
			bucketName: `fsh-website-${this.account}-${this.region}`,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
			removalPolicy: cdk.RemovalPolicy.RETAIN, // Change to DESTROY for dev
			autoDeleteObjects: false, // Change to true for dev
			encryption: s3.BucketEncryption.S3_MANAGED,
		})

		// Import the ACM certificate
		// const certificate = acm.Certificate.fromCertificateArn(
		// 	this,
		// 	'imported-certificate',
		// 	props.aws_env.AWS_ACM_CERTIFICATE_ARN,
		// )

		const hostedZone = route53.HostedZone.fromLookup(this, 'fsh-hosted-zone', {
			domainName: 'fullstackhrivnak.com',
		})

		const certificate = new acm.Certificate(this, 'fsh-certificate', {
			domainName: 'fullstackhrivnak.com',
			subjectAlternativeNames: [
				// Covers www, static, and any future subdomains
				'*.fullstackhrivnak.com',
			],
			validation: acm.CertificateValidation.fromDns(hostedZone),
		})

		// Create Origin Access Control (OAC) for CloudFront to access S3
		const _oac = new cloudfront.CfnOriginAccessControl(this, 'fsh-oac', {
			originAccessControlConfig: {
				name: 'fsh-oac',
				originAccessControlOriginType: 's3',
				signingBehavior: 'always',
				signingProtocol: 'sigv4',
			},
		})

		// Create CloudFront distribution
		const distribution = new cloudfront.Distribution(this, 'fsh-distribution', {
			defaultBehavior: {
				origin: new origins.S3Origin(websiteBucket),
				viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
				allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
				cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
				compress: true,
			},

			defaultRootObject: 'index.html',
			domainNames: [
				'fullstackhrivnak.com',
				'www.fullstackhrivnak.com',
				'static.fullstackhrivnak.com',
			],
			certificate: certificate,
			minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
			errorResponses: [
				{
					httpStatus: 404,
					responseHttpStatus: 200,
					responsePagePath: '/index.html',
					ttl: cdk.Duration.minutes(5),
				},
				{
					httpStatus: 403,
					responseHttpStatus: 200,
					responsePagePath: '/index.html',
					ttl: cdk.Duration.minutes(5),
				},
			],
			priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
			enableLogging: false,
		})

		// Add bucket policy to allow CloudFront OAC access
		websiteBucket.addToResourcePolicy(
			new cdk.aws_iam.PolicyStatement({
				actions: ['s3:GetObject'],
				resources: [websiteBucket.arnForObjects('*')],
				principals: [
					new cdk.aws_iam.ServicePrincipal('cloudfront.amazonaws.com'),
				],
				conditions: {
					StringEquals: {
						'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
					},
				},
			}),
		)

		// Deploy the static website to S3
		new s3deploy.BucketDeployment(this, 'fsh-deploy-website', {
			sources: [s3deploy.Source.asset('code/src/out')],
			destinationBucket: websiteBucket,
			distribution: distribution,
			distributionPaths: ['/*'],
			memoryLimit: 512,
		})

		new route53.ARecord(this, 'fsh-alias-record', {
			zone: hostedZone,
			recordName: 'fullstackhrivnak.com',
			target: route53.RecordTarget.fromAlias(
				new targets.CloudFrontTarget(distribution),
			),
		})

		new route53.ARecord(this, 'fsh-www-alias-record', {
			zone: hostedZone,
			recordName: 'www.fullstackhrivnak.com',
			target: route53.RecordTarget.fromAlias(
				new targets.CloudFrontTarget(distribution),
			),
		})

		new route53.ARecord(this, 'fsh-static-alias-record', {
			zone: hostedZone,
			recordName: 'static.fullstackhrivnak.com',
			target: route53.RecordTarget.fromAlias(
				new targets.CloudFrontTarget(distribution),
			),
		})

		// Outputs
		this.distributionDomainName = distribution.distributionDomainName
		this.bucketName = websiteBucket.bucketName

		new cdk.CfnOutput(this, 'CloudFrontURL', {
			value: `https://${distribution.distributionDomainName}`,
			description: 'CloudFront distribution URL',
		})

		new cdk.CfnOutput(this, 'CloudFrontDistributionId', {
			value: distribution.distributionId,
			description: 'CloudFront distribution ID',
		})

		new cdk.CfnOutput(this, 'S3BucketName', {
			value: websiteBucket.bucketName,
			description: 'S3 bucket name',
		})
	}
}
