import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DoughnutGraph extends Component {
  render() {
    const { colors } = this.props;
    const data = {
      datasets: [
        {
          data: [90, 90, 90, 90, 90],
          backgroundColor: [
            colors[0].hex,
            colors[1].hex,
            colors[2].hex,
            colors[3].hex,
            colors[4].hex
          ]
        }
      ]
    };
    return (
      <div className="doughnut-component">
        <Doughnut data={data} className="doughnut-graph"/>
      </div>
    );
  }
}

export default DoughnutGraph;
