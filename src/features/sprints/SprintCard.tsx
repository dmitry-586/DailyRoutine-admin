import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { CheckCircle2, Circle, Edit, Trash2 } from 'lucide-react'
import { SPRINT_TYPE_LABELS } from './constants'
import type { Sprint } from './types'

interface SprintCardProps {
	sprint: Sprint
	onEdit: () => void
	onDelete: () => void
}

export function SprintCard({ sprint, onEdit, onDelete }: SprintCardProps) {
	return (
		<div
			className={cn(
				'border-primary/20 hover:border-primary/40 hover:shadow-primary/10 rounded-lg border p-6 transition-all duration-200 hover:shadow-lg',
				!sprint.is_active && 'opacity-60'
			)}
		>
			<div className='mb-4 flex items-start justify-between'>
				<div className='flex-1'>
					<div className='mb-2 flex items-center gap-2'>
						<h3 className='text-lg font-bold text-foreground'>
							{sprint.title}
						</h3>
						{sprint.is_active ? (
							<CheckCircle2 className='text-green h-5 w-5' />
						) : (
							<Circle className='text-light-gray h-5 w-5' />
						)}
					</div>
					<p className='text-light-gray mb-2 text-sm'>{sprint.description}</p>
					<span className='text-primary inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium'>
						{SPRINT_TYPE_LABELS[sprint.type] || sprint.type}
					</span>
				</div>
			</div>

			<div className='mb-4 flex items-center justify-between'>
				<div>
					<span className='text-light-gray text-xs'>Награда</span>
					<p className='text-foreground text-lg font-bold'>
						{sprint.coins_reward} коинов
					</p>
				</div>
				<div>
					<span className='text-light-gray text-xs'>Целевые дни</span>
					<p className='text-foreground text-lg font-bold'>
						{sprint.target_days}
					</p>
				</div>
			</div>

			<div className='mb-4'>
				<span className='text-light-gray text-xs'>Статус</span>
				<p
					className={cn(
						'text-sm font-medium',
						sprint.is_active ? 'text-green' : 'text-light-gray'
					)}
				>
					{sprint.is_active ? 'Активен' : 'Неактивен'}
				</p>
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
