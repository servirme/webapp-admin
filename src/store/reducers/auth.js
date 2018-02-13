import baseReducer from './helpers/base'
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
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

const logout = state => ({
  ...state,
  isLogged: false,
  loggedUser: {},
})

const reducers = {
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGOUT]: logout,
  [REGISTER_SUCCESS]: registerSuccess,
}

const authInitialState = {
  isLogged: false,
  loggedUser: {},
  token: '',
}

export default baseReducer(reducers, authInitialState)

export { authInitialState }
