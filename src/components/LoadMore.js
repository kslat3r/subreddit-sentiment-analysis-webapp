import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  container: {
    width: '90%',
    margin: '5%',
    textAlign: 'center'
  },
});

class LoadMore extends React.Component {
  render() {
    const {
      classes,
      onClick
    } = this.props;

    return (
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onClick}
        >
          Load more subreddits
        </Button>
      </div>
    );
  }
}

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(LoadMore);
