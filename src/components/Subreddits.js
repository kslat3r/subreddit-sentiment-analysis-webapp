import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Subreddit from './Subreddit'

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
    width: '98%',
    marginLeft: '1%',
    marginRight: '1%'
  }
});

class Subreddits extends React.Component {
  render() {
    const {
      classes,
      subreddits
    } = this.props;

    return (
      <div
        className={classes.container}
      >
        <Grid
          container
          spacing={24}
        >
          {subreddits.map((subreddit, i) => (
            <Subreddit
              key={i}
              subreddit={subreddit}
              lonely={subreddits.length === 1}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

Subreddits.propTypes = {
  classes: PropTypes.object.isRequired,
  subreddits: PropTypes.array.isRequired
};

export default withStyles(styles)(Subreddits);
