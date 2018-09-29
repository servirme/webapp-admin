import { get } from './api'
import {
  USER_ESTABLISHMENTS,
} from '../actionTypes/user'

export const getEstablishments = dispatch => (email, password) =>
  get('/user/establishments', {
    dispatch,
    module: 'user',
    notificate: false,
    success: USER_ESTABLISHMENTS,
  })
