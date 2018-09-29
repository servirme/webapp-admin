import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'ramda'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { translate } from 'react-i18next'

import TextField from '../components/TextField'
import SubmitButton from '../components/SubmitButton'

class RegisterForm extends Component {
  state = {
    email: '',
    password: '',
    acceptedTerms: false,
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
    const {
      registerResponse,
      t,
    } = this.props

    return (
      <Fragment>
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
          apiResponse={registerResponse}
          fullWidth
          type="text"
          helperText='Enter your email'
          onChange={this.setStateParam('email')}
        />
        <TextField
          fieldName='password'
          apiResponse={registerResponse}
          type="password"
          fullWidth
          helperText='Enter your password'
          onChange={this.setStateParam('password')}
        />
        <br />
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
        <br />
        <SubmitButton
          onClick={this.registerAction}
          disabled={!acceptedTerms}
        >
          {t('button.register')}
        </SubmitButton>
        <Button component={Link} to='/auth/login'>
          {t('button.login')}
        </Button>
      </Fragment>
    )
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  registerResponse: PropTypes.object,
  t: PropTypes.func.isRequired,
}

const enhance = compose(
  translate()
)

export default enhance(RegisterForm)
