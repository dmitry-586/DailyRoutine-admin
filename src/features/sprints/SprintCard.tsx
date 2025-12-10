import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { CheckCircle2, Circle, Edit, Trash2 } from 'lucide-react'
import type { Sprint } from './types'

interface SprintCardProps {
	sprint: Sprint
	onEdit: () => void
	onDelete: () => void
}

export function SprintCard({ sprint, onEdit, onDelete }: SprintCardProps) {
	const progress = Math.min((sprint.progress / sprint.total) * 100, 100)

	return (
		<div
			className={cn(
				'border-primary/20 hover:border-primary/40 hover:shadow-primary/10 rounded-lg border p-6 transition-all duration-200 hover:shadow-lg',
				!sprint.isActive && 'opacity-60'
			)}
		>
			<div className='mb-4 flex items-start justify-between'>
				<div className='flex-1'>
					<div className='mb-2 flex items-center gap-2'>
						<h3 className='text-lg font-bold text-foreground'>
							{sprint.title}
						</h3>
						{sprint.isActive ? (
							<CheckCircle2 className='text-green h-5 w-5' />
						) : (
							<Circle className='text-light-gray h-5 w-5' />
						)}
					</div>
					<p className='text-light-gray mb-3 text-sm'>{sprint.description}</p>
				</div>
			</div>

			<div className='mb-4'>
				<div className='mb-2 flex items-center justify-between text-sm'>
					<span className='text-light-gray'>Прогресс</span>
					<span className='text-foreground font-medium'>
						{sprint.progress} / {sprint.total}
					</span>
				</div>
				<div className='bg-muted h-2 overflow-hidden rounded-full'>
					<div
						className='bg-primary h-full transition-all duration-300'
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			<div className='mb-4 flex items-center justify-between'>
				<div>
					<span className='text-light-gray text-xs'>Награда</span>
					<p className='text-foreground text-lg font-bold'>
						{sprint.reward} очков
					</p>
				</div>
				<div>
					<span className='text-light-gray text-xs'>Статус</span>
					<p
						className={cn(
							'text-sm font-medium',
							sprint.isActive ? 'text-green' : 'text-light-gray'
						)}
					>
						{sprint.isActive ? 'Активен' : 'Неактивен'}
					</p>
				</div>
			</div>

			<div className='flex gap-2'>
				<Button variant='primary' size='sm' onClick={onEdit} className='flex-1'>
					<Edit className='h-4 w-4' />
					Редактировать
				</Button>
				<Button
					variant='danger'
					size='sm'
					onClick={onDelete}
					className='flex-1'
				>
					<Trash2 className='h-4 w-4' />
					Удалить
				</Button>
			</div>
		</div>
	)
}
