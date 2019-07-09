import React from "react";
import { shallow } from "enzyme";
import Palettes from "./Palettes";

const mockHex = "#AD8B72";
const mockLockPalette = jest.fn();

describe("Palettes", () => {
  let wrapper, instance;

  it("should match the snapshot", () => {
    wrapper = shallow(<Palettes hex={mockHex} lockPalette={mockLockPalette} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should match the snapshot if isLocked is true", () => {
    wrapper = shallow(<Palettes hex={mockHex} lockPalette={mockLockPalette} isLocked={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke 'lockPalette' when lock-icon is clicked", () => {
    wrapper = shallow(<Palettes hex={mockHex} lockPalette={mockLockPalette} />);
    wrapper.find("[data-test='lock-icon']").simulate("click");
    expect(mockLockPalette).toHaveBeenCalled();
  });
});
