import type {
	CreateSprintDto,
	Sprint,
	UpdateSprintDto,
} from '@/features/sprints/types'
import { apiFetch } from './client'

export const sprintsApi = {
	getAll: () => apiFetch<Sprint[]>('/admin/sprints'),
	getById: (id: string) => apiFetch<Sprint>(`/admin/sprints/${id}`),
	create: (data: CreateSprintDto) =>
		apiFetch<Sprint>('/admin/sprints', { method: 'POST', data }),
	update: (id: string, data: UpdateSprintDto) =>
		apiFetch<Sprint>(`/admin/sprints/${id}`, { method: 'PUT', data }),
	delete: (id: string) =>
		apiFetch<void>(`/admin/sprints/${id}`, { method: 'DELETE' }),
}
