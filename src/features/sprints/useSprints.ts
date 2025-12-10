import { queryKeys, sprintsApi } from '@/shared/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateSprintDto, UpdateSprintDto } from './types'

export function useSprints() {
	return useQuery({
		queryKey: queryKeys.sprints.list(),
		queryFn: () => sprintsApi.getAll(),
	})
}

export function useSprint(id: string) {
	return useQuery({
		queryKey: queryKeys.sprints.detail(id),
		queryFn: () => sprintsApi.getById(id),
		enabled: !!id,
	})
}

export function useCreateSprint() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateSprintDto) => sprintsApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.sprints.lists() })
		},
	})
}

export function useUpdateSprint() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateSprintDto }) =>
			sprintsApi.update(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.sprints.lists() })
			queryClient.invalidateQueries({
				queryKey: queryKeys.sprints.detail(variables.id),
			})
		},
	})
}

export function useDeleteSprint() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => sprintsApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.sprints.lists() })
		},
	})
}
