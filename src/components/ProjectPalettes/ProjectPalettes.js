import React, { Component } from "react";
import DoughnutGraph from "../DoughnutGraph/DoughnutGraph";

class ProjectPalettes extends Component {
  render() {
    return (
      <div className="project-palettes-component">
        <div className="graphs">
          <h1 className="palette-name">{this.props.paletteName}</h1>
          <section className="pie-graph">
            <DoughnutGraph colors={this.props.colors} />
          </section>
          <button
            onClick={() => this.props.deletePalette(this.props.paletteId)}
          >
            delete
          </button>
        </div>
      </div>
    );
  }
}

export default ProjectPalettes;
