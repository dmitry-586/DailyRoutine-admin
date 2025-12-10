import axios from 'axios'

export class ApiError extends Error {
	status: number
	data?: unknown

	constructor(message: string, status: number = 500, data?: unknown) {
		super(message)
		this.name = 'ApiError'
		this.status = status
		this.data = data
	}
}

export function handleApiError(error: unknown): ApiError {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status ?? 500
		const message =
			error.response?.data?.message ??
			error.message ??
			'Произошла ошибка при запросе'
		return new ApiError(message, status, error.response?.data)
	}

	if (error instanceof ApiError) {
		return error
	}

	if (error instanceof Error) {
		return new ApiError(error.message)
	}

	return new ApiError('Неизвестная ошибка')
}
