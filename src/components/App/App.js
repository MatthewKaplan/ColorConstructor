import React, { Component } from 'react'
import Header from '../Header/Header'
import PaletteMaker from '../PaletteMaker/PaletteMaker'
import ProjectCard from '../ProjectCard/ProjectCard'

class App extends Component {
  state = { projects: [], palettes: [], error: '', loading: false }

  componentDidMount() {
    this.fetchProjects()
    this.fetchPalettes()
  }

  fetchProjects = async () => {
    this.setState({ loading: true })
    try {
      const projects = await fetch(
        'https://colorconstructor-api.herokuapp.com/api/v1/projects'
      )
      const response = await projects.json()
      this.setState({ projects: response, loading: false })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  fetchPalettes = async () => {
    this.setState({ loading: true })
    try {
      const palettes = await fetch(
        'https://colorconstructor-api.herokuapp.com/api/v1/palettes'
      )
      const response = await palettes.json()
      this.setState({ palettes: response })
    } catch (error) {
      this.setState({ error: error.message, loading: false })
    }
  }

  addProject = async (projectName, paletteName, colors) => {
    const { projects } = this.state
    try {
      const response = await fetch(
        'https://colorconstructor-api.herokuapp.com/api/v1/projects',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: projectName }),
        }
      )
      const newProject = await response.json()
      this.setState({ projects: [...projects, newProject] }, () => {
        this.addPalette(newProject.id, paletteName, colors)
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  addPalette = async (projectId, name, colors) => {
    const { palettes } = this.state
    const paletteData = {
      name,
      color_1: colors[0].hex,
      color_2: colors[1].hex,
      color_3: colors[2].hex,
      color_4: colors[3].hex,
      color_5: colors[4].hex,
      project_id: projectId,
    }
    try {
      const response = await fetch(
        `https://colorconstructor-api.herokuapp.com/api/v1/palettes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paletteData),
        }
      )
      const newPalette = await response.json()
      this.setState({ palettes: [...palettes, newPalette] })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  patchPalette = async (name, colors, id) => {
    const paletteData = {
      name,
      color_1: colors[0].hex,
      color_2: colors[1].hex,
      color_3: colors[2].hex,
      color_4: colors[3].hex,
      color_5: colors[4].hex,
      id,
    }
    try {
      await fetch(
        `https://colorconstructor-api.herokuapp.com/api/v1/palettes/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paletteData),
        }
      )
      // const updatedPalette = await response.json();
      // this.setState({ palettes: [...palettes, updatedPalette] });
      this.fetchPalettes()
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  deletePalette = async id => {
    const { palettes } = this.state
    try {
      await fetch(
        `https://colorconstructor-api.herokuapp.com/api/v1/palettes/${id}`,
        {
          method: 'DELETE',
        }
      )
      this.setState({
        palettes: palettes.filter(palette => palette.id !== id),
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  deleteProject = async id => {
    const { projects } = this.state
    try {
      await fetch(
        `https://colorconstructor-api.herokuapp.com/api/v1/projects/${id}`,
        {
          method: 'DELETE',
        }
      )
      this.setState({
        projects: projects.filter(project => project.id !== id),
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  render() {
    const { projects, palettes } = this.state
    const projectCard = projects.map(project => {
      return (
        <ProjectCard
          deleteProject={this.deleteProject}
          palettes={palettes}
          project={project}
          deletePalette={this.deletePalette}
          key={project.id}
        />
      )
    })
    return (
      <div className="App">
        <img
          className="bg-image"
          src={'https://i.imgur.com/Ns3CECV.jpg'}
          alt="Sky scrappers"
        />
        <Header />
        <PaletteMaker
          projects={projects}
          palettes={palettes}
          addPalette={this.addPalette}
          addProject={this.addProject}
          patchPalette={this.patchPalette}
        />
        {projectCard}
      </div>
    )
  }
}

export default App
