import { cn } from '@/shared/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
	title: string
	description?: string
	icon?: LucideIcon
	className?: string
}

export function PageHeader({
	title,
	description,
	icon: Icon,
	className,
}: PageHeaderProps) {
	return (
		<div className={cn('mb-8', className)}>
			<div className='flex items-center gap-3'>
				{Icon && (
					<div className='bg-primary/20 shadow-primary/10 rounded-xl p-3 shadow-lg'>
						<Icon className='text-primary h-6 w-6' />
					</div>
				)}
				<div>
					<h1 className='text-3xl font-bold text-foreground'>{title}</h1>
					{description && (
						<p className='text-light-gray mt-1 text-sm'>{description}</p>
					)}
				</div>
			</div>
		</div>
	)
}
