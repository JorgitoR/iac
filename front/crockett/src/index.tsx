import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import queryClient from 'context/queryClient'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import configureStore from 'redux/store'
import 'index.css'
import App from 'App'
import { ToastState } from './context/notifications/toastState'

//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css'

//core
import 'primereact/resources/primereact.min.css'

//icons
import 'primeicons/primeicons.css'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={configureStore}>
				<QueryClientProvider client={queryClient}>
					<ToastState>
						<App />
					</ToastState>
				</QueryClientProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>
)
