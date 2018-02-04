const baseReducer = (reducers, initialState = {}) => {
  return (state = initialState, action) => {
    const { type, ...payload } = action
    const reducer = reducers[type]

    return reducer ? reducer(state, payload) : state
  }
}

export default baseReducer
