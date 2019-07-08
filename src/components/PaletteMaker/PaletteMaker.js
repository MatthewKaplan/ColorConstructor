import React, { Component } from "react";

class PaletteMaker extends Component {
  constructor() {
    super();
    this.state = {
      paletteTitle: "",
      projectTitle: "",
      colors: [
        { isLocked: false, hex: "" },
        { isLocked: false, hex: "" },
        { isLocked: false, hex: "" },
        { isLocked: false, hex: "" },
        { isLocked: true, hex: "66666" }
      ]
    };
  }

  componentDidMount() {
    // this.renderRandom
    this.generateColors();
  }

  generateColors = e => {
    if (e) {
      e.preventDefault();
    }
    let paletteColors = this.state.colors;

    paletteColors.forEach(palette => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      if (!palette.isLocked) {
        palette.hex = randomColor;
      }
    });

    this.setState({
      colors: paletteColors
    });
  };

  colorSave = () => {
    //post with args being equal to
  };

  render() {
    console.log(this.state);
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const paletteStyles = {
      backgroundColor: `#${randomColor}`
    };

    return (
      <div className="palette-maker-component">
        <section className="palette-cards">
          <div className="palette-card" style={paletteStyles}>
            <h1>{randomColor}</h1>
          </div>
          <div className="palette-card" style={paletteStyles} />
          <div className="palette-card" style={paletteStyles} />
          <div className="palette-card" style={paletteStyles} />
          <div className="palette-card" style={paletteStyles} />
        </section>
        <form>
          <input type="text" placeholder="palette name" />
          <select>
            <option>sample project</option>
            <option>sample project</option>
          </select>
          <button onClick={e => this.generateColors(e)}>
            generate new palette
          </button>
          <button>save palette</button>
        </form>
      </div>
    );
  }
}

export default PaletteMaker;
