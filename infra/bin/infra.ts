#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { InfraStackEcr } from '../lib/infraEcr'
import { InfraEcs } from '../lib/infraEcs'
import { InfraStackS3 } from '../lib/InfraFront'
import { AWSInfraRDS } from '../lib/infraRDS'
import { InfraEcsCompute } from '../lib/infraEcsCompute'
import { StackRoute53 } from '../lib/route53'

require('dotenv').config() 

const app = new cdk.App()
const env = app.node.tryGetContext('config')

switch (env) {
	case 'infraECR':
		const infraEcr = new InfraStackEcr(app, String(process.env.INFRA_STACK_NAME), {
		env: {
			account: process.env.ACCOUNT_ID,
			region: process.env.REGION
		}
		});
		taggingStack(infraEcr, 'pc-1', 'whitelabel', 'dev', 'cc-0001203', 'na', 'na')
    	break;

	case 'InfraRds':
		const infraRds = new AWSInfraRDS(app, String(process.env.INFRA_STACK_NAME), {
		env: {
			account: process.env.ACCOUNT_ID,
			region: process.env.REGION
		}
		});
		taggingStack(infraRds, 'pc-1', 'whitelabel', 'dev', 'cc-0001203', 'na', 'na')
    	break;

	case String(process.env.INFRA_ROUTE_CONFIG):
		const route = new StackRoute53(app, String(process.env.INFRA_ROUTE_STACK_NAME), {
			env: {
				account: process.env.ACCOUNT_ID,
				region: process.env.REGION,
			},
		});
		taggingStack(route, 'pc-1', 'whitelabel_ecs', 'dev', 'cc-0001203', 'na', 'na')
		break;
		
	case String(process.env.INFRA_ECS_CONFIG):
			const infraCompute = new InfraEcsCompute(app, String(process.env.INFRA_STACK_NAME), {
				env: {
					account: process.env.ACCOUNT_ID,
					region: process.env.REGION,
				},
			});
		taggingStack(infraCompute, 'pc-1', 'whitelabel_ecs', 'dev', 'cc-0001203', 'na', 'na')
		break;
  
   case String(process.env.INFRA_CONFIG_FRONT):
      const s3 = new InfraStackS3(app, String(process.env.INFRA_STACK_NAME), {
        env: {
          account: process.env.ACCOUNT_ID,
          region: process.env.REGION
        }
      });
      taggingStack(s3, 'pc-1', 'whitelabelS3', 'dev', 'cc-0001203', 'na', 'na')
      break;

	case String(process.env.INFRA_CONFIG_ECS):
		const infra = new InfraEcs(app, String(process.env.INFRA_STACK_NAME), {
			env: {
				account: process.env.ACCOUNT_ID,
				region: process.env.REGION,
			},
		})
		taggingStack(infra, 'pc-1', 'whitelabel', 'dev', 'cc-0001203', 'na', 'na')
		break

}

function taggingStack(
	stack: Construct,
	projectCode: string,
	businessService: string,
	projectName: string,
	environment: string,
	costCenter: string,
	schedule: string
) {
	cdk.Tags.of(stack).add('proyecto:project-code', projectCode)
	cdk.Tags.of(stack).add('soluntech:bussiness-service', businessService)
	cdk.Tags.of(stack).add('soluntech:project-name', projectName)
	cdk.Tags.of(stack).add('soluntech:environment', environment)
	cdk.Tags.of(stack).add('soluntech:cost-center', costCenter)
	cdk.Tags.of(stack).add('soluntech:shedule', schedule)
}
