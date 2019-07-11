import React from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'

function DoughnutGraph(props) {
  const { colors } = props
  let data = {
    datasets: [
      {
        data: [90, 90, 90, 90, 90],
        backgroundColor: [
          colors[0],
          colors[1],
          colors[2],
          colors[3],
          colors[4],
        ],
        hoverBackgroundColor: [
          colors[0],
          colors[1],
          colors[2],
          colors[3],
          colors[4],
        ],
      },
    ],
    labels: [colors[0], colors[1], colors[2], colors[3], colors[4]],
  }
  return (
    <div className="doughnut-component">
      <Doughnut data={data} className="doughnut-graph" />
    </div>
  )
}

DoughnutGraph.propTypes = {
  colors: PropTypes.array,
}

export default DoughnutGraph
