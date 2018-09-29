import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { translate } from 'react-i18next'
import {
  compose,
} from 'ramda'

import SubmitButton from '../components/SubmitButton'
import TextField from '../components/TextField'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  loginAction = () => {
    const { email, password } = this.state
    return this.props.login(email, password)
  }

  render() {
    const {
      loginResponse,
      t,
    } = this.props

    return (
      <Fragment>
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
          fieldName='email'
          apiResponse={loginResponse}
          type="text"
          helperText={t('input.email')}
          onChange={this.setStateParam('email')}
        />
        <TextField
          type="password"
          fullWidth
          fieldName='password'
          apiResponse={loginResponse}
          helperText={t('input.password')}
          onChange={this.setStateParam('password')}
        />
        <SubmitButton
          onClick={this.loginAction}>
          {t('button.login')}
        </SubmitButton>
        <Button component={Link} to='/auth/register'>
          {t('button.register')}
        </Button>
      </Fragment>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  loginResponse: PropTypes.object,
  t: PropTypes.func.isRequired,
}

const enhance = compose(
  translate()
)

export default enhance(LoginForm)
