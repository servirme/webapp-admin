import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'ramda'

const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 2 * theme.spacing.unit,
  },
})

const AuthLayout = ({ children, classes }) => {
  return (
    <Fragment>
      <Helmet>
        <style type="text/css">
          {
            `
            body {
              background: url("/food.png")
                no-repeat
                center
                center
                fixed;
              background-size: cover;
            }
          `
          }
        </style>
      </Helmet>
      <Grid
        container
        className={classes.appFrame}
        justify='center'
        alignItems={'center'}
      >
        <Grid item xs={6} md={3}>
          <Card raised={true} className={classes.content}>
            {children}
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(AuthLayout)
