import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios, { type AxiosError } from 'axios'
import { handleApiError } from './errors'

const ensureApiBaseUrl = (): string => {
	const baseUrl = import.meta.env.VITE_API_URL?.trim()
	if (!baseUrl) {
		throw new Error('API URL не задан (VITE_API_URL)')
	}
	return baseUrl
}

export const apiClient: AxiosInstance = axios.create({
	headers: { 'Content-Type': 'application/json' },
	timeout: 30000,
})

apiClient.interceptors.request.use(config => {
	config.baseURL = config.baseURL ?? ensureApiBaseUrl()

	const authData = localStorage.getItem('admin_auth')
	if (authData) {
		try {
			const { username, password } = JSON.parse(authData)
			if (username && password) {
				const credentials = btoa(`${username}:${password}`)
				config.headers.Authorization = `Basic ${credentials}`
			}
		} catch (error) {
			console.error('Ошибка парсинга данных авторизации:', error)
			localStorage.removeItem('admin_auth')
			localStorage.removeItem('admin_authenticated')
		}
	}

	return config
})

apiClient.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('admin_auth')
			localStorage.removeItem('admin_authenticated')
		}
		return Promise.reject(handleApiError(error))
	}
)

export async function apiFetch<TResponse = unknown>(
	path: string,
	config?: AxiosRequestConfig
): Promise<TResponse> {
	const response = await apiClient.request<TResponse>({
		url: path,
		...config,
	})
	return response.data
}
