import type { InputHTMLAttributes } from 'react'

import type { InputVariantProps } from './config'

export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		InputVariantProps {}

export type { InputVariantProps }
