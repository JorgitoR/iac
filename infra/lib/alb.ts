import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'

export class Alb {
	constructor(
		scope: Construct,
		vpc: cdk.aws_ec2.Vpc,
		service: cdk.aws_ecs.FargateService,
		ecRepo: string
	) {
		// stack cloudfront alb
		const alb = new cdk.Stack(scope, 'albstack', {
			env: {
				account: process.env.ACCOUNT_ID,
				region: process.env.REGION,
			},
		})

		// ALB and the fargate service associate
		const loadBalancer = new elbv2.ApplicationLoadBalancer(alb, 'ALB', {
			vpc,
			internetFacing: true,
		})

		const target = new elbv2.ApplicationTargetGroup(
			alb,
			'TargetGroup' + String(ecRepo),
			{
				port: 80,
				vpc: vpc,
				targetGroupName: String(ecRepo),
				targets: [service],
			}
		)

		const listener = loadBalancer.addListener('ListenerALB', {
			port: 80,
			defaultTargetGroups: [target],
			open: true,
		})

		new elbv2.ApplicationListenerRule(alb, 'rule' + String(ecRepo), {
			priority: 10,
			conditions: [
				elbv2.ListenerCondition.pathPatterns(['/' + String(ecRepo)]),
			],
			listener: listener,
			targetGroups: [target],
		})
		listener.connections.allowDefaultPortFromAnyIpv4('Abierto a internet')
	}
}
