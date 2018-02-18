import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { applySpec, pathOr } from 'ramda'

import AuthLayout from '../../layouts/auth'
import { login } from '../../store/actions/auth'
import SubmitButton from '../../components/SubmitButton'
import TextField from '../../components/TextField'
import ApiMessage from '../../components/ApiMessage'
import withRoot from '../../withRoot'

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
    const { location, loginApiResponse, isLogged } = this.props
    const { submitted } = this.state

    if (isLogged) {
      const redirectTo = getRedirectRoute(location)
      return (
        <Redirect to={redirectTo}/>
      )
    }

    return (
      <AuthLayout>
        <ApiMessage apiResponse={loginApiResponse} />
        <Typography
          align='center'
          gutterBottom={true}
          type='display1'
        >
          {isLogged ? 'Logout' : 'Login'}
        </Typography>
        <TextField
          autoFocus={true}
          fullWidth
          onPressEnter={this.loginAction}
          fieldName='email'
          apiResponse={loginApiResponse}
          type="text"
          helperText='Enter your email'
          onChange={this.setStateParam('email')}
        />
        <br/>
        <TextField
          type="password"
          onPressEnter={this.loginAction}
          fullWidth
          fieldName='password'
          apiResponse={loginApiResponse}
          helperText='Enter your password'
          onChange={this.setStateParam('password')}
        />
        <br/>
        <br/>
        <SubmitButton
          isLoading={submitted}
          onClick={this.loginAction}>
          Login
        </SubmitButton>
        <Button component={Link} to='/auth/register'>
          Register
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
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    loginApiResponse: state.api.modules.login,
  }
}

const mapDispatchToProps = applySpec({
  login,
})

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(Login))
