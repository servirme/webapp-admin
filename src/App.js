import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'

import AppRouter from './router'
import './setup'
import NotificationMessage from './components/NotificationMessage'
import theme from './materializeTheme'
import reduxStore from './redux'

const App = () => {
  return (
    <Provider store={reduxStore}>
      <MuiThemeProvider theme={theme}>
        <NotificationMessage />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

export default App
