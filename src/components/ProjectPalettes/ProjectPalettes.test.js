import React from "react";
import { shallow } from "enzyme";
import ProjectPalettes from "./ProjectPalettes";

const mockDeletePalette = jest.fn();

describe("ProjectPalettes", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProjectPalettes deletePalette={mockDeletePalette} />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke 'deletePalette' when user clicks delete palette btn", () => {
    wrapper.find("[data-test='delete-palette-btn']").simulate("click");
    expect(mockDeletePalette).toHaveBeenCalled();
  });
});