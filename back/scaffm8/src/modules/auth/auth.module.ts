import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from 'infra/http/auth/auth.controller'
import { AuthService } from 'application/auth/auth.service'
import { AuthDtb } from 'infra/adapters/auth/dtb.adapters'
import { DatabaseModule } from 'modules/database/Database.module'
import { SmtpAdapter } from 'infra/smtp'

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('SECRET_AUTH'),
				signOptions: {
					expiresIn: 3600,
				},
			}),
			inject: [ConfigService],
		}),
		ConfigModule.forRoot(),
		DatabaseModule,
	],
	providers: [
		{ provide: 'AuthService', useClass: AuthService },
		{
			provide: 'IAuthRepository',
			useClass: AuthDtb,
		},
		SmtpAdapter,
	],
	controllers: [AuthController],
	exports: ['AuthService', 'IAuthRepository'],
})
export class AuthModule {}
