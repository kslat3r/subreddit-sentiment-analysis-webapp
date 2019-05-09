import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Chart from './Chart'

const styles = () => ({
  card: {
    overflow: 'hidden'
  }
});

class Subreddit extends React.Component {
  render() {
    const {
      classes,
      subreddit
    } = this.props;

    return (
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
      >
        <Card
          className={classes.card}
        >
          <CardHeader
            title={subreddit.name}
          />
          <Chart
            data={subreddit.dates.length && subreddit.dates.map(date => ({
              label: date.label,
              average: date.average
            }))}
          />
        </Card>
      </Grid>
    );
  }
}

Subreddit.propTypes = {
  classes: PropTypes.object.isRequired,
  subreddit: PropTypes.object.isRequired
};

export default withStyles(styles)(Subreddit);
