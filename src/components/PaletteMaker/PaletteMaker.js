import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Palettes from '../Palettes/Palettes'

class PaletteMaker extends Component {
  state = {
    paletteTitle: '',
    projectTitle: '',
    chosenProject: 0,
    chosenPalette: 0,
    colors: [
      { isLocked: false, hex: '', id: 1 },
      { isLocked: false, hex: '', id: 2 },
      { isLocked: false, hex: '', id: 3 },
      { isLocked: false, hex: '', id: 4 },
      { isLocked: false, hex: '', id: 5 },
    ],
    newProject: false,
    newPalette: false,
    editProject: false,
    editProjectButton: false,
  }

  componentDidMount() {
    this.generateColors()
  }

  handleEdit = e => {
    e.preventDefault()

    // eslint-disable-next-line react/prop-types
    const palette = this.props.palettes.find(palette => {
      return palette.id === this.state.chosenPalette
    })

    this.setState({ editProject: false, editProjectButton: true })

    this.setState(({ colors }) => {
      colors[0].hex = palette.color_1
      colors[1].hex = palette.color_2
      colors[2].hex = palette.color_3
      colors[3].hex = palette.color_4
      colors[4].hex = palette.color_5
      return colors
    })
  }

  generateColors = () => {
    let paletteColors = this.state.colors

    paletteColors.forEach(palette => {
      const randomColor =
        '#' +
        Math.random()
          .toString(16)
          .slice(2, 8)
      if (!palette.isLocked) {
        palette.hex = randomColor
      }
    })

    this.setState({
      colors: paletteColors,
    })
  }

  renderPalettes = () => {
    const { colors } = this.state
    const palettes = colors.map(color => {
      return (
        <Palettes
          key={color.id}
          isLocked={color.isLocked}
          id={color.id}
          hex={color.hex}
          lockPalette={this.lockPalette}
        />
      )
    })
    return palettes
  }

  lockPalette = id => {
    const colors = this.state.colors.map(color => {
      if (color.id === id) {
        color.isLocked = !color.isLocked
      }
      return color
    })
    this.setState({ colors })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ newProject: false, newPalette: false, editProject: false })
    const { chosenProject, projectTitle, paletteTitle, colors } = this.state
    if (chosenProject === 0) {
      // eslint-disable-next-line react/prop-types
      this.props.addProject(projectTitle, paletteTitle, colors)
    } else {
      this.props.addPalette(chosenProject, paletteTitle, colors)
    }
    setTimeout(() => {
      this.setState({ chosenProject: 0, paletteTitle: '', projectTitle: '' })
    }, 0)
  }

  render() {
    const {
      paletteTitle,
      chosenProject,
      chosenPalette,
      projectTitle,
      newProject,
      newPalette,
      editProject,
      editProjectButton,
      colors,
    } = this.state
    return (
      <div className="palette-maker-component" id="home">
        <div className="banner-area">
          <a href="#header">
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
          </a>
          <a href="#header">
            <div className="btn-area" id="nav2">
              <h2
                data-test="open-new-palette"
                onClick={() =>
                  this.setState({
                    newPalette: true,
                    chosenProject: 0,
                    paletteTitle: '',
                  })
                }
              >
                <img
                  className="add-palette nav-icon"
                  src="https://i.imgur.com/jUtzZ1X.png"
                  alt="swatchbook"
                />
                Create New Palette
              </h2>
            </div>
          </a>
          <a href="#header">
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
          </a>
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
          <a href="#header">
            <div className="btn-area generate-palette" id="nav5">
              <h2
                data-test="generate-colors-btn"
                onClick={() => this.generateColors()}
              >
                <img
                  className="nav-icon"
                  src="https://i.imgur.com/cGp9VHw.png"
                  alt="open folder"
                />
                Generate Palette
              </h2>
            </div>
          </a>
          {editProjectButton && (
            <a href="#header">
              <div className="btn-area save-palette" id="nav6">
                <h2
                  data-test="update-palette-btn"
                  onClick={() => {
                    this.props.patchPalette(
                      this.props.palettes.find(
                        palette => palette.id === chosenPalette
                      ).name,
                      colors,
                      chosenPalette
                    )
                    this.setState({ editProjectButton: false })
                  }}
                >
                  <img
                    className="nav-icon"
                    src="https://i.imgur.com/I7kkHor.png"
                    alt="open folder"
                  />
                  Save Palette
                </h2>
              </div>
            </a>
          )}
        </div>
        {newProject && (
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
                  <label
                    htmlFor="new-project-name"
                    className="new-project-name"
                  >
                    Project Title:
                  </label>
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
                  <label
                    htmlFor="new-palette-name"
                    className="new-project-name"
                  >
                    Palette Title:
                  </label>
                  <input
                    required
                    type="text"
                    className="palette-name-input"
                    id="new-palette-name"
                    name="name"
                    data-test="palette-name"
                    placeholder="Untitled Palette"
                    value={paletteTitle}
                    onChange={e =>
                      this.setState({ paletteTitle: e.target.value })
                    }
                  />
                </div>
                <div className="btn">
                  <button type="button">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {newPalette && (
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
                  <label
                    htmlFor="project-selector"
                    className="new-project-name"
                  >
                    Select a Project that you would like to add a new palette
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
                    <option value="0"> Project </option>
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
                      <label
                        htmlFor="palette-title"
                        className="new-palette-name"
                      >
                        Palette Title
                      </label>
                      <input
                        className="palette-name-input"
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

        {editProject && (
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
                onSubmit={e => this.handleEdit(e)}
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
                  <select
                    id="palette-selector"
                    className="palette-select"
                    required
                    value={chosenPalette}
                    data-test="palette-select"
                    onChange={e =>
                      this.setState({ chosenPalette: parseInt(e.target.value) })
                    }
                  >
                    <option value="0">-- Select a Palette --</option>
                    {this.props.palettes.map(palette => {
                      if (chosenProject === palette.project_id) {
                        return (
                          <option key={palette.id} value={palette.id}>
                            {palette.name}
                          </option>
                        )
                      }
                    })}
                  </select>
                </div>
                <button type="submit">SUBMIT</button>
              </form>
            </div>
          </div>
        )}

        <section className="palette-cards-section">
          <div className="palette-cards">{this.renderPalettes()}</div>
        </section>
      </div>
    )
  }
}

PaletteMaker.propsTypes = {
  palettes: PropTypes.arr,
  addPalette: PropTypes.func,
  addProject: PropTypes.func,
  projects: PropTypes.arr,
}

export default PaletteMaker
