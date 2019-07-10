import React, { Component } from "react";
import ProjectPalettes from "../ProjectPalettes/ProjectPalettes";

class ProjectCard extends Component {
  renderProjectPalette = () => {
    const { palettes, project, deletePalette, deleteProject } = this.props;
    const matchingPalettes = palettes.filter(palette => {
      return project.id === palette.project_id;
    });
    if (!matchingPalettes.length) {
      deleteProject(project.id);
    }
    const projectPalette = matchingPalettes.map(palette => {
      return (
        <ProjectPalettes
          colors={[
            palette.color_1,
            palette.color_2,
            palette.color_3,
            palette.color_4,
            palette.color_5
          ]}
          key={palette.id}
          paletteId={palette.id}
          paletteName={palette.name}
          deletePalette={deletePalette}
        />
      );
    });
    return projectPalette;
  };

  render() {
    const { project, deleteProject } = this.props;
    return (
      <div className="project-card-component" id="projects">
        <h1>{project.name}</h1>
        {this.renderProjectPalette()}
      </div>
    );
  }
}

export default ProjectCard;
