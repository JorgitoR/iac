import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Bucket} from 'aws-cdk-lib/aws-s3';

export class InfraS3 extends cdk.Stack {

    constructor(scope: Construct, id?: string, props?: cdk.StackProps) {
        super(scope, id, props)
        console.log('deploy our s3');

        const resourcesArns = [];
        if (process.env.S3 && process.env.S3_NAMES && process.env.S3_VERSIONING) {
            const buckets = process.env.S3_NAMES.split(',');
            const s3Versioning = process.env.S3_VERSIONING.split(',');
            for (let i = 0; i < buckets.length; i++) {
              const s3Bucket = new Bucket(this, String(process.env.PRJ_NAME).replace(/ /g, '') + String(buckets[i]).replace(/ /g, '') + 'Bucket', {
                versioned: (s3Versioning[i] === 'true'),
                bucketName: buckets[i],
                publicReadAccess: false,
                removalPolicy: cdk.RemovalPolicy.DESTROY
              });
              resourcesArns.push(s3Bucket.bucketArn);
              resourcesArns.push(s3Bucket.bucketArn + '/*');
    
              new cdk.CfnOutput(this,  'BucketName' + String(buckets[i]), { value: s3Bucket.bucketName });
            }
    
        }
    }
}