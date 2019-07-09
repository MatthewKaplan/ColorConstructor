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
    try {
      const projects = await fetch("http://localhost:3000/api/v1/projects");
      const response = await projects.json();
      this.setState({ projects: response });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  fetchPalettes = async () => {
    try {
      const palettes = await fetch("http://localhost:3000/api/v1/palettes");
      const response = await palettes.json();
      this.setState({ palettes: response });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Header />
        <PaletteMaker />
      </div>
    );
  }
}

export default App;
