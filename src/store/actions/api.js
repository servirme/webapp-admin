import axios from 'axios'
import { assocPath, identity } from 'ramda'

import { MODULE_REQUEST } from '../actionTypes/api'
import ApiError from '../../Errors/ApiError'

const isProd = process.env.NODE_ENV === 'production'
const API_DOMAIN = isProd ? 'https://api.servir.me' : 'http://localhost:3000'

const instance = axios.create({
  baseURL: API_DOMAIN,
  timeout: 30000,
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

const request = (config, options = {}) => {
  const { dispatch } = options

  if (!dispatch) {
    return handleRequest(instance(config), options)
  }

  return new Promise((resolve, reject) => {
    options.dispatch((innerDispatch, getState) => {
      const state = getState()

      console.log(state.auth)
      let requestConfig = assocPath(['headers', 'Accept-Language'], state.api.language, config)
      requestConfig = assocPath(['headers', 'Token'], state.auth.token, requestConfig)

      console.log(requestConfig.headers)
      options.dispatch = innerDispatch

      handleRequest(instance(requestConfig), options)
        .then(resolve)
        .catch(reject)
    })
  })
}

export const post = (url, body, options) =>
  request({
    url,
    method: 'post',
    data: body,
  }, options)

export const put = (url, body, options) =>
  request({
    method: 'put',
    url,
    data: body,
  }, options)

export const get = (url, options) =>
  request({ method: 'get', url }, options)

export const del = (url, options) =>
  request({ method: 'delete', url }, options)
