import { Button, Input } from '@/shared/ui'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { CreateSprintDto } from './types'
import { useCreateSprint, useSprint, useUpdateSprint } from './useSprints'

interface SprintFormProps {
	sprintId?: string
	onSuccess: () => void
	onCancel: () => void
}

const defaultValues: CreateSprintDto = {
	title: '',
	description: '',
	reward: 0,
	total: 0,
}

export function SprintForm({ sprintId, onSuccess, onCancel }: SprintFormProps) {
	const { data: sprint } = useSprint(sprintId || '')
	const createSprint = useCreateSprint()
	const updateSprint = useUpdateSprint()

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<CreateSprintDto>({
		defaultValues,
	})

	useEffect(() => {
		if (!sprint) {
			reset(defaultValues)
			return
		}

		reset({
			title: sprint.title,
			description: sprint.description,
			reward: sprint.reward,
			total: sprint.total,
		})
	}, [reset, sprint])

	const onSubmit = (data: CreateSprintDto) => {
		if (sprintId) {
			updateSprint.mutate(
				{ id: sprintId, data },
				{ onSuccess: () => onSuccess() }
			)
		} else {
			createSprint.mutate(data, { onSuccess: () => onSuccess() })
		}
	}

	const isLoading =
		createSprint.isPending || updateSprint.isPending || isSubmitting

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div>
				<label className='text-foreground mb-2 block text-sm font-medium'>
					Название
				</label>
				<Input
					{...register('title', { required: true })}
					placeholder='Введите название спринта'
					disabled={isLoading}
				/>
			</div>

			<div>
				<label className='text-foreground mb-2 block text-sm font-medium'>
					Описание
				</label>
				<Input
					{...register('description', { required: true })}
					placeholder='Введите описание спринта'
					disabled={isLoading}
				/>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label className='text-foreground mb-2 block text-sm font-medium'>
						Награда
					</label>
					<Input
						type='number'
						{...register('reward', {
							required: true,
							valueAsNumber: true,
							min: 0,
						})}
						placeholder='0'
						min={0}
						disabled={isLoading}
					/>
				</div>

				<div>
					<label className='text-foreground mb-2 block text-sm font-medium'>
						Целевое значение
					</label>
					<Input
						type='number'
						{...register('total', {
							required: true,
							valueAsNumber: true,
							min: 1,
						})}
						placeholder='0'
						min={1}
						disabled={isLoading}
					/>
				</div>
			</div>

			<div className='flex justify-end gap-2 pt-4'>
				<Button
					type='button'
					variant='primary'
					onClick={onCancel}
					disabled={isLoading}
				>
					Отмена
				</Button>
				<Button type='submit' disabled={isLoading}>
					{sprintId ? 'Сохранить' : 'Создать'}
				</Button>
			</div>
		</form>
	)
}
