import { cn } from '@/shared/lib/utils'
import { forwardRef } from 'react'
import { inputVariants } from './config'
import type { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, size, ...props }, ref) => (
		<input
			ref={ref}
			className={cn(inputVariants({ size, className }))}
			{...props}
		/>
	)
)

Input.displayName = 'Input'
