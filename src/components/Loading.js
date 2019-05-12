import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 10,
    maxWidth: '60%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
})

const Loading = props => {
  const {
    classes
  } = props

  return (
    <div>
      <Paper
        className={classes.root}
        elevation={1}
      >
        <LinearProgress />
      </Paper>
    </div>
  )
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading)
