import React from 'react'
import reduxThunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import AppRouter from './router'
import reducers, { initialState } from './store/reducers'
import './setup'

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(reduxThunk)
)

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
