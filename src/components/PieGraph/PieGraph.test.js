import React from "react";
import { shallow } from "enzyme";
import PieGraph from "./PieGraph";
import MockData from "../../assets/mockData";

const mockColors = MockData.mockColors;

describe("PieGraph", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PieGraph colors={mockColors}/>);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
