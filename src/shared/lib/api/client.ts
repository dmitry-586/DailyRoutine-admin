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
	return config
})

apiClient.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		return Promise.reject(handleApiError(error))
	}
)

export async function apiFetch<TResponse = unknown>(
	path: string,
	config?: AxiosRequestConfig
): Promise<TResponse> {
	try {
		const response = await apiClient.request<TResponse>({
			url: path,
			...config,
		})
		return response.data
	} catch (error) {
		throw handleApiError(error)
	}
}
