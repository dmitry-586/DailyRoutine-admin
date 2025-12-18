import { createContext } from 'react'

export interface AuthContextType {
	isAuthenticated: boolean
	isLoading: boolean
	login: (username: string, password: string) => Promise<void>
	logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
