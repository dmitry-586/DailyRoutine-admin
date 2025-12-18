import { z } from 'zod'

export const loginSchema = z.object({
	username: z
		.string()
		.min(1, 'Имя пользователя обязательно')
		.min(3, 'Имя пользователя должно содержать минимум 3 символа')
		.max(50, 'Имя пользователя не должно превышать 50 символов'),
	password: z
		.string()
		.min(1, 'Пароль обязателен')
		.min(6, 'Пароль должен содержать минимум 6 символов'),
})

export type LoginFormData = z.infer<typeof loginSchema>
