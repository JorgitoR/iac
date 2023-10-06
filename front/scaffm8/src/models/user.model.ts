export type UserType = 'standard' | 'Admin' | ''

export interface UserInfo {
	name: string
	email: string
	userType: UserType
	accessToken: string
}
