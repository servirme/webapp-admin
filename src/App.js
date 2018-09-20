import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { MuiThemeProvider } from 'material-ui/styles'

import './setup'
import AppRouter from './router'
import NotificationMessage from './components/NotificationMessage'
import theme from './materializeTheme'
import reduxStore from './redux'
import i18n from './i18n'

const App = () => {
  return (
    <Provider store={reduxStore}>
      <I18nextProvider i18n={i18n}>
        <MuiThemeProvider theme={theme}>
          <NotificationMessage />
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </MuiThemeProvider>
      </I18nextProvider>
    </Provider>
  )
}

export default App
