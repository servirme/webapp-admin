import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { compose } from 'ramda'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import DrawerAdminLayout, { drawerWidth } from './drawer'
import UserAdminLayout from './user'

const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  hide: {
    display: 'none',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    marginLeft: -drawerWidth,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class AdminLayout extends Component {
  state = {
    drawerOpen: true,
    menuCollapse: {},
  }

  toggleDrawer = () => {
    const actual = this.state.drawerOpen
    this.setState({ drawerOpen: !actual })
  }

  render() {
    const {
      children,
      classes,
    } = this.props
    const { drawerOpen } = this.state

    const appBarClasses = classNames(classes.appBar, {
      [classes.appBarShift]: drawerOpen,
    })
    const toolbarClasses = classNames(
      classes.menuButton,
      drawerOpen && classes.hide
    )
    const contentClasses = classNames(classes.content, {
      [classes.contentShift]: drawerOpen,
    })

    return (
      <div className={classes.appFrame}>
        <AppBar className={appBarClasses}>
          <Toolbar disableGutters={!drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer}
              className={toolbarClasses}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              type="title"
              color="inherit"
              noWrap
              className={classes.flex}
            >
              Persistent drawer
            </Typography>
            <UserAdminLayout />
          </Toolbar>
        </AppBar>
        <DrawerAdminLayout
          open={drawerOpen}
          width={drawerWidth}
          onClose={this.toggleDrawer}
        />
        <main className={contentClasses}>{children}</main>
      </div>
    )
  }
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(AdminLayout)
