import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import AdminLayout from '../layouts/admin/index'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})

class Index extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <AdminLayout>
        <div className={classes.root}>
          <Typography variant="display1" gutterBottom>
            Servir.me
          </Typography>
          <Typography>{'You think water moves fast? You should see ice.'}</Typography>
        </div>
      </AdminLayout>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Index)
