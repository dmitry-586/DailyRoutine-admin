import { useAuth } from '@/shared/model/providers'
import { Button, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormData } from './schema'

export function Login() {
	const { login } = useAuth()
	const [apiError, setApiError] = useState('')

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = async (data: LoginFormData) => {
		setApiError('')
		try {
			await login(data.username, data.password)
		} catch (error) {
			console.error('[Login] Ошибка при входе:', error)
			const errorMessage =
				error instanceof Error
					? error.message.includes('API URL')
						? 'Ошибка конфигурации: не задан адрес API сервера'
						: error.message
					: 'Неверное имя пользователя или пароль'
			setApiError(errorMessage)
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-background p-4'>
			<div className='border-primary/20 w-full max-w-md rounded-lg border p-8 shadow-lg'>
				<h1 className='text-foreground mb-6 text-center text-2xl font-bold'>
					Вход в админ-панель
				</h1>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div>
						<label className='text-foreground mb-2 block text-sm font-medium'>
							Имя пользователя
						</label>
						<Input
							type='text'
							{...register('username')}
							placeholder='Введите имя пользователя'
							disabled={isSubmitting}
							autoFocus
							autoComplete='username'
							aria-invalid={errors.username ? 'true' : 'false'}
						/>
						{errors.username && (
							<p className='text-red mt-1 text-sm'>{errors.username.message}</p>
						)}
					</div>

					<div>
						<label className='text-foreground mb-2 block text-sm font-medium'>
							Пароль
						</label>
						<Input
							type='password'
							{...register('password')}
							placeholder='Введите пароль'
							disabled={isSubmitting}
							autoComplete='current-password'
							aria-invalid={errors.password ? 'true' : 'false'}
						/>
						{errors.password && (
							<p className='text-red mt-1 text-sm'>{errors.password.message}</p>
						)}
					</div>

					{apiError && (
						<div className='text-red rounded-lg bg-red/10 p-3 text-sm'>
							{apiError}
						</div>
					)}

					<Button type='submit' className='w-full' disabled={isSubmitting}>
						{isSubmitting ? 'Вход...' : 'Войти'}
					</Button>
				</form>
			</div>
		</div>
	)
}
