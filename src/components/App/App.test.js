import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(1)
      })
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual({
      projects: [],
      palettes: [],
      error: "",
      loading: false
    });
  });

  describe("ComponentDidMount", () => {
    it("should invoke 'fetchProjects' when mounted", () => {
      let mockFn = jest.spyOn(instance, "fetchProjects");
      instance.componentDidMount();
      expect(mockFn).toHaveBeenCalled();
    });

    it("should invoke 'fetchPalettes' when mounted", () => {
      let mockFn = jest.spyOn(instance, "fetchPalettes");
      instance.componentDidMount();
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("fetchProjects", () => {
    it("should invoke 'fetch' with correct param", () => {
      const projectsLink = "http://localhost:3000/api/v1/projects";
      instance.fetchProjects();
      expect(fetch).toHaveBeenCalledWith(projectsLink);
    });

    it("should set the state of projects with the response of the fetch", async () => {
      expect(wrapper.state("projects")).toEqual([]);
      await instance.fetchProjects();
      expect(wrapper.state("projects")).toEqual(1);
    });

    it("should throw an error if the response is not ok and save it to state", async () => {
      expect(wrapper.state("error")).toEqual("");
      window.fetch.mockImplementationOnce(() =>
        Promise.reject(new Error("Fetch failed"))
      );
      await instance.fetchProjects();
      expect(wrapper.state("error")).toEqual("Fetch failed");
    });
  });

  describe("fetchPalettes", () => {
    it("should invoke 'fetch' with correct param", () => {
      const palettesLink = "http://localhost:3000/api/v1/palettes";
      instance.fetchPalettes();
      expect(fetch).toHaveBeenCalledWith(palettesLink);
    });

    it("should set the state of palettes with the response of the fetch", async () => {
      expect(wrapper.state("palettes")).toEqual([]);
      await instance.fetchPalettes();
      expect(wrapper.state("palettes")).toEqual(1);
    });

    it("should throw an error if the response is not ok and save it to state", async () => {
      expect(wrapper.state("error")).toEqual("");
      window.fetch.mockImplementationOnce(() =>
        Promise.reject(new Error("Fetch failed"))
      );
      await instance.fetchPalettes();
      expect(wrapper.state("error")).toEqual("Fetch failed");
    });
  });
});
