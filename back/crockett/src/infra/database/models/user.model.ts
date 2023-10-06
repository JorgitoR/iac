import { Model, Column, Table, ForeignKey } from 'sequelize-typescript'
import { Staff } from './'

@Table({ tableName: 'users' })
export class User extends Model<User> {
	@Column({ primaryKey: true, autoIncrement: true, unique: true })
	id: number

	@Column({ unique: true, allowNull: false })
	username: string

	@Column({
		unique: true,
	})
	email: string

	@Column
	password: string

	@Column({ field: 'firstLogin', defaultValue: true })
	firstLogin: boolean

	@Column({ field: 'userType', defaultValue: 'standard' })
	userType: string

	@Column({ field: 'login_attempts', defaultValue: 0 })
	login_attempts: number

	@Column({ field: 'blocked', defaultValue: false })
	blocked: boolean

	@Column({ field: 'status', defaultValue: 'Active' })
	status: string

	@Column({ field: 'accessPortal', defaultValue: 'No' })
	accessPortal: string

	@Column({ field: 'accessMobile', defaultValue: 'No' })
	accessMobile: string

	@ForeignKey(() => Staff)
	@Column({
		field: 'staff_id',
		allowNull: false,
		unique: true,
		type: 'integer',
		references: { model: 'staff', key: 'id' },
		onDelete: 'CASCADE',
	})
	staff_id: number
}
