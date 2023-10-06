import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

@Injectable()
export class SmtpAdapter {
	private transporter: nodemailer.Transporter

	constructor(private configService: ConfigService) {
		const email = this.configService.get<string>('SMTP_EMAIL')
		const password = this.configService.get<string>('SMTP_PASSWORD')

		this.transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false,
			auth: {
				user: email,
				pass: password,
			},
			tls: {
				ciphers: 'SSLv3',
				rejectUnauthorized: false,
			},
		})
	}

	public async sendMail(to: string, subject: string, html: string) {
		const mailOptions: nodemailer.SendMailOptions = {
			from: this.configService.get<string>('SMTP_EMAIL'),
			to,
			subject,
			html,
		}
		return this.transporter.sendMail(mailOptions)
	}
}
