export const queryKeys = {
	sprints: {
		all: ['sprints'] as const,
		lists: () => [...queryKeys.sprints.all, 'list'] as const,
		list: (filters?: Record<string, unknown>) =>
			[...queryKeys.sprints.lists(), filters] as const,
		details: () => [...queryKeys.sprints.all, 'detail'] as const,
		detail: (id: string) => [...queryKeys.sprints.details(), id] as const,
	},
} as const
