import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import AppBar from './AppBar'
import Drawer from './Drawer'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
})

class Dashboard extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true })
  };

  handleDrawerClose = () => {
    this.setState({ open: false })
  };

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar
            drawerOpen={this.state.open}
            onDrawerOpen={this.handleDrawerOpen}
          />
          <Drawer
            onDrawerClose={this.handleDrawerClose}
            drawerOpen={this.state.open}
          />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {this.props.children}
          </main>
        </div>
      </Fragment>
    )
  }
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard)
