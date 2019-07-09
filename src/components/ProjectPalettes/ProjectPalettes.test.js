import React from "react";
import { shallow } from "enzyme";
import ProjectPalettes from "./ProjectPalettes";

describe("ProjectPalettes", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProjectPalettes />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
