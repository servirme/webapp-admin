import baseReducer from './helpers/base'
import {
  MODULE_REQUEST,
} from '../actionTypes/api'

const onModuleRequest = (state, { error, module, response }) => {
  return {
    ...state,
    modules: {
      ...state.modules,
      [module]: {
        error,
        response,
      },
    },
  }
}

const reducers = {
  [MODULE_REQUEST]: onModuleRequest,
}

const apiInitialState = {
  language: window.navigator.language,
  modules: {},
}

export default baseReducer(reducers, apiInitialState)

export { apiInitialState }
