import React from "react";
import { shallow } from "enzyme";
import DoughnutGraph from "./DoughnutGraph";
import MockData from "../../assets/mockData";

const mockColors = MockData.mockColors;

describe("DoughnutGraph", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DoughnutGraph colors={mockColors} />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
