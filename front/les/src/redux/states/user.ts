import { createSlice } from '@reduxjs/toolkit'
import { UserLocalStorageKey } from 'config/config'
import { UserInfo } from 'models'
import { clearLocalStorage, persistLocalStorage } from 'utilities'

export const EmptyUserState: UserInfo = {
	accessToken: '',
	email: '',
	name: '',
	userType: '',
}

export const persistLocalStorageUser = (userInfo: UserInfo) => {
	localStorage.setItem(UserLocalStorageKey, JSON.stringify({ ...userInfo }))
}

export const userSlice = createSlice({
	name: 'user',
	initialState: localStorage.getItem(UserLocalStorageKey)
		? JSON.parse(localStorage.getItem(UserLocalStorageKey) as string)
		: EmptyUserState,
	reducers: {
		createUser: (state, action) => {
			persistLocalStorage<UserInfo>(UserLocalStorageKey, action.payload)
			return action.payload
		},
		updateUser: (state, action) => {
			const result = { ...state, ...action.payload }
			persistLocalStorage<UserInfo>(UserLocalStorageKey, result)
			return result
		},
		resetUser: () => {
			clearLocalStorage(UserLocalStorageKey)
			return EmptyUserState
		},
	},
})

export const { createUser, updateUser, resetUser } = userSlice.actions
