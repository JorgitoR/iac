import { Controller, Inject, Post, Body, HttpCode } from '@nestjs/common'
import { LoginDTO } from './login.dto'
import { IAuthService } from 'domain/auth'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResetPasswordDto } from './resetPassword.dto'
import { RequestResetPasswordDto } from './requestChangePassword.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		@Inject('AuthService') private readonly authService: IAuthService
	) {}

	@Post('/login')
	@ApiOperation({ summary: 'Login' })
	@ApiResponse({
		status: 200,
		description: 'Login Success',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, User or password incorrect',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async Login(@Body() body: LoginDTO) {
		const resultService = await this.authService.login(
			body.email,
			body.password
		)
		return resultService
	}

	@Post('/reset-password')
	@ApiOperation({ summary: 'Reset Password of the user' })
	@ApiResponse({
		status: 200,
		description: 'Password Changed',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async ResetPassword(@Body() body: ResetPasswordDto) {
		const resultService = await this.authService.resetPassword(
			body.password,
			body.token
		)
		return resultService
	}

	@Post('/request-password-reset')
	@ApiOperation({ summary: 'Request a password reset' })
	@ApiResponse({
		status: 200,
		description: 'Password Changed',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async RequestPasswordReset(@Body() body: RequestResetPasswordDto) {
		const resultService = await this.authService.requestPasswordReset(
			body.email
		)
		return resultService
	}

	@Post('/check-token-reset-password')
	@ApiOperation({ summary: 'Check if the token is valid' })
	@ApiResponse({
		status: 200,
		description: 'Token is valid',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized, The token provided is invalid',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal Server Error',
	})
	@HttpCode(200)
	async CheckTokenResetPassword(@Body() body: { token: string }) {
		const resultService = await this.authService.validateTokenPassword(
			body.token
		)
		return resultService
	}
}
