import React from 'react'
import persistState from 'redux-localstorage'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { assocPath, mergeDeepRight, path } from 'ramda'
import { MuiThemeProvider } from 'material-ui/styles'

import AppRouter from './router'
import reducers, { initialState } from './store/reducers'
import './setup'
import NotificationMessage from './components/NotificationMessage'
import theme from './materializeTheme'

const pathsToPersist = [
  'api.language',
  'auth.isLogged',
  'auth.token',
]
const persistConfig = {
  merge: (initial, persisted) => {
    return mergeDeepRight(initial, persisted || {})
  },
  slicer: paths => state =>
    paths.reduce((subset, persistPath) => {
      const objPath = persistPath.split('.')
      const pathStateValue = path(objPath, state)

      return assocPath(objPath, pathStateValue, subset)
    }, {}),
}

const enhancer = compose(
  applyMiddleware(reduxThunk),
  persistState(pathsToPersist, persistConfig)
)

const store = createStore(
  reducers,
  initialState,
  enhancer
)

const App = () => {
  return (
    <Provider store={store}>
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
