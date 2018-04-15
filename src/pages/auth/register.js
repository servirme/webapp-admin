import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { applySpec, path } from 'ramda'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'

import AuthLayout from '../../layouts/auth'
import { register } from '../../store/actions/auth'
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
    const { registerApiResponse } = this.props

    return (
      <AuthLayout>
        <Typography
          align='center'
          gutterBottom={true}
          type='display1'
        >
          Register
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
        <br/>
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
            />
          }
          label="Aceito os termos"
        />
        <br/>
        <SubmitButton
          onClick={this.registerAction}
          disabled={!acceptedTerms}
        >
          Register
        </SubmitButton>
        <Button component={Link} to='/auth/login'>
          Login
        </Button>
      </AuthLayout>
    )
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  registerApiResponse: PropTypes.object,
}

const mapStateToProps = applySpec({
  isLogged: path(['auth', 'isLogged']),
  registerApiResponse: path(['api', 'modules', 'register']),
})

const mapDispatchToProps = applySpec({
  register,
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
