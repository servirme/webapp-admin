import axios from 'axios'
import { identity } from 'ramda'

import { MODULE_REQUEST } from '../actionTypes/api'
import ApiError from '../../Errors/ApiError'

const isProd = process.env.NODE_ENV === 'production'
const API_DOMAIN = isProd ? 'https://api.servir.me' : 'http://localhost:3000'

const instance = axios.create({
  baseURL: API_DOMAIN,
  timeout: 30000,
  headers: {
    'Accept-Language': 'pt-BR',
  },
})

const extractError = error => Promise.reject(new ApiError(error))

const apiModule = (dispatch, module, error) => response =>
  dispatch({
    type: MODULE_REQUEST,
    module,
    error,
    response: response.data,
  })

const dispatchEvent = (dispatch, type) => {
  return response => dispatch({ type, ...response.data })
}

const handleRequest = (promise, options = {}) => {
  const {
    before,
    success,
    error,
    dispatch,
    module,
  } = options

  if (before) {
    dispatch({ type: before })
  }

  let promiseEnhanced = promise
    .catch(extractError)

  if (module) {
    dispatch({ type: MODULE_REQUEST, module })

    promiseEnhanced = promiseEnhanced
      .tap(apiModule(dispatch, module, false))
      .tapCatch(apiModule(dispatch, module, true))
  }

  if (success) {
    promiseEnhanced = promiseEnhanced
      .tap(dispatchEvent(dispatch, success))
  }

  if (error) {
    promiseEnhanced = promiseEnhanced
      .tapCatch(dispatchEvent(dispatch, error))
  }

  return promiseEnhanced
    .catch(identity)
}

export const post = (url, body, options) => {
  return handleRequest(instance.post(url, body), options)
}

export const put = (url, body, options) => {
  return handleRequest(instance.put(url, body), options)
}

export const get = (url, options) => {
  return handleRequest(instance.get(url), options)
}

export const del = (url, options) => {
  return handleRequest(instance.delete(url), options)
}
