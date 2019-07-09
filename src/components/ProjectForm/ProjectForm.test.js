import React from "react";
import { shallow } from "enzyme";
import ProjectForm from "./ProjectForm";

describe("ProjectForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProjectForm />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
