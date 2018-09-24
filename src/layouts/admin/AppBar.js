import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { compose } from 'ramda'
import AppBarMaterial from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import { withStyles } from '@material-ui/core/styles'

import { drawerWidth } from './Drawer'

const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
})

const AppBar = ({ classes, drawerOpen, onDrawerOpen }) => (
  <AppBarMaterial
    position='absolute'
    className={classNames(
      classes.appBar,
      drawerOpen && classes.appBarShift
    )}
  >
    <Toolbar
      disableGutters={!drawerOpen}
      className={classes.toolbar}
    >
      <IconButton
        color='inherit'
        aria-label='Open drawer'
        onClick={onDrawerOpen}
        className={classNames(
          classes.menuButton,
          drawerOpen && classes.menuButtonHidden
        )}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant='title'
        color='inherit'
        noWrap
        className={classes.title}
      >
        Dashboard
      </Typography>
      <IconButton color='inherit'>
        <PermIdentityIcon />
      </IconButton>
    </Toolbar>
  </AppBarMaterial>
)

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  onDrawerOpen: PropTypes.func.isRequired,
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(AppBar)
