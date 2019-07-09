import React, { Component } from "react";
import Header from "../Header/Header";
import PaletteMaker from "../PaletteMaker/PaletteMaker";

class App extends Component {
  state = { projects: [], palettes: [], error: "", loading: false };

  componentDidMount() {
    this.fetchProjects();
    this.fetchPalettes();
  }

  fetchProjects = async () => {
    this.setState({ loading: true });
    try {
      const projects = await fetch("http://localhost:3000/api/v1/projects");
      const response = await projects.json();
      this.setState({ projects: response, loading: false });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  fetchPalettes = async () => {
    this.setState({ loading: true });
    try {
      const palettes = await fetch("http://localhost:3000/api/v1/palettes");
      const response = await palettes.json();
      this.setState({ palettes: response });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  addProject = async (projectName, paletteName, colors) => {
		const { projects } = this.state;
		try {
			const response = await fetch('http://localhost:3000/api/v1/projects', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: projectName })
			});
			const newProject = await response.json();
			this.setState({ projects: [...projects, newProject] }, () => {
				this.addPalette(newProject.id, paletteName, colors);
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
	};

	addPalette = async (projectId, name, colors) => {
		const { palettes } = this.state;
		const paletteData = {
			name,
			color_1: colors[0].hex,
			color_2: colors[1].hex,
			color_3: colors[2].hex,
			color_4: colors[3].hex,
			color_5: colors[4].hex,
			project_id: projectId
		};
		try {
			const response = await fetch(`http://localhost:3000/api/v1/palettes`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(paletteData)
			});
			const newPalette = await response.json();
			this.setState({ palettes: [...palettes, newPalette] });
		} catch (error) {
			this.setState({ error: error.message });
		}
  };
  
  deletePalette = async id => {
		const { palettes } = this.state;
		try {
			await fetch(`http://localhost:3000/api/v1/palettes/${id}`, {
				method: 'DELETE'
			});
			this.setState({ palettes: palettes.filter(palette => palette.id !== id) });
		} catch (error) {
			this.setState({ error: error.message });
		}
	};

  render() {
    return (
      <div className="App">
        <Header />
        <PaletteMaker />
      </div>
    );
  }
}

export default App;
