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
          <img
            onClick={() => this.props.deletePalette(this.props.paletteId)}
            className="delete-palette"
            alt="delete icon"
            src="https://i.imgur.com/ZJ6SKgx.png"
          />
        </div>
      </div>
    );
  }
}

export default ProjectPalettes;
