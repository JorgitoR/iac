import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

export class AWSInfraRDS extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		console.log('deploy our rds infra 🚀')
		const stack = new cdk.Stack(scope, 'InfraVpcRds', {
			env: {
				account: process.env.ACCOUNT_ID,
          		region: process.env.REGION
			}
		})
		// vpc
		const vpc = new ec2.Vpc(stack, 'vpc-net-whitelabel', {
			cidr: "10.1.0.0/16",
			natGateways: 0,
			subnetConfiguration: [
				{cidrMask:24, subnetType: ec2.SubnetType.PUBLIC, name:"public rds"},
			],
			maxAzs: 2,
			vpcName: "vpc-net-rds"
		});

		if(process.env.AWS_RDS !== undefined) {

			const arrDTB = String(process.env.RDS_INSTANCE).split(",")
			console.log('databases: ', arrDTB)
			for(let i=0; i<arrDTB.length; i++){
				// RDS instance
				const dbInstance = new rds.DatabaseInstance(this, 'Rds'+String(arrDTB[i]), {
					vpc, 
					vpcSubnets: {
						subnetType: ec2.SubnetType.PUBLIC,
					},
					engine: rds.DatabaseInstanceEngine.postgres({
						version: rds.PostgresEngineVersion.VER_14
					}),
					instanceType: ec2.InstanceType.of(
						ec2.InstanceClass.BURSTABLE3,
						ec2.InstanceSize.MICRO
					),
					credentials: rds.Credentials.fromGeneratedSecret(arrDTB[i], {
						secretName: 'dtb' + arrDTB[i]
					}),
					multiAz: false,
					allowMajorVersionUpgrade: false,
					autoMinorVersionUpgrade: true,
					backupRetention: cdk.Duration.days(0),
					deleteAutomatedBackups: true,
					removalPolicy: cdk.RemovalPolicy.DESTROY,
					deletionProtection: false,
					databaseName: arrDTB[i],
					publiclyAccessible: true
				});

				dbInstance.connections.allowDefaultPortFromAnyIpv4('Open to the public')
				new cdk.CfnOutput(this, 'rds'+String(arrDTB[i]), {
					value: dbInstance.instanceEndpoint.hostname
				});

				new cdk.CfnOutput(this, arrDTB[i], {
					value: dbInstance.secret?.secretName!,
				});
		}

		}
	}
}
