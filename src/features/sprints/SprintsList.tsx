import { useAuth } from '@/shared/model/providers'
import { Button, Modal, PageHeader } from '@/shared/ui'
import { LogOut, Plus, Target } from 'lucide-react'
import { useState } from 'react'
import { SprintCard } from './SprintCard'
import { SprintForm } from './SprintForm'
import { useDeleteSprint, useSprints } from './useSprints'

export function SprintsList() {
	const { data: sprints, isLoading } = useSprints()
	const { logout } = useAuth()
	const deleteSprint = useDeleteSprint()
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [editingSprint, setEditingSprint] = useState<number | null>(null)

	if (isLoading) {
		return (
			<div className='flex items-center justify-center p-8'>
				<p className='text-light-gray'>Загрузка...</p>
			</div>
		)
	}

	return (
		<div className='mx-auto max-w-7xl p-6'>
			<div className='mb-6 flex items-center justify-between'>
				<PageHeader
					title='Управление спринтами'
					description='Создавайте и управляйте спринтами для пользователей'
					icon={Target}
				/>
				<div className='flex gap-2'>
					<Button onClick={() => setIsCreateModalOpen(true)}>
						<Plus className='h-4 w-4' />
						Создать спринт
					</Button>
					<Button variant='primary' onClick={logout}>
						<LogOut className='h-4 w-4' />
						Выход
					</Button>
				</div>
			</div>

			{!sprints?.length ? (
				<div className='border-primary/20 rounded-lg border p-12 text-center'>
					<Target className='text-primary mx-auto mb-4 h-12 w-12 opacity-50' />
					<p className='text-light-gray mb-2 text-lg'>Спринты не найдены</p>
					<p className='text-light-gray text-sm'>
						Создайте первый спринт, чтобы начать
					</p>
				</div>
			) : (
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{sprints.map(sprint => (
						<SprintCard
							key={sprint.id}
							sprint={sprint}
							onEdit={() => setEditingSprint(sprint.id)}
							onDelete={() => {
								if (
									confirm(
										`Вы уверены, что хотите удалить спринт "${sprint.title}"?`
									)
								) {
									deleteSprint.mutate(sprint.id)
								}
							}}
						/>
					))}
				</div>
			)}

			<Modal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				title='Создать спринт'
			>
				<SprintForm
					onSuccess={() => setIsCreateModalOpen(false)}
					onCancel={() => setIsCreateModalOpen(false)}
				/>
			</Modal>

			{editingSprint && (
				<Modal
					isOpen={!!editingSprint}
					onClose={() => setEditingSprint(null)}
					title='Редактировать спринт'
				>
					<SprintForm
						sprintId={editingSprint}
						onSuccess={() => setEditingSprint(null)}
						onCancel={() => setEditingSprint(null)}
					/>
				</Modal>
			)}
		</div>
	)
}
