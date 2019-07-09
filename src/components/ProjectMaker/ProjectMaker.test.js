import React from "react";
import { shallow } from "enzyme";
import ProjectMaker from "./ProjectMaker";

describe("ProjectMaker", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProjectMaker />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
