import React from 'react'
import {
  BrowserRouter,
} from 'react-router-dom'

import AppRouter from './router'

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App
