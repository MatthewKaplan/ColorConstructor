import React, {Component} from "react";

class PaletteMaker extends Component {
  componentDidMount(){
    renderRandom
  }

  render() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    const paletteStyles = {
      backgroundColor: `#${randomColor}`
    }

    console.log(randomColor);

    return (
      <div className="palette-maker-component">
        <section className="palette-cards">
          <div className="palette-card" style={paletteStyles}>
            <h1>{randomColor}</h1>
          </div>
          <div className="palette-card"></div>
          <div className="palette-card"></div>
          <div className="palette-card"></div>
          <div className="palette-card"></div>
        </section>
      </div>
    )
  }
}

export default PaletteMaker;