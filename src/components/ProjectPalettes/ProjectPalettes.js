import React from 'react'
import PropTypes from 'prop-types'
import DoughnutGraph from '../DoughnutGraph/DoughnutGraph'

function ProjectPalettes(props) {
  return (
    <div className="project-palettes-component">
      <div className="graphs">
        <h1 className="palette-name">{props.paletteName}</h1>
        <section className="pie-graph">
          <DoughnutGraph colors={props.colors} />
        </section>
        <img
          onClick={() => this.props.deletePalette(props.paletteId)}
          className="delete-palette"
          alt="delete icon"
          src="https://i.imgur.com/ZJ6SKgx.png"
        />
      </div>
    </div>
  )
}

ProjectPalettes.propTypes = {
  paletteName: PropTypes.string,
  colors: PropTypes.array,
  paletteId: PropTypes.number,
}

export default ProjectPalettes
