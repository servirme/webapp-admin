import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { applySpec, path } from 'ramda'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'

import { logout } from '../../store/actions/auth'

class UserAdminLayout extends Component {
  state = {
    anchorEl: null,
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { logoutAction } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={logoutAction}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

UserAdminLayout.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  logoutAction: PropTypes.func.isRequired,
}

const mapStateToProps = applySpec({
  loggedUser: path(['auth', 'loggedUser']),
})

const mapDispatchToProps = applySpec({
  logoutAction: logout,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminLayout)
