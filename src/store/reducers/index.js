import { combineReducers } from 'redux'

import authReducer, { authInitialState } from './auth'
import apiReducer, { apiInitialState } from './api'

export default combineReducers({
  auth: authReducer,
  api: apiReducer,
})

export const initialState = {
  auth: authInitialState,
  api: apiInitialState,
}
