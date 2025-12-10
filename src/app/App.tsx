import { SprintsList } from '@/features/sprints'
import TanstackClientProvider from '@/shared/model/providers/TanstackClientProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './globals.css'

function App() {
	return (
		<TanstackClientProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<SprintsList />} />
				</Routes>
			</BrowserRouter>
		</TanstackClientProvider>
	)
}

export default App
