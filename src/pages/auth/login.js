import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { translate } from 'react-i18next'
import {
  applySpec,
  compose,
  path,
  pathOr,
} from 'ramda'

import AuthLayout from '../../layouts/auth'
import { login } from '../../redux/actions/auth'
import SubmitButton from '../../components/SubmitButton'
import TextField from '../../components/TextField'

const getRedirectRoute = pathOr({ pathname: '/' }, ['state', 'from'])

class Login extends Component {
  state = {
    email: '',
    password: '',
    submitted: false,
  }

  loginAction = () => {
    this.setState({ submitted: true })
    const { email, password } = this.state
    return this.props.login(email, password)
      .tap(() => {
        this.setState({ submitted: false })
      })
  }

  render() {
    const {
      location,
      loginApiResponse,
      isLogged,
      t,
    } = this.props
    const { submitted } = this.state

    if (isLogged) {
      const redirectTo = getRedirectRoute(location)
      return (
        <Redirect to={redirectTo} />
      )
    }

    return (
      <AuthLayout>
        <Typography
          align='center'
          gutterBottom
          variant='display1'
        >
          {t('auth.login.header')}
        </Typography>
        <TextField
          autoFocus={true}
          fullWidth
          onPressEnter={this.loginAction}
          fieldName='email'
          apiResponse={loginApiResponse}
          type="text"
          helperText={t('input.email')}
          onChange={this.setStateParam('email')}
        />
        <TextField
          type="password"
          onPressEnter={this.loginAction}
          fullWidth
          fieldName='password'
          apiResponse={loginApiResponse}
          helperText={t('input.password')}
          onChange={this.setStateParam('password')}
        />
        <SubmitButton
          isLoading={submitted}
          onClick={this.loginAction}>
          {t('button.login')}
        </SubmitButton>
        <Button component={Link} to='/auth/register'>
          {t('button.register')}
        </Button>
      </AuthLayout>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  loginApiResponse: PropTypes.object,
  location: PropTypes.object,
  t: PropTypes.func.isRequired,
}

const mapStateToProps = applySpec({
  isLogged: path(['auth', 'isLogged']),
  loginApiResponse: path(['api', 'modules', 'login']),
})

const mapDispatchToProps = applySpec({
  login,
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate()
)

export default enhance(Login)
