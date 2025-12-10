import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
	'flex w-full rounded-lg border-2 border-gray bg-muted px-3 py-2 text-sm text-foreground transition-all placeholder:text-light-gray focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			size: {
				default: 'h-9',
				sm: 'h-8 text-xs',
				lg: 'h-11',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
)

export type InputVariantProps = VariantProps<typeof inputVariants>
