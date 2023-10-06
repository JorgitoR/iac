import { Module } from '@nestjs/common'
import { PostgresAdapter } from 'infra/database/postgres.adapter'

@Module({
	providers: [PostgresAdapter],
	exports: [PostgresAdapter],
})
export class DatabaseModule {}
