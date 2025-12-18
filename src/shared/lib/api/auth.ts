import { sprintsApi } from './sprints'

export interface LoginCredentials {
	username: string
	password: string
}

export const authApi = {
	check: async () => {
		await sprintsApi.getAll()
		return true
	},
}
