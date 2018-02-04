import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

class ApiMessage extends Component {
  state = {
    open: false,
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentWillReceiveProps() {
    this.setState({ open: true })
  }

  render() {
    const { apiResponse } = this.props

    if (!apiResponse.response) {
      return null
    }

    const apiResponseMessage = apiResponse.response.message
    const { open } = this.state

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={this.handleClose}
        open={open}
        autoHideDuration={3000}
        message={apiResponseMessage}
      >
      </Snackbar>
    )
  }
}

ApiMessage.propTypes = {
  apiResponse: PropTypes.object,
}

ApiMessage.defaultProps = {
  apiResponse: {},
}

export default ApiMessage
