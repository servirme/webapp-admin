import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { applySpec, compose, path } from 'ramda'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import { translate } from 'react-i18next'

import AuthLayout from '../../layouts/auth'
import { register } from '../../redux/actions/auth'
import TextField from '../../components/TextField'
import SubmitButton from '../../components/SubmitButton'

class Register extends Component {
  state = {
    email: '',
    password: '',
    acceptedTerms: false,
    error: {
      email: false,
      password: false,
    },
  }

  toggleTerms = (event) => {
    this.setState({ acceptedTerms: event.target.checked })
  }

  registerAction = () => {
    const { email, password } = this.state
    return this.props.register(email, password)
  }

  render() {
    const { acceptedTerms } = this.state
    const { registerApiResponse, t } = this.props

    return (
      <AuthLayout>
        <Typography
          align='center'
          gutterBottom
          variant='display1'
        >
          {t('auth.register.header')}
        </Typography>
        <TextField
          fieldName='email'
          autoFocus={true}
          apiResponse={registerApiResponse}
          fullWidth
          type="text"
          helperText='Enter your email'
          onChange={this.setStateParam('email')}
        />
        <TextField
          fieldName='password'
          apiResponse={registerApiResponse}
          type="password"
          fullWidth
          helperText='Enter your password'
          onChange={this.setStateParam('password')}
        />
        <br/>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={this.toggleTerms}
              color="primary"
            />
          }
          label="Aceito os termos"
        />
        <br/>
        <SubmitButton
          onClick={this.registerAction}
          disabled={!acceptedTerms}
        >
          {t('button.register')}
        </SubmitButton>
        <Button component={Link} to='/auth/login'>
          {t('button.login')}
        </Button>
      </AuthLayout>
    )
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  registerApiResponse: PropTypes.object,
  t: PropTypes.func.isRequired,
}

const mapStateToProps = applySpec({
  isLogged: path(['auth', 'isLogged']),
  registerApiResponse: path(['api', 'modules', 'register']),
})

const mapDispatchToProps = applySpec({
  register,
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate()
)

export default enhance(Register)
