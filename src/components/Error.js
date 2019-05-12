import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2
  },
})

const Error = props => {
  const {
    message,
    classes
  } = props

  return (
    <div>
      <Paper
        className={classes.root}
        elevation={1}
      >
        <Typography
          variant="h5"
          component="h3"
        >
          Error
        </Typography>
        <Typography
          component="p"
        >
          {message}
        </Typography>
      </Paper>
    </div>
  )
}

Error.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
}

export default withStyles(styles)(Error)
