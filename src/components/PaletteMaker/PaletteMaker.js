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
    ],
    newProject: false,
    newPalette: false,
    editProject: false
  };

  componentDidMount() {
    this.generateColors();
  }

  generateColors = () => {
    let paletteColors = this.state.colors;

    paletteColors.forEach(palette => {
      const randomColor =
        "#" +
        Math.random()
          .toString(16)
          .slice(2, 8);
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
    const { chosenProject, projectTitle, paletteTitle, colors } = this.state;
    if (chosenProject === 0) {
      this.props.addProject(projectTitle, paletteTitle, colors);
    } else {
      this.props.addPalette(chosenProject, paletteTitle, colors);
    }
  };

  render() {
    const {
      paletteTitle,
      chosenProject,
      projectTitle,
      newProject,
      newPalette,
      editProject
    } = this.state;
    return (
      <div className="palette-maker-component">
        <div className="banner-area">
          <div className="btn-area" id="nav1">
            <h2
              data-test="open-new-project"
              onClick={() => this.setState({ newProject: true })}
            >
              <img
                className="add-project nav-icon"
                src="https://i.imgur.com/fLxsoUL.png"
                alt="folder with plus sign on it."
              />
              Create New Project
            </h2>
          </div>
          <div className="btn-area" id="nav2">
            <h2
              data-test="open-new-palette"
              onClick={() => this.setState({ newPalette: true })}
            >
              <img
                className="add-palette nav-icon"
                src="https://i.imgur.com/jUtzZ1X.png"
                alt="swatchbook"
              />
              Create New Palette
            </h2>
          </div>
          <div className="btn-area" id="nav3">
            <h2
              data-test="open-edit-project"
              onClick={() => this.setState({ editProject: true })}
            >
              <img
                className="edit-projects nav-icon"
                src="https://i.imgur.com/sfaD9Mf.png"
                alt="open folder"
              />
              Edit Project
            </h2>
          </div>
          <a href="#projects">
            <div className="btn-area" id="nav4">
              <h2>
                <img
                  className="view-projects nav-icon"
                  src="https://i.imgur.com/Z0I6qT1.png"
                  alt="open folder"
                />
                View Saved Projects
              </h2>
            </div>
          </a>
          <div className="btn-area" id="nav5">
            <h2 onClick={() => this.generateColors()}>
              <img
                className="view-projects nav-icon"
                src="https://i.imgur.com/cGp9VHw.png"
                alt="open folder"
              />
              Generate Palette
            </h2>
          </div>
        </div>
        {newProject === true && (
          <div className="bg-modal">
            <div className="modal-content">
              <div
                className="close"
                data-test="close-new-project"
                onClick={() => this.setState({ newProject: false })}
              >
                +
              </div>
              <form
                className="palette-maker-form"
                data-test="new-project-form"
                onSubmit={e => this.handleSubmit(e)}
              >
                <div className="project-name-container">
                  <label htmlFor="new-project-name">Project Name:</label>
                  <input
                    required
                    type="text"
                    className="project-name-input"
                    id="new-project-name"
                    name="name"
                    data-test="project-name"
                    placeholder="Untitled Project"
                    value={projectTitle}
                    onChange={e =>
                      this.setState({ projectTitle: e.target.value })
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {newPalette === true && (
          <div className="bg-modal">
            <div className="modal-content">
              <div
                className="close"
                data-test="close-new-palette"
                onClick={() => this.setState({ newPalette: false })}
              >
                +
              </div>
              <form
                className="palette-maker-form"
                data-test="new-palette-form"
                onSubmit={e => this.handleSubmit(e)}
              >
                <div className="project-dropdown">
                  <label htmlFor="project-selector">
                    Please Select a Project that you would like to add a palette
                    too:
                  </label>
                  <select
                    id="project-selector"
                    className="project-select"
                    required
                    value={chosenProject}
                    data-test="project-select"
                    onChange={e =>
                      this.setState({ chosenProject: parseInt(e.target.value) })
                    }
                  >
                    <option value="0">-- Select a Project --</option>
                    {this.props.projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                {chosenProject >= 1 && (
                  <React.Fragment>
                    <div className="palette-title-container">
                      <label htmlFor="palette-title">Palette Title</label>
                      <input
                        className="ColorGenerator-form-input"
                        type="text"
                        id="palette-title"
                        name="paletteTitle"
                        required
                        data-test="palette-title"
                        placeholder="Untitled Palette"
                        value={paletteTitle}
                        onChange={e =>
                          this.setState({ paletteTitle: e.target.value })
                        }
                      />
                    </div>
                    <button className="add-new-palette" type="submit">
                      Add New Palette
                    </button>
                  </React.Fragment>
                )}
              </form>
            </div>
          </div>
        )}

        {editProject === true && (
          <div className="bg-modal">
            <div className="modal-content">
              <div
                className="close"
                data-test="close-edit-project"
                onClick={() => this.setState({ editProject: false })}
              >
                +
              </div>
              <form
                className="palette-maker-form"
                data-test="edit-project-form"
                onSubmit={e => this.handleSubmit(e)}
              >
                <div className="project-dropdown">
                  <label htmlFor="project-selector">
                    Please Select a Project that you would like to edit:
                  </label>
                  <select
                    id="project-selector"
                    className="project-select"
                    required
                    value={chosenProject}
                    data-test="project-select"
                    onChange={e =>
                      this.setState({ chosenProject: parseInt(e.target.value) })
                    }
                  >
                    <option value="0">-- Select a Project --</option>
                    {this.props.projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="palette-cards-section">
          <div className="palette-cards">{this.renderPalettes()}</div>
        </section>
      </div>
    );
  }
}

export default PaletteMaker;
