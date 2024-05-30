import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { GlobalStyle } from './globals'
import { DeliveryContextProvider } from './contexts/DeliveryContext'

export function App() {

  return (
    <BrowserRouter>
      <DeliveryContextProvider>
        <GlobalStyle />
        <Router />
      </DeliveryContextProvider>
    </BrowserRouter>
  )
}

