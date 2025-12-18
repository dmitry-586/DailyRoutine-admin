import { authApi } from '@/shared/lib/api'
import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

const AUTH_KEY = 'admin_authenticated'
const AUTH_DATA_KEY = 'admin_auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		return localStorage.getItem(AUTH_KEY) === 'true'
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		checkAuth()
	}, [])

	const checkAuth = async () => {
		const authData = localStorage.getItem(AUTH_DATA_KEY)
		if (!authData) {
			setIsAuthenticated(false)
			setIsLoading(false)
			return
		}

		try {
			await authApi.check()
			setIsAuthenticated(true)
			localStorage.setItem(AUTH_KEY, 'true')
		} catch (error) {
			console.error('[AuthProvider] Ошибка при проверке авторизации:', error)
			setIsAuthenticated(false)
			localStorage.removeItem(AUTH_KEY)
			localStorage.removeItem(AUTH_DATA_KEY)
		} finally {
			setIsLoading(false)
		}
	}

	const login = async (username: string, password: string) => {
		localStorage.setItem(AUTH_DATA_KEY, JSON.stringify({ username, password }))

		try {
			await authApi.check()
			setIsAuthenticated(true)
			localStorage.setItem(AUTH_KEY, 'true')
		} catch (error) {
			console.error('[AuthProvider] Ошибка при входе:', error)
			setIsAuthenticated(false)
			localStorage.removeItem(AUTH_KEY)
			localStorage.removeItem(AUTH_DATA_KEY)
			throw error
		}
	}

	const logout = () => {
		setIsAuthenticated(false)
		localStorage.removeItem(AUTH_KEY)
		localStorage.removeItem(AUTH_DATA_KEY)
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
