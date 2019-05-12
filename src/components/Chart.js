import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const Chart = props => {
  const { data } = props

  return (
    <ResponsiveContainer
      width="98%"
      height={400}
    >
      <LineChart
        data={data}>
          <Line
            type="monotone"
            dataKey="average"
            stroke="#8884d8"
          />
          <CartesianGrid
            stroke="#eee"
          />
          <XAxis
            dataKey="label"
          />
          <YAxis
            dataKey="average"
          />
          <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}

Chart.propTypes = {
  data: PropTypes.array.isRequired
}

export default Chart
