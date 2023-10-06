import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Bucket} from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

export class InfraStackS3 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
        if (process.env.S3_BUCKET !== undefined && process.env.S3_VERSIONING) {

            console.log('Deploy our static web site 🚀')
            // hosted zone and route53 features
            const zoneName = String(process.env.DOMAIN_NAME);

            // hosted zone for adding appsync domain
            const zone = route53.HostedZone.fromHostedZoneAttributes(this, `HostedZone`, {
                zoneName,
                hostedZoneId: String(process.env.HOSTED_ZONE_ID)
            });

            const siteDomain = String(process.env.SITE_SUB_DOMAIN) + '.' + String(process.env.DOMAIN_NAME)

            const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, 'cloudfront-OAI'+String(process.env.S3_BUCKET), {
                comment: `OAI for ${id}`
            })
            
            const s3Bucket = new Bucket(this, String(process.env.PRJ_NAME).replace(/ /g, '') + String(process.env.S3_BUCKET).replace(/ /g, '') + 'Bucket', {
                versioned: (String(process.env.S3_VERSIONING) === 'true'),
                bucketName: String(process.env.S3_BUCKET),
                publicReadAccess: false,
                blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
                removalPolicy: cdk.RemovalPolicy.DESTROY,
            });

            // grant access to cloudfront
            s3Bucket.addToResourcePolicy(new iam.PolicyStatement({
                actions: ['s3:GetObject'],
                resources: [s3Bucket.arnForObjects('*')],
                principals: [new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
            }));
            new cdk.CfnOutput(this,  'BucketName' + String(process.env.S3_BUCKET), { value: s3Bucket.bucketName });

            // TLS Certificate
            const certificate =  new acm.DnsValidatedCertificate(this, 'SiteCertificate'+String(process.env.S3_BUCKET), {
                domainName: siteDomain,
                hostedZone: zone,
                region: 'us-east-1' // cloudfront only checks this region for certificates
            });
            new cdk.CfnOutput(this, 'Certificate', {value: certificate.certificateArn});

            // url domain site
            const slice = String(s3Bucket.bucketWebsiteUrl)
            const urlDomain = slice.slice(7, )

            // Cludfront distribution
            const distribution = new cloudfront.Distribution(this, 'siteDistrobution'+String(process.env.S3_BUCKET), {
                certificate: certificate,
                defaultRootObject: "index.html",
                domainNames: [siteDomain],
                minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
                errorResponses:[
                    {
                        httpStatus:403,
                        responseHttpStatus: 403,
                        responsePagePath: '/index.html',
                        ttl: cdk.Duration.minutes(1),
                    }
                ],

                defaultBehavior: {
                    origin: new cloudfront_origins.S3Origin(s3Bucket, {originAccessIdentity: cloudfrontOAI}),
                    compress: true,
                    cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED
                },
                additionalBehaviors: {

                }
            });
            new cdk.CfnOutput(this, 'DistributionID', {value: distribution.distributionId})

            // Route53 alias record for the cloudfront distribution
            const route = new route53.CnameRecord(this, String(process.env.S3_BUCKET), {
                recordName: siteDomain,
                domainName: distribution.distributionDomainName,
                zone: zone
            });
        }

    }
}