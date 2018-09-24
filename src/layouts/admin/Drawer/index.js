import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'ramda'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import DrawerMaterial from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { translate } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { version } from '../../../../package.json'
import { mainListItems, secondaryListItems } from './listItems'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: '100%',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: theme.mixins.toolbar,
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  version: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
})

class Drawer extends Component {
  handleCollapseClick = group => () => {
    const actual = this.state.menuCollapse[group]
    this.setState({ menuCollapse: { [group]: !actual } })
  }

  render() {
    const {
      classes,
      onDrawerClose,
      drawerOpen,
      t,
    } = this.props

    return (
      <DrawerMaterial
        variant='permanent'
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose
          ),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={onDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
        <Divider />
        <Typography
          align='center'
        >
          {drawerOpen && t('version')} {version}
        </Typography>
      </DrawerMaterial>
    )
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
}

const enhance = compose(
  withStyles(styles),
  translate()
)

export default enhance(Drawer)
export { drawerWidth }
