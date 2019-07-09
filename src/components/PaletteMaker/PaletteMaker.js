import React, { Component } from "react";
import Palettes from "../Palettes/Palettes";

class PaletteMaker extends Component {
  state = {
    paletteTitle: "",
    projectTitle: "",
    chosenProject: 0,
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

  generateColors = () => {
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

  handleSubmit = e => {
    e.preventDefault();
    const { chosenProject, projectName, paletteName, colors } = this.state;
    if (chosenProject === 0) {
      this.props.addProject(projectName, paletteName, colors);
    } else {
      this.props.addPalette(chosenProject, paletteName, colors);
    }
  };

  render() {
    const { paletteTitle, chosenProject, projectTitle } = this.state;
    return (
      <div className="palette-maker-component">
        <section className="palette-cards-section">
          <div className="palette-cards">{this.renderPalettes()}</div>
          <input
            type="submit"
            className="generate-colors"
            data-test="generate-colors-btn"
            value="Generate New Palette"
            onClick={() => this.generateColors()}
          />
        </section>

        <form
          className="palette-maker-form"
          data-test="palette-maker-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <div className="palette-title-container">
            <label htmlFor="palette-title">Palette Title</label>
            <input
              className="ColorGenerator-form-input"
              type="text"
              id="palette-title"
              name="paletteTitle"
              data-test="palette-title"
              placeholder="Untitled Palette"
              value={paletteTitle}
              onChange={e => this.setState({ paletteTitle: e.target.value })}
            />
          </div>

          <div className="project-dropdown">
            <label htmlFor="project-selector">Please Select a Project:</label>
            <select
              id="project-selector"
              className="project-select"
              value={chosenProject}
              data-test="project-select"
              onChange={e =>
                this.setState({ chosenProject: parseInt(e.target.value) })
              }
            >
              <option value="0">-- Create New Project --</option>
              {this.props.projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {chosenProject === 0 && (
            <div className="project-name-container">
              <label htmlFor="new-project-name">Project Name:</label>
              <input
                type="text"
                className="project-name-input"
                id="new-project-name"
                name="name"
                data-test='project-name'
                placeholder="Untitled Project"
                value={projectTitle}
                onChange={e => this.setState({ projectTitle: e.target.value })}
              />
            </div>
          )}

          <button className="add-new-palette" type="submit">
            Add New Palette
          </button>
        </form>
      </div>
    );
  }
}

export default PaletteMaker;
