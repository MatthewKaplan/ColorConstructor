import React from "react";
import { shallow } from "enzyme";
import PaletteMaker from "./PaletteMaker";

const mockColorsFalse = [
  {
    isLocked: false,
    hex: "25e8c6",
    id: 1
  },
  {
    isLocked: false,
    hex: "a6bdad",
    id: 2
  },
  {
    isLocked: false,
    hex: "acfcd1",
    id: 3
  },
  {
    isLocked: false,
    hex: "2fa05a",
    id: 4
  },
  {
    isLocked: false,
    hex: "cf817c",
    id: 5
  }
];

const mockColorsTrue = [
  {
    isLocked: true,
    hex: "25e8c6",
    id: 1
  },
  {
    isLocked: false,
    hex: "a6bdad",
    id: 2
  },
  {
    isLocked: false,
    hex: "acfcd1",
    id: 3
  },
  {
    isLocked: false,
    hex: "2fa05a",
    id: 4
  },
  {
    isLocked: false,
    hex: "cf817c",
    id: 5
  }
];

describe("PaletteMaker", () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<PaletteMaker />);
    instance = wrapper.instance();

    wrapper.setState({
      paletteTitle: "",
      projectTitle: "",
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
});
