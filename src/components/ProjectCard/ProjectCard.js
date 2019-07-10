import React, { Component } from "react";
import ProjectPalettes from "../ProjectPalettes/ProjectPalettes";

class ProjectCard extends Component {
  render() {
    const { palettes, project, deletePalette } = this.props;
    const matchingPalettes = palettes.filter(palette => {
      return project.id === palette.project_id;
    });
    const projectPalettes = matchingPalettes.map(palette => {
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
    return (
      <div className="project-card-component" id="projects">
        <h1>{project.name}</h1>
        {projectPalettes}
      </div>
    );
  }
}

export default ProjectCard;
