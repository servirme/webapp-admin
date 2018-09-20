import { combineReducers } from 'redux'

import authReducer, { authInitialState } from './auth'
import apiReducer, { apiInitialState } from './api'
import notificationReducer, { notificationInitialState } from './notification'

export default combineReducers({
  auth: authReducer,
  api: apiReducer,
  notifications: notificationReducer,
})

export const initialState = {
  auth: authInitialState,
  api: apiInitialState,
  notifications: notificationInitialState,
}
