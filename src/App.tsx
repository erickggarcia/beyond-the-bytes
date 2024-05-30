import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import './globals.css'
import { GlobalStyle } from './globals'

export function App() {

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Router/>
    </BrowserRouter>
  )
}

