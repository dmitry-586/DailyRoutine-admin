import { useAuth } from '@/shared/model/providers'
import { Login } from './Login'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<p className='text-light-gray'>Загрузка...</p>
			</div>
		)
	}

	if (!isAuthenticated) {
		return <Login />
	}

	return children
}
