import { Button, Input } from '@/shared/ui'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { CreateSprintDto } from './types'
import { useCreateSprint, useSprint, useUpdateSprint } from './useSprints'

interface SprintFormProps {
	sprintId?: number
	onSuccess: () => void
	onCancel: () => void
}

const defaultValues: CreateSprintDto = {
	title: '',
	description: '',
	type: 'all_habits',
	target_days: 7,
	coins_reward: 100,
}

export function SprintForm({ sprintId, onSuccess, onCancel }: SprintFormProps) {
	const { data: sprint } = useSprint(sprintId || 0)
	const createSprint = useCreateSprint()
	const updateSprint = useUpdateSprint()

	const {
		register,
		handleSubmit,
		reset,
		control,
		setValue,
		formState: { isSubmitting },
	} = useForm<CreateSprintDto>({
		defaultValues,
	})

	const sprintType = useWatch({ control, name: 'type' })

	useEffect(() => {
		if (!sprint) {
			reset(defaultValues)
			return
		}

		reset({
			title: sprint.title,
			description: sprint.description,
			type: sprint.type,
			target_days: sprint.target_days,
			coins_reward: sprint.coins_reward,
		})
	}, [reset, sprint])

	// Автоматически сбрасываем target_days на 0 при выборе типа new_habit
	useEffect(() => {
		if (sprintType === 'new_habit') {
			setValue('target_days', 0)
		}
	}, [sprintType, setValue])

	const onSubmit = (data: CreateSprintDto) => {
		const submitData: CreateSprintDto = {
			...data,
			target_days: data.type === 'new_habit' ? 0 : data.target_days,
		}

		if (sprintId) {
			updateSprint.mutate(
				{ id: sprintId, data: submitData },
				{ onSuccess: () => onSuccess() }
			)
		} else {
			createSprint.mutate(submitData, { onSuccess: () => onSuccess() })
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

			<div>
				<label className='text-foreground mb-2 block text-sm font-medium'>
					Тип спринта
				</label>
				<select
					{...register('type', { required: true })}
					disabled={isLoading}
					className='border-primary/20 bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2'
				>
					<option value='all_habits'>Выполнять все привычки N дней</option>
					<option value='new_habit'>Создать новую привычку</option>
				</select>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label className='text-foreground mb-2 block text-sm font-medium'>
						Награда (коины)
					</label>
					<Input
						type='number'
						{...register('coins_reward', {
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
						Целевое количество дней
					</label>
					<Input
						type='number'
						{...register('target_days', {
							required: true,
							valueAsNumber: true,
							min: 0,
						})}
						placeholder='0'
						min={0}
						disabled={isLoading || sprintType === 'new_habit'}
					/>
					{sprintType === 'new_habit' && (
						<p className='text-light-gray mt-1 text-xs'>
							Для типа "Создать новую привычку" всегда 0
						</p>
					)}
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
