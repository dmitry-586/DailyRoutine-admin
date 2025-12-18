import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios, { type AxiosError } from 'axios'
import { handleApiError } from './errors'

const ensureApiBaseUrl = (): string => {
	const baseUrl = import.meta.env.VITE_API_URL?.trim()
	if (!baseUrl) {
		const error = new Error(
			'API URL не задан (VITE_API_URL). Проверьте переменные окружения.'
		)
		console.error('[API Client]', error.message)
		console.error('[API Client] Доступные env переменные:', {
			VITE_API_URL: import.meta.env.VITE_API_URL,
			MODE: import.meta.env.MODE,
			DEV: import.meta.env.DEV,
			PROD: import.meta.env.PROD,
		})
		throw error
	}
	return baseUrl
}

export const apiClient: AxiosInstance = axios.create({
	headers: { 'Content-Type': 'application/json' },
	timeout: 30000,
})

apiClient.interceptors.request.use(
	config => {
		try {
			config.baseURL = config.baseURL ?? ensureApiBaseUrl()
		} catch (error) {
			console.error('[API Client] Ошибка при настройке baseURL:', error)
			return Promise.reject(error)
		}

		const authData = localStorage.getItem('admin_auth')
		if (authData) {
			try {
				const { username, password } = JSON.parse(authData)
				if (username && password) {
					const credentials = btoa(`${username}:${password}`)
					config.headers.Authorization = `Basic ${credentials}`
				}
			} catch (error) {
				console.error('[API Client] Ошибка парсинга данных авторизации:', error)
				localStorage.removeItem('admin_auth')
				localStorage.removeItem('admin_authenticated')
			}
		}

		return config
	},
	error => {
		console.error('[API Client] Ошибка в request interceptor:', error)
		return Promise.reject(error)
	}
)

apiClient.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('admin_auth')
			localStorage.removeItem('admin_authenticated')
		}

		// Логируем ошибки для отладки
		if (error.code === 'ERR_NETWORK' || !error.response) {
			console.error('[API Client] Сетевая ошибка:', {
				message: error.message,
				code: error.code,
				config: {
					url: error.config?.url,
					baseURL: error.config?.baseURL,
					method: error.config?.method,
				},
			})
		} else {
			console.error('[API Client] Ошибка ответа:', {
				status: error.response.status,
				statusText: error.response.statusText,
				data: error.response.data,
				url: error.config?.url,
			})
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
