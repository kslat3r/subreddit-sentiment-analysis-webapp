import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Chart from './Chart'

const styles = () => ({
  card: {
    overflow: 'hidden'
  }
})

@observer
class Subreddit extends React.Component {
  render() {
    const {
      classes,
      subreddit,
      lonely
    } = this.props

    return (
      <Grid
        item
        xs={12}
        md={lonely ? 12 : 6}
        lg={lonely ? 12 : 4}
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
    )
  }
}

Subreddit.propTypes = {
  classes: PropTypes.object.isRequired,
  subreddit: PropTypes.object.isRequired,
  lonely: PropTypes.bool.isRequired
}

export default withStyles(styles)(Subreddit)
