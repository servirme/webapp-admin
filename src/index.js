import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './App'
import reducers, { initialState } from './store/reducers'
import registerServiceWorker from './registerServiceWorker'
import './setup'

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(reduxThunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)

registerServiceWorker()
