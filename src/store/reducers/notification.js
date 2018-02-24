import { tail } from 'ramda'

import baseReducer from './helpers/base'
import { PUSH_NOTIFICATION, DISMISS_NOTIFICATION } from '../actionTypes/notifications'

const onAddNotification = (state, { message }) => {
  return {
    ...state,
    list: state.list.concat(message),
  }
}

const onDismissNotification = (state) => {
  return {
    ...state,
    list: tail(state.list),
  }
}

const reducers = {
  [PUSH_NOTIFICATION]: onAddNotification,
  [DISMISS_NOTIFICATION]: onDismissNotification,
}

const notificationInitialState = {
  list: [],
}

export default baseReducer(reducers, notificationInitialState)

export { notificationInitialState }
