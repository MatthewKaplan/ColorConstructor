import React from "react";
import { shallow } from "enzyme";
import PaletteMaker from "./PaletteMaker";
import MockData from "../../assets/mockData";

const mockColorsFalse = MockData.mockColorsFalse;
const mockColorsTrue = MockData.mockColorsTrue;
const mockProjects = MockData.mockProject;
const mockAddProject = jest.fn();
const mockAddPalette = jest.fn();

describe("PaletteMaker", () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(
      <PaletteMaker
        projects={mockProjects}
        addProject={mockAddProject}
        addPalette={mockAddPalette}
      />
    );
    instance = wrapper.instance();

    wrapper.setState({
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
    });
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual({
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
    });
  });

  describe("componentDidMount", () => {
    it("should invoke 'generateColors' when mounted", () => {
      let mockFn = jest.spyOn(instance, "generateColors");
      instance.componentDidMount();
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("generateColors", () => {
    it("should generate random colors and save them to state", () => {
      expect(wrapper.state("colors")).toEqual([
        { isLocked: false, hex: "", id: 1 },
        { isLocked: false, hex: "", id: 2 },
        { isLocked: false, hex: "", id: 3 },
        { isLocked: false, hex: "", id: 4 },
        { isLocked: false, hex: "", id: 5 }
      ]);

      instance.generateColors();
      expect(wrapper.state().colors[0].hex).toContain("#");
      expect(wrapper.state().colors[1].hex).toContain("#");
      expect(wrapper.state().colors[2].hex).toContain("#");
      expect(wrapper.state().colors[3].hex).toContain("#");
      expect(wrapper.state().colors[4].hex).toContain("#");
    });

    it("should invoke 'generateColors' generate-colors-btn is clicked", () => {
      let mockFn = jest.spyOn(instance, "generateColors");
      wrapper.find("[data-test='generate-colors-btn']").simulate("click");
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("lockPalette", () => {
    it("should set the state of a colors isLocked to true", () => {
      wrapper.setState({ colors: mockColorsFalse });
      instance.lockPalette(1);
      expect(wrapper.state("colors")).toEqual(mockColorsTrue);
    });
  });

  describe("renderPalettes", () => {
    it("should return the correct value when invoked", () => {
      const results = instance.renderPalettes();
      expect(results).toHaveLength(5);
    });
  });

  describe("handleSubmit", () => {
    it("should invoke 'handleSubmit' on palette-maker-form submit", () => {
      jest.spyOn(instance, "handleSubmit");
      wrapper
        .find("[data-test='palette-maker-form']")
        .simulate("submit", { preventDefault() {} });
      expect(instance.handleSubmit).toHaveBeenCalled();
    });

    it("should invoke 'addProject' if the state of chosenProject equals 0", () => {
      expect(wrapper.state("chosenProject")).toEqual(0);
      instance.handleSubmit({ preventDefault() {} });
      expect(mockAddProject).toHaveBeenCalled();
    });

    it("should invoke 'addPalette' if the state of chosenProject is greater than 1", () => {
      wrapper.setState({ chosenProject: 1 });
      instance.handleSubmit({ preventDefault() {} });
      expect(mockAddPalette).toHaveBeenCalled();
    });
  });

  describe("On change events", () => {
    it("should set the state of of paletteTitle while the user types in the input", () => {
      expect(wrapper.state("paletteTitle")).toEqual("");
      let paletteTitle = {
        target: { value: "Matts Palette", classList: "paletteTitle" }
      };
      wrapper
        .find("[data-test='palette-title']")
        .simulate("change", paletteTitle);
      expect(wrapper.state("paletteTitle")).toEqual("Matts Palette");
    });

    it("should change the state of 'chosenProject' onChange", () => {
      expect(wrapper.state("chosenProject")).toEqual(0);
      let projectChosen = {
        target: { value: 1, classList: "project-selector" }
      };
      wrapper
        .find("[data-test='project-select']")
        .simulate("change", projectChosen);
      expect(wrapper.state("chosenProject")).toEqual(1);
    });

    it("should change the state of 'projectTitle' onChange", () => {
      expect(wrapper.state("projectTitle")).toEqual("");
      let projectTitle = {
        target: { value: "Matts Project", classList: "project-name-input" }
      };
      wrapper
        .find("[data-test='project-name']")
        .simulate("change", projectTitle);
      expect(wrapper.state("projectTitle")).toEqual("Matts Project");
    });
  });
});
