import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'ramda'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import VerifiedUser from 'material-ui-icons/VerifiedUser'

import { version } from '../../../package.json'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  menu: {
    height: '100%',
    overflowX: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  hide: {
    display: 'none',
  },
})

class DrawerAdminLayout extends Component {
  state = {
    menuCollapse: {},
  }

  handleCollapseClick = group => () => {
    const actual = this.state.menuCollapse[group]
    this.setState({ menuCollapse: { [group]: !actual } })
  }

  render() {
    const { classes, onClose, open } = this.props

    const menuList = (
      <div className={classes.menu}>
        <List component="nav">
          <ListItem button component={Link} to='/auth/asd'>
            <ListItemIcon>
              <VerifiedUser />
            </ListItemIcon>
            <ListItemText inset primary="Login"/>
          </ListItem>
        </List>
      </div>
    )

    const drawerContent = (
      <Fragment>
        <div className={classes.drawerHeader}>
          <Typography type="headline" component={Link} to="/">
            Servir.me
          </Typography>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        { menuList }
        <Divider/>
        <div>
          <Typography align='center' type="caption">
            Version {version}
          </Typography>
        </div>
      </Fragment>
    )

    return (
      <Fragment>
        <Hidden mdUp>
          <Drawer
            type="temporary"
            anchor='left'
            open={open}
            classes={{ paper: classes.drawerPaper }}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            type="persistent"
            open={open}
            classes={{ paper: classes.drawerPaper }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </Fragment>
    )
  }
}

DrawerAdminLayout.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(DrawerAdminLayout)
export { drawerWidth }
