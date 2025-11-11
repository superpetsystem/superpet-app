import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from '@/components/ui/sonner'
import App from './App.tsx'
import { store, persistor } from './store/store'
import './styles/globals.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { muiTheme } from './theme/mui-theme'

async function bootstrap() {
  const useMock = (import.meta as any).env?.VITE_USE_MOCK === 'true'
  if (useMock) {
    const { startMocking } = await import('./mocks/setup')
    await startMocking()
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider theme={muiTheme}>
              <CssBaseline />
              <App />
              <Toaster />
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  )
}

bootstrap()
