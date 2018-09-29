import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  applySpec,
  compose,
  path,
  pathOr,
} from 'ramda'

import AuthLayout from '../../layouts/auth'
import { login } from '../../redux/actions/auth'
import LoginForm from '../../containers/LoginForm'

const getRedirectRoute = pathOr({ pathname: '/' }, ['state', 'from'])

class Login extends Component {
  render() {
    const {
      location,
      loginResponse,
      isLogged,
    } = this.props

    if (isLogged) {
      const redirectTo = getRedirectRoute(location)
      return (
        <Redirect to={redirectTo} />
      )
    }

    return (
      <AuthLayout>
        <LoginForm
          login={this.props.login}
          loginResponse={loginResponse}
        />
      </AuthLayout>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  loginResponse: PropTypes.object,
  location: PropTypes.object,
}

const mapStateToProps = applySpec({
  isLogged: path(['auth', 'isLogged']),
  loginResponse: path(['api', 'modules', 'login']),
})

const mapDispatchToProps = applySpec({
  login,
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Login)
