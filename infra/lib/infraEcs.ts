import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins'

export class InfraEcs extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		console.log('Deploy infra AWS ECS 🚀')

		// hosted zone and route53 features
		const zoneName = String(process.env.DOMAIN_NAME)

		// hosted zone for adding appsync domain
		const zone = route53.HostedZone.fromHostedZoneAttributes(
			this,
			`HostedZone`,
			{
				zoneName,
				hostedZoneId: String(process.env.HOSTED_ZONE_ID),
			}
		)

		const siteDomain =
			String(process.env.SITE_SUB_DOMAIN) +
			'.' +
			String(process.env.DOMAIN_NAME)

		const stack = new cdk.Stack(scope, 'techEnabled', {
			env: {
				account: process.env.ACCOUNT_ID,
				region: process.env.REGION,
			},
		})
		const vpc = new ec2.Vpc(stack, 'vpc-net-whitelabel', {
			cidr: '10.1.0.0/16',
			subnetConfiguration: [
				{
					cidrMask: 24,
					subnetType: ec2.SubnetType.PUBLIC,
					name: 'public whitelabel',
				},
			],
			maxAzs: 2,
			vpcName: 'vpc-net-whitelabel',
		})

		const cluster = new ecs.Cluster(stack, 'TechEnable-whitelabel', {
			clusterName: 'TechEnable-whitelabel',
			vpc: vpc,
		})

		let arnBucket: string = 'arn:aws:s3:::d482407636571'

		/*
           
            if(process.env.S3_BUCKET != undefined && process.env.S3_BUCKET_BACK){
                console.log('deploy our s3 bucket 🚀')
                const stackS3 = new cdk.Stack(scope, 'Stack'+String(process.env.S3_BUCKET_BACK), {
                    env: {
                        account: process.env.ACCOUNT_ID,
                        region: process.env.REGION
                    }
                })

                const s3Bucket = new Bucket(stackS3, String(process.env.S3_BUCKET_BACK)+'Bucket', {
                    bucketName: String(process.env.S3_BUCKET_BACK),
                    publicReadAccess: true,
                    removalPolicy: cdk.RemovalPolicy.DESTROY
                });
    
                // grant access to fargate service
                s3Bucket.addToResourcePolicy(new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        "s3:PutObject",
                        "s3:PutObjectAcl",
                        "s3:GetObject",
                        "s3:GetObjectAcl",
                        "s3:AbortMultipartUpload"
                    ],
                    resources: [
                        s3Bucket.bucketArn, 
                        s3Bucket.bucketArn + '/*'
                    ],
                    principals: [new iam.AccountRootPrincipal()],
                }));
                new cdk.CfnOutput(this,  'BucketName' + String(process.env.S3_BUCKET_BACK), { value: s3Bucket.bucketName });
                
                arnBucket = s3Bucket.bucketArn;
            }
            */

		const rolePolicy = new iam.PolicyStatement({
			effect: iam.Effect.ALLOW,
			resources: ['*'],
			actions: [
				'ecr:GetAuthorizationToken',
				'ecr:BatchCheckLayerAvailability',
				'ecr:GetDownloadUrlForLayer',
				'ecr:BatchGetImage',
				'logs:CreateLogStream',
				'logs:PutLogEvents',
			],
		})

		if (process.env.INFRA_STACK_NAME !== undefined) {
			const fargateTaskD = new ecs.FargateTaskDefinition(
				this,
				'Task' + String(process.env.ECR_REPOSITORY),
				{
					memoryLimitMiB: 512,
					cpu: 256,
				}
			)
			fargateTaskD.addToExecutionRolePolicy(rolePolicy)
			fargateTaskD.addToTaskRolePolicy(
				new iam.PolicyStatement({
					effect: iam.Effect.ALLOW,
					resources: [arnBucket],
					actions: ['s3:*'],
				})
			)

			const container = fargateTaskD.addContainer(
				String(process.env.ECR_REPOSITORY),
				{
					image: ecs.ContainerImage.fromRegistry(
						String(process.env.ECR_IMAGE_URI)
					),
					logging: ecs.LogDriver.awsLogs({
						streamPrefix: 'white-label' + String(process.env.ECR_REPOSITORY),
					}),
					environment: {
						NODE_ENV: String(process.env.NODE_ENV),
						PORT: String(process.env.PORT),
						SECRET_AUTH: String(process.env.SECRET_AUTH),
						PORTAL_NAME: String(process.env.PORTAL_NAME),
						URL_FRONTEND: String(process.env.URL_FRONTEND),
						DB_HOST: String(process.env.DB_HOST),
						DB_PORT: String(process.env.DB_PORT),
						DB_USER: String(process.env.DB_USER),
						DB_PASSWORD: String(process.env.DB_PASSWORD),
						DB_NAME: String(process.env.DB_NAME),
						SMTP_EMAIL: String(process.env.SMTP_EMAIL),
						SMTP_PASSWORD: String(process.env.SMTP_PASSWORD),
						AWS_S3_REGION: String(process.env.AWS_S3_REGION),
						AWS_S3_BUCKET_NAME: String(process.env.AWS_S3_BUCKET_NAME),
					},
				}
			)
			container.addPortMappings({
				containerPort: 3000,
			})

			const securityGroup = new ec2.SecurityGroup(
				this,
				'sg-' + String(process.env.ECR_REPOSITORY),
				{
					vpc: vpc,
					securityGroupName:
						'securityGroup' + String(process.env.ECR_REPOSITORY),
				}
			)
			securityGroup.addIngressRule(
				ec2.Peer.ipv4('0.0.0.0/0'),
				ec2.Port.tcp(3000)
			)

			// Service
			const service = new ecs.FargateService(
				this,
				'Service' + String(process.env.ECR_REPOSITORY),
				{
					serviceName: 'Service-' + String(process.env.ECR_REPOSITORY),
					taskDefinition: fargateTaskD,
					cluster: cluster,
					desiredCount: 1,
					assignPublicIp: true,
					securityGroups: [securityGroup],
				}
			)

			new cdk.CfnOutput(this, service + 'Stack', { value: service.serviceName })

			// Setup AutoScaling policy
			const scaling = service.autoScaleTaskCount({
				maxCapacity: 4,
				minCapacity: 2,
			})
			scaling.scaleOnCpuUtilization('CpuScaling', {
				targetUtilizationPercent: 50,
				scaleInCooldown: cdk.Duration.seconds(60),
				scaleOutCooldown: cdk.Duration.seconds(60),
			})

			// SSL/TSL certificate manager
			const certificate = new acm.DnsValidatedCertificate(
				this,
				'SiteCertificate' + String(process.env.S3_BUCKET),
				{
					domainName: siteDomain,
					hostedZone: zone,
					region: 'us-east-1', // cloudfront only checks this region for certificates
				}
			)
			certificate.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY)
			new cdk.CfnOutput(this, 'Certificate', {
				value: certificate.certificateArn,
			})

			// ALB and the fargate service associate
			const loadBalancer = new elbv2.ApplicationLoadBalancer(
				this,
				'ALB' + String(process.env.ECR_REPOSITORY),
				{
					vpc,
					loadBalancerName: 'ALB-' + String(process.env.ECR_REPOSITORY),
					internetFacing: true,
				}
			)

			const listener = loadBalancer.addListener('ListenerALB', {
				port: 80,
				open: true,
			})

			listener.addTargets('Target' + String(process.env.ECR_REPOSITORY), {
				port: 80,
				targetGroupName: String(process.env.ECR_REPOSITORY),
				targets: [service],
			})
			new cdk.CfnOutput(this, 'ALBDNS: ', {
				value: loadBalancer.loadBalancerDnsName,
			})
			listener.connections.allowDefaultPortFromAnyIpv4('Abierto a internet')

			// Cludfront distribution
			const distribution = new cloudfront.Distribution(
				this,
				'siteDistrobution' + String(process.env.ECR_REPOSITORY),
				{
					certificate: certificate,
					domainNames: [siteDomain],
					minimumProtocolVersion:
						cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
					defaultBehavior: {
						origin: new cloudfront_origins.LoadBalancerV2Origin(loadBalancer, {
							protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
						}),
						allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_ALL,
						//cachedMethods: cdk.aws_cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
					},
				}
			)
			new cdk.CfnOutput(this, 'DistributionID', {
				value: distribution.distributionId,
			})

			// Route 53
			const dns = loadBalancer.loadBalancerDnsName

			const route = new route53.CnameRecord(
				this,
				String(process.env.ECR_REPOSITORY),
				{
					recordName: siteDomain,
					domainName: distribution.distributionDomainName,
					zone: zone,
				}
			)
			new cdk.CfnOutput(this, 'Route' + String(process.env.ECR_REPOSITORY), {
				value: route.domainName,
			})
		}
	}
}
