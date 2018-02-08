import baseReducer from './helpers/base'
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from '../actionTypes/auth'

const loginSuccess = (state, payload) => {
  return {
    ...state,
    isLogged: true,
    loggedUser: payload,
  }
}

const registerSuccess = (state, payload) => {
  return {
    ...state,
    isLogged: true,
    loggedUser: payload,
  }
}

const reducers = {
  [LOGIN_SUCCESS]: loginSuccess,
  [REGISTER_SUCCESS]: registerSuccess,
}

const authInitialState = {
  isLogged: false,
  loggedUser: {},
}

export default baseReducer(reducers, authInitialState)

export { authInitialState }
