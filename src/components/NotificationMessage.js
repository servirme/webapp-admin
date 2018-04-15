import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import { applySpec, path } from 'ramda'

import { dismissNotification } from '../store/actions/notifications'

class NotificationMessage extends Component {
  state = {
    open: true,
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
    this.props.dismissNotification()
  }

  componentWillReceiveProps() {
    this.setState({ open: true })
  }

  render() {
    const { notificationList } = this.props
    const { open } = this.state

    const [notification] = notificationList

    if (!notification) {
      return null
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        action={(
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        )}
        onClose={this.handleClose}
        open={open}
        autoHideDuration={1500}
        message={notification}
      />
    )
  }
}

NotificationMessage.propTypes = {
  notificationList: PropTypes.array.isRequired,
  dismissNotification: PropTypes.func.isRequired,
}

const mapStateToProps = applySpec({
  notificationList: path(['notifications', 'list']),
})

const mapDispatchToProps = applySpec({
  dismissNotification,
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationMessage)
