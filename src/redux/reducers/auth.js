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
    token: payload.token,
  }
}

const registerSuccess = (state, payload) => {
  return {
    ...state,
    isLogged: true,
    token: payload.token,
  }
}

const logout = state => ({
  ...state,
  isLogged: false,
  token: false,
})

const reducers = {
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGOUT]: logout,
  [REGISTER_SUCCESS]: registerSuccess,
}

const authInitialState = {
  isLogged: false,
  loggedUser: null,
  token: '',
}

export default baseReducer(reducers, authInitialState)

export { authInitialState }
