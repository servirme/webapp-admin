import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ isLogged, component: Component, ...props }) => {
  const render = (innerProps) => {
    if (isLogged) {
      return (
        <Component {...innerProps}/>
      )
    }

    return (
      <Redirect to={{
        pathname: '/auth/login',
        state: { from: innerProps.location },
      }}/>
    )
  }

  return (
    <Route {...props} render={render}/>
  )
}

PrivateRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
})

export default connect(mapStateToProps)(PrivateRoute)
