import type {
	CreateSprintDto,
	Sprint,
	UpdateSprintDto,
} from '@/features/sprints/types'
import { apiFetch } from './client'

export const sprintsApi = {
	getAll: () => apiFetch<Sprint[]>('/sprints'),
	getById: (id: string) => apiFetch<Sprint>(`/sprints/${id}`),
	create: (data: CreateSprintDto) =>
		apiFetch<Sprint>('/sprints', { method: 'POST', data }),
	update: (id: string, data: UpdateSprintDto) =>
		apiFetch<Sprint>(`/sprints/${id}`, { method: 'PATCH', data }),
	delete: (id: string) =>
		apiFetch<void>(`/sprints/${id}`, { method: 'DELETE' }),
}
