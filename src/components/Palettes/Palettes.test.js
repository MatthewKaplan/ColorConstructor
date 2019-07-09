import React from "react";
import { shallow } from "enzyme";
import Palettes from "./Palettes";

const mockHex = "#AD8B72";
const mockLockPalette = jest.fn();

describe("Palettes", () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<Palettes hex={mockHex} lockPalette={mockLockPalette} />);
    instance = wrapper.instance();
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke 'lockPalette' when lock-icon is clicked", () => {
    wrapper.find("[data-test='lock-icon']").simulate("click");
    expect(mockLockPalette).toHaveBeenCalled();
  });
});
