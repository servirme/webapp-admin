import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { applySpec, compose, path } from 'ramda'

import AuthLayout from '../../layouts/auth'
import { register } from '../../redux/actions/auth'
import RegisterForm from '../../containers/RegisterForm'

class RegisterPage extends Component {
  render() {
    const {
      isLogged,
    } = this.props

    if (isLogged) {
      return (
        <Redirect to={{ pathname: '/' }} />
      )
    }

    return (
      <AuthLayout>
        <RegisterForm
          register={this.props.register}
          registerResponse={this.props.registerResponse}
        />
      </AuthLayout>
    )
  }
}

RegisterPage.propTypes = {
  isLogged: PropTypes.bool,
  register: PropTypes.func.isRequired,
  registerResponse: PropTypes.object,
}

const mapStateToProps = applySpec({
  isLogged: path(['auth', 'isLogged']),
  registerApiResponse: path(['api', 'modules', 'register']),
})

const mapDispatchToProps = applySpec({
  register,
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(RegisterPage)
