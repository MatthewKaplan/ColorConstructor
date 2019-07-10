import React from "react";
import { shallow } from "enzyme";
import ProjectCard from "./ProjectCard";
import MockData from "../../assets/mockData";

const mockPalettes = MockData.mockPalette;
const mockProject = MockData.mockSingleProject;

describe("ProjectCard", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProjectCard palettes={mockPalettes} project={mockProject}/>);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
