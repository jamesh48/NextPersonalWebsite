#!/usr/bin/env node
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env' })
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { PersonalWebsiteStack } from '../lib/personal-website-stack'

const app = new cdk.App()

const { AWS_ACCOUNT_NUMBER, AWS_ACM_CERTIFICATE_ARN, CDK_REGION } = process.env

if (!AWS_ACCOUNT_NUMBER) {
	throw new Error('AWS_ACCOUNT_NUMBER env does not exist!')
}

if (!AWS_ACM_CERTIFICATE_ARN) {
	throw new Error('AWS_ACM_CERTIFICATE_ARN env does not exist!')
}

if (!CDK_REGION) {
	throw new Error('CDK_REGION env does not exist!')
}

new PersonalWebsiteStack(app, 'PersonalWebsiteStack', {
	aws_env: {
		AWS_ACM_CERTIFICATE_ARN,
	},
	env: {
		account: AWS_ACCOUNT_NUMBER,
		region: CDK_REGION,
	},
})
