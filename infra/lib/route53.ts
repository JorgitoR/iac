import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { ClusterUtils } from './cluster';
import { Console } from 'console';

const clusterUtils = new ClusterUtils()
export class StackRoute53 extends cdk.Stack {
    constructor(scope?: Construct, id?: string, props?: cdk.StackProps){
        super(scope, id, props) 

        if(String(process.env.DOMAIN_NAME) !== undefined){
            console.log('Deploy our Route 53 🚀')
            const dominio = String(process.env.DOMAIN_NAME)
            const zoneID = String(process.env.HOSTED_ZONE_ID)
    
            const zone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
                zoneName: dominio,
                hostedZoneId: zoneID
            });
    
            const siteDomain = String(process.env.SITE_SUB_DOMAIN) + '.' + String(process.env.DOMAIN_NAME)
            console.log('domain: ', siteDomain)
            console.log('domain: ', String(process.env.DOMAIN_NAME))

            const certificate = new acm.DnsValidatedCertificate(this, 'SSL'+String(process.env.SITE_SUB_DOMAIN), {
                domainName: siteDomain,
                hostedZone: zone,
                region: 'us-east-1'
            });
            certificate.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY)
            
            new cdk.CfnOutput(this, 'Certificate', {
                value: certificate.certificateArn
            });

            this.getDomainOrigin().then((domainOrigin) => {
                console.log('dominio del ec2: ', domainOrigin)

                const distribution = new cloudfront.Distribution(
                    this,
                    'siteDistrobution' + String(process.env.IDENTIFIER_CLONE),
                    {
                        certificate: certificate,
                        domainNames: [siteDomain],
                        minimumProtocolVersion:
                            cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
                        defaultBehavior: {
                            origin: new cloudfront_origins.HttpOrigin(String(domainOrigin),  {
                                protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
                            }),
                            allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_ALL,
                            cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
                            originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN
                        },
                    }
                );
                new cdk.CfnOutput(this, 'DistributionID', {
                    value: distribution.distributionId,
                });
    
                // AWS Route 53
                const route = new route53.CnameRecord(this, 'route-'+String(process.env.IDENTIFIER_CLONE), {
                    recordName: siteDomain,
                    domainName: distribution.distributionDomainName,
                    zone: zone
                });
                new cdk.CfnOutput(this, 'Route' + String(process.env.IDENTIFIER_CLONE), {
                    value: route.domainName,
                });
            }).catch((error)=>{
                console.log('error en el Route 53: ', error)
            })
        }
    }

    async getDomainOrigin() {
        const taskArn = await clusterUtils.getClusterTasks()
        console.log('task arn: ', taskArn)
        const domainOrigin = await clusterUtils.getClusterTasksByLaunchTypeAndInstanceDNS(taskArn)
        return domainOrigin
    }
}