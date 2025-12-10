import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	preview: {
		host: true,
		port: Number(process.env.PORT) || 4173,
		allowedHosts: ['admin.daily-routine.ru'],
	},
})
