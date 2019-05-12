import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  container: {
    width: '90%',
    margin: '5%',
    textAlign: 'center'
  },
  button: {
    minWidth: 200
  },
  progress: {
    color: '#fff',
    marginTop: 2,
    marginBottom: 2
  },
})

const LoadMore = props => {
  const {
    classes,
    onClick,
    requesting
  } = props

  return (
    <div
      className={classes.container}
    >
      <Button
        variant="contained"
        color="primary"
        disabled={requesting}
        className={classes.button}
        onClick={!requesting ? onClick : () => {}}
      >
        {requesting ? (
          <CircularProgress
            className={classes.progress}
            size={20}
          />
        ) : 'Load more subreddits'}
      </Button>
    </div>
  )
}

LoadMore.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired
}

export default withStyles(styles)(LoadMore)
