import { PUSH_NOTIFICATION, DISMISS_NOTIFICATION } from '../actionTypes/notifications'

export const apiResponseNotification = (dispatch, isError) => response =>
  dispatch({
    type: PUSH_NOTIFICATION,
    message: response.data.message,
    isError,
  })

export const pushNotification = dispatch => (message, isError) =>
  dispatch({
    type: PUSH_NOTIFICATION,
    message,
    isError,
  })

export const dismissNotification = dispatch => () =>
  dispatch({
    type: DISMISS_NOTIFICATION,
  })
