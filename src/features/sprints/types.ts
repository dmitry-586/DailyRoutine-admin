export interface Sprint {
	id: string
	title: string
	description: string
	reward: number
	progress: number
	total: number
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export interface CreateSprintDto {
	title: string
	description: string
	reward: number
	total: number
}

export interface UpdateSprintDto {
	title?: string
	description?: string
	reward?: number
	total?: number
	isActive?: boolean
}
