import React from 'react'
import { shallow } from 'enzyme'
import MockData from '../../assets/mockData'
import App from './App'

const projectsLink =
  'https://cors-anywhere.herokuapp.com/https://colorconstructor-api.herokuapp.com/api/v1/projects'
const palettesLink =
  'https://cors-anywhere.herokuapp.com/https://colorconstructor-api.herokuapp.com/api/v1/palettes'

const mockColors = MockData.mockColors
const mockPalette = MockData.mockPalette

const projectBody = {
  body: '{"name":"Project Name"}',
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
}

const paletteBody = {
  body:
    '{"name":"Palette Name","color_1":"25e8c6","color_2":"a6bdad","color_3":"acfcd1","color_4":"2fa05a","color_5":"cf817c","project_id":1}',
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
}

describe('App', () => {
  let wrapper, instance

  beforeEach(() => {
    wrapper = shallow(<App />)
    instance = wrapper.instance()

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(1),
      })
    )
    wrapper.setState({
      projects: [],
      palettes: [],
      error: '',
      loading: false,
    })
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    expect(wrapper.state()).toEqual({
      projects: [],
      palettes: [],
      error: '',
      loading: false,
      link:
        'https://cors-anywhere.herokuapp.com/https://colorconstructor-api.herokuapp.com/api/v1/',
    })
  })

  describe('ComponentDidMount', () => {
    it("should invoke 'fetchProjects' when mounted", () => {
      let mockFn = jest.spyOn(instance, 'fetchProjects')
      instance.componentDidMount()
      expect(mockFn).toHaveBeenCalled()
    })

    it("should invoke 'fetchPalettes' when mounted", () => {
      let mockFn = jest.spyOn(instance, 'fetchPalettes')
      instance.componentDidMount()
      expect(mockFn).toHaveBeenCalled()
    })
  })

  describe('fetchProjects', () => {
    it('should set the state of loading equal to true when first invoked', () => {
      expect(wrapper.state('loading')).toEqual(false)
      instance.fetchProjects()
      expect(wrapper.state('loading')).toEqual(true)
    })

    it("should invoke 'fetch' with correct param", () => {
      instance.fetchProjects()
      expect(fetch).toHaveBeenCalledWith(projectsLink)
    })

    it('should set the state of projects with the response of the fetch', async () => {
      expect(wrapper.state('projects')).toEqual([])
      await instance.fetchProjects()
      expect(wrapper.state('projects')).toEqual(1)
    })

    it('should set the state of loading equal to false after it has finished fetching', async () => {
      wrapper.setState({ loading: true })
      await instance.fetchProjects()
      expect(wrapper.state('loading')).toEqual(false)
    })

    it('should throw an error if the response is not ok and save it to state', async () => {
      expect(wrapper.state('error')).toEqual('')
      window.fetch = jest.fn().mockImplementation(() => ({
        response: false,
      }))

      await instance.fetchProjects()
      expect(wrapper.state('error')).toEqual('projects.json is not a function')
    })
  })

  describe('fetchPalettes', () => {
    it('should set the state of loading equal to true when first invoked', () => {
      expect(wrapper.state('loading')).toEqual(false)
      instance.fetchPalettes()
      expect(wrapper.state('loading')).toEqual(true)
    })

    it("should invoke 'fetch' with correct param", () => {
      instance.fetchPalettes()
      expect(fetch).toHaveBeenCalledWith(palettesLink)
    })

    it.skip('should set the state of palettes with the response of the fetch', async () => {
      expect(wrapper.state('palettes')).toEqual([])
      await instance.fetchPalettes()
      expect(wrapper.state('palettes')).toEqual(1)
    })

    it('should set the state of loading equal to false after it has finished fetching', async () => {
      wrapper.setState({ loading: true })
      await instance.fetchPalettes()
      expect(wrapper.state('loading')).toEqual(false)
    })

    it('should throw an error if the response is not ok and save it to state', async () => {
      expect(wrapper.state('error')).toEqual('')
      window.fetch = jest.fn().mockImplementation(() => ({
        response: false,
      }))

      await instance.fetchPalettes()
      expect(wrapper.state('error')).toEqual('palettes.json is not a function')
    })
  })

  describe('addProject', () => {
    it("should invoke 'fetch' with the correct params", () => {
      instance.addProject('Project Name', 'Palette Name', mockColors)
      expect(fetch).toHaveBeenCalledWith(projectsLink, projectBody)
    })

    it('should set state of projects with the response of the fetch', async () => {
      expect(wrapper.state('projects')).toEqual([])
      await instance.addProject('Project Name', 'Palette Name', mockColors)
      expect(wrapper.state('projects')).toEqual(1)
    })

    it("should invoke 'addPalette' with the correct params", async () => {
      let mockFn = jest.spyOn(instance, 'addPalette')
      await instance.addProject('Project Name', 'Palette Name', mockColors)
      expect(mockFn).toHaveBeenCalledWith(undefined, 'Palette Name', mockColors)
    })

    it('should throw an error if the response is not ok and save it to state', async () => {
      expect(wrapper.state('error')).toEqual('')
      window.fetch = jest.fn().mockImplementation(() => ({
        response: false,
      }))

      await instance.addProject()
      expect(wrapper.state('error')).toEqual('response.json is not a function')
    })
  })

  describe('addPalette', () => {
    it("should invoke 'fetch' with the correct params", () => {
      instance.addPalette(1, 'Palette Name', mockColors)
      expect(fetch).toHaveBeenCalledWith(palettesLink, paletteBody)
    })

    it.skip('should set state of palettes with the response of the fetch', async () => {
      expect(wrapper.state('palettes')).toEqual([])
      await instance.addPalette(1, 'Palette Name', mockColors)
      expect(wrapper.state('palettes')).toEqual([1])
    })

    it('should throw an error if the response is not ok and save it to state', async () => {
      expect(wrapper.state('error')).toEqual('')
      window.fetch = jest.fn().mockImplementation(() => ({
        response: false,
      }))

      await instance.addPalette(1, 'Palette Name', mockColors)
      expect(wrapper.state('error')).toEqual('response.json is not a function')
    })
  })

  describe('deletePalette', () => {
    it('should invoke fetch with the correct params', () => {
      const mockId = 1
      const mockBody = { method: 'DELETE' }
      instance.deletePalette(mockId)
      expect(fetch).toHaveBeenCalledWith(`${palettesLink}/${mockId}`, mockBody)
    })
  })

  describe('deleteProject', () => {
    it("should invoke 'fetch' with the correct params", () => {
      const mockId = 1
      const mockBody = { method: 'DELETE' }
      instance.deleteProject(1)
      expect(fetch).toHaveBeenCalledWith(`${projectsLink}/${mockId}`, mockBody)
    })

    it('should set the state of projects after the fetch', async () => {
      wrapper.setState({ projects: MockData.mockProject })
      expect(wrapper.state('projects')).toEqual(MockData.mockProject)
      await instance.deleteProject(3)
      expect(wrapper.state('projects')).toEqual(1)
    })
  })

  describe('renderProjectCards', () => {
    it('should return the correct values when invoked', () => {
      wrapper.setState({ projects: MockData.mockProject })
      const results = instance.renderProjectCards()
      expect(results).toHaveLength(1)
    })
  })
})
