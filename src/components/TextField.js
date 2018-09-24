import React from 'react'
import PropTypes from 'prop-types'
import { path } from 'ramda'
import MaterialUITextField from '@material-ui/core/TextField'

const TextField = ({
  apiResponse,
  helperText,
  fieldName,
  onPressEnter,
  ...props
}) => {
  const onKeyPress = onPressEnter ? (event) => {
    if (event.key === 'Enter') {
      onPressEnter()
    }
  } : null

  const fieldError = path(
    ['response', 'validationErrors', fieldName],
    apiResponse
  )
  return (
    <MaterialUITextField
      {...props}
      onKeyPress={onKeyPress}
      error={!!fieldError}
      label={fieldError || helperText}
    />
  )
}

TextField.propTypes = {
  apiResponse: PropTypes.object,
  helperText: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  onPressEnter: PropTypes.func,
}

TextField.defaultProps = {
  apiResponse: {},
}

export default TextField
