import React, { Component } from "react";
import PieGraph from "../PieGraph/PieGraph";
import DoughnutGraph from "../DoughnutGraph/DoughnutGraph";

class ProjectPalettes extends Component {
  render() {
    return (
      <div className="project-palettes-component">
        <div className="graphs">
          <section className="pie-graph">
            <PieGraph colors={this.props.colors} />
          </section>
          <section className="pie-graph">
            <DoughnutGraph colors={this.props.colors} />
          </section>
        </div>
      </div>
    );
  }
}

export default ProjectPalettes;
