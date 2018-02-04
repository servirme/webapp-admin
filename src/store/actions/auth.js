import { post } from './api'
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from '../actionTypes/auth'

export const login = dispatch =>
  (email, password) => {
    const body = {
      email,
      password,
    }

    return post('/auth/login', body, {
      dispatch,
      module: 'login',
      success: LOGIN_SUCCESS,
    })
  }

export const register = dispatch =>
  (email, password) => {
    const body = {
      email,
      password,
    }

    return post('/auth/register', body, {
      dispatch,
      module: 'register',
      success: REGISTER_SUCCESS,
    })
  }
