import { ProtectedRoute } from '@/features/auth'
import { SprintsList } from '@/features/sprints'
import { AuthProvider, TanstackClientProvider } from '@/shared/model/providers'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './globals.css'

function App() {
	return (
		<AuthProvider>
			<TanstackClientProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={
								<ProtectedRoute>
									<SprintsList />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</TanstackClientProvider>
		</AuthProvider>
	)
}

export default App
