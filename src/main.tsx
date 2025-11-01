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
