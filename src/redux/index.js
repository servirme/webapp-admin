import { assocPath, mergeDeepRight, path } from 'ramda'
import { compose, createStore, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
import reduxThunk from 'redux-thunk'
import reducers, { initialState } from './reducers'

const pathsToPersist = [
  'api.language',
  'auth.isLogged',
  'auth.token',
]

const persistConfig = {
  merge: (initial, persisted) => {
    return mergeDeepRight(initial, persisted || {})
  },
  slicer: paths => state =>
    paths.reduce((subset, persistPath) => {
      const objPath = persistPath.split('.')
      const pathStateValue = path(objPath, state)

      return assocPath(objPath, pathStateValue, subset)
    }, {}),
}

const enhancer = compose(
  applyMiddleware(reduxThunk),
  persistState(pathsToPersist, persistConfig)
)

const reduxStore = createStore(
  reducers,
  initialState,
  enhancer
)

export default reduxStore
