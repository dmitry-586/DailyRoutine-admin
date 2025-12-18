export type SprintType = 'all_habits' | 'new_habit'

export interface Sprint {
	id: number
	title: string
	description: string
	type: SprintType
	target_days: number
	coins_reward: number
	is_active: boolean
	created_at: string
	updated_at: string
}

export interface CreateSprintDto {
	title: string
	description: string
	type: SprintType
	target_days: number
	coins_reward: number
}

export interface UpdateSprintDto {
	title?: string
	description?: string
	type?: SprintType
	target_days?: number
	coins_reward?: number
	is_active?: boolean
}
