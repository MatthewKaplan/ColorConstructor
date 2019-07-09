import React, { Component } from "react";
import Palettes from "../Palettes/Palettes";

class PaletteMaker extends Component {
  state = {
    paletteTitle: "",
    projectTitle: "",
    colors: [
      { isLocked: false, hex: "", id: 1 },
      { isLocked: false, hex: "", id: 2 },
      { isLocked: false, hex: "", id: 3 },
      { isLocked: false, hex: "", id: 4 },
      { isLocked: false, hex: "", id: 5 }
    ]
  };

  componentDidMount() {
    this.generateColors();
  }

  generateColors = e => {
    if (e) {
      e.preventDefault();
    }
    let paletteColors = this.state.colors;

    paletteColors.forEach(palette => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      if (!palette.isLocked) {
        palette.hex = randomColor;
      }
    });

    this.setState({
      colors: paletteColors
    });
  };

  renderPalettes = () => {
    const { colors } = this.state;
    const palettes = colors.map(color => {
      return (
        <Palettes
          key={color.id}
          isLocked={color.isLocked}
          id={color.id}
          hex={color.hex}
          lockPalette={this.lockPalette}
        />
      );
    });
    return palettes;
  };

  lockPalette = id => {
    const colors = this.state.colors.map(color => {
      if (color.id === id) {
        color.isLocked = !color.isLocked;
      }
      return color;
    });
    this.setState({ colors });
  };

  render() {
    return (
      <div className="palette-maker-component">
        {this.renderPalettes()}
        <form>
          <input type="text" placeholder="palette name" />
          <select>
            <option>sample project</option>
            <option>sample project</option>
          </select>
          <button
            data-test="generate-colors-btn"
            onClick={e => this.generateColors(e)}
          >
            generate new palette
          </button>
          <button>save palette</button>
        </form>
      </div>
    );
  }
}

export default PaletteMaker;
