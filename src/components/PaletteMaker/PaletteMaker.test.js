import React from 'react'
import { shallow } from 'enzyme'
import PaletteMaker from './PaletteMaker'
import MockData from '../../assets/mockData'

const mockColorsFalse = MockData.mockColorsFalse
const mockColorsTrue = MockData.mockColorsTrue
const mockProjects = MockData.mockProject
const mockPalettes = MockData.mockPalettes
const mockPalette = MockData.mockPalette
const mockAddProject = jest.fn()
const mockAddPalette = jest.fn()
const mockPatchPallette = jest.fn()

describe('PaletteMaker', () => {
  let wrapper, instance

  beforeEach(() => {
    wrapper = shallow(
      <PaletteMaker
        projects={mockProjects}
        addProject={mockAddProject}
        addPalette={mockAddPalette}
        palettes={mockPalettes}
        palette={mockPalette}
        patchPalette={mockPatchPallette}
      />
    )
    instance = wrapper.instance()

    wrapper.setState({
      paletteTitle: '',
      projectTitle: '',
      chosenProject: 0,
      chosenPalette: 0,
      colors: [
        { isLocked: false, hex: '', id: 1 },
        { isLocked: false, hex: '', id: 2 },
        { isLocked: false, hex: '', id: 3 },
        { isLocked: false, hex: '', id: 4 },
        { isLocked: false, hex: '', id: 5 },
      ],
      newProject: false,
      newPalette: false,
      editProject: false,
      editProjectButton: false,
    })
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    expect(wrapper.state()).toEqual({
      paletteTitle: '',
      projectTitle: '',
      chosenProject: 0,
      chosenPalette: 0,
      colors: [
        { isLocked: false, hex: '', id: 1 },
        { isLocked: false, hex: '', id: 2 },
        { isLocked: false, hex: '', id: 3 },
        { isLocked: false, hex: '', id: 4 },
        { isLocked: false, hex: '', id: 5 },
      ],
      newProject: false,
      newPalette: false,
      editProject: false,
      editProjectButton: false,
    })
  })

  describe('componentDidMount', () => {
    it("should invoke 'generateColors' when mounted", () => {
      let mockFn = jest.spyOn(instance, 'generateColors')
      instance.componentDidMount()
      expect(mockFn).toHaveBeenCalled()
    })
  })

  describe('generateColors', () => {
    it('should generate random colors and save them to state', () => {
      expect(wrapper.state('colors')).toEqual([
        { isLocked: false, hex: '', id: 1 },
        { isLocked: false, hex: '', id: 2 },
        { isLocked: false, hex: '', id: 3 },
        { isLocked: false, hex: '', id: 4 },
        { isLocked: false, hex: '', id: 5 },
      ])

      instance.generateColors()
      expect(wrapper.state().colors[0].hex).toHaveLength(7)
      expect(wrapper.state().colors[1].hex).toHaveLength(7)
      expect(wrapper.state().colors[2].hex).toHaveLength(7)
      expect(wrapper.state().colors[3].hex).toHaveLength(7)
      expect(wrapper.state().colors[4].hex).toHaveLength(7)
    })

    it("should invoke 'generateColors' generate-colors-btn is clicked", () => {
      let mockFn = jest.spyOn(instance, 'generateColors')
      wrapper.find("[data-test='generate-colors-btn']").simulate('click')
      expect(mockFn).toHaveBeenCalled()
    })
  })

  describe('lockPalette', () => {
    it('should set the state of a colors isLocked to true', () => {
      wrapper.setState({ colors: mockColorsFalse })
      instance.lockPalette(1)
      expect(wrapper.state('colors')).toEqual(mockColorsTrue)
    })
  })

  describe('renderPalettes', () => {
    it('should return the correct value when invoked', () => {
      const results = instance.renderPalettes()
      expect(results).toHaveLength(5)
    })
  })

  describe('handleSubmit', () => {
    it("should invoke 'handleSubmit' on new-palette-form submit", () => {
      wrapper.setState({ newPalette: true })
      jest.spyOn(instance, 'handleSubmit')
      wrapper
        .find("[data-test='new-palette-form']")
        .simulate('submit', { preventDefault() {} })
      expect(instance.handleSubmit).toHaveBeenCalled()
    })

    it("should invoke 'handleSubmit' on new-project-form submit", () => {
      wrapper.setState({ newProject: true })
      jest.spyOn(instance, 'handleSubmit')
      wrapper
        .find("[data-test='new-project-form']")
        .simulate('submit', { preventDefault() {} })
      expect(instance.handleSubmit).toHaveBeenCalled()
    })

    it("should invoke 'handleEdit' on edit-project-form submit", () => {
      wrapper.setState({
        editProject: true,
        chosenPalette: 3,
      })
      jest.spyOn(instance, 'handleEdit')
      wrapper
        .find("[data-test='edit-project-form']")
        .simulate('submit', { preventDefault() {} })
      expect(instance.handleEdit).toHaveBeenCalled()
    })

    it("should invoke 'addProject' if the state of chosenProject equals 0", () => {
      expect(wrapper.state('chosenProject')).toEqual(0)
      instance.handleSubmit({ preventDefault() {} })
      expect(mockAddProject).toHaveBeenCalled()
    })

    it("should invoke 'addPalette' if the state of chosenProject is greater than 1", () => {
      wrapper.setState({ chosenProject: 1 })
      instance.handleSubmit({ preventDefault() {} })
      expect(mockAddPalette).toHaveBeenCalled()
    })
  })

  describe('On change events', () => {
    it('should set the state of of paletteTitle while the user types in the input', () => {
      wrapper.setState({ newPalette: true, chosenProject: 1 })
      expect(wrapper.state('paletteTitle')).toEqual('')
      let paletteTitle = {
        target: { value: 'Matts Palette', classList: 'paletteTitle' },
      }
      wrapper
        .find("[data-test='palette-title']")
        .simulate('change', paletteTitle)
      expect(wrapper.state('paletteTitle')).toEqual('Matts Palette')
    })

    it("should change the state of 'chosenProject' onChange", () => {
      wrapper.setState({ newPalette: true })
      expect(wrapper.state('chosenProject')).toEqual(0)
      let projectChosen = {
        target: { value: 1, classList: 'project-selector' },
      }
      wrapper
        .find("[data-test='project-select']")
        .simulate('change', projectChosen)
      expect(wrapper.state('chosenProject')).toEqual(1)
    })

    it("should change the state of 'chosenProject' onChange", () => {
      wrapper.setState({ editProject: true })
      expect(wrapper.state('chosenProject')).toEqual(0)
      let projectChosen = {
        target: { value: 1, classList: 'project-selector' },
      }
      wrapper
        .find("[data-test='project-select']")
        .simulate('change', projectChosen)
      expect(wrapper.state('chosenProject')).toEqual(1)
    })

    it("should change the state of 'projectTitle' onChange", () => {
      wrapper.setState({ newProject: true })
      expect(wrapper.state('projectTitle')).toEqual('')
      let projectTitle = {
        target: { value: 'Matts Project', classList: 'project-name-input' },
      }
      wrapper
        .find("[data-test='project-name']")
        .simulate('change', projectTitle)
      expect(wrapper.state('projectTitle')).toEqual('Matts Project')
    })
  })

  describe('State changes', () => {
    it("should set the state of 'newProject' equal to true when newProject is opened", () => {
      wrapper.find("[data-test='open-new-project']").simulate('click')
      expect(wrapper.state('newProject')).toEqual(true)
    })

    it("should set the state of 'newProject' equal to false when newProject is closed", () => {
      wrapper.setState({ newProject: true })
      wrapper.find("[data-test='close-new-project']").simulate('click')
      expect(wrapper.state('newProject')).toEqual(false)
    })

    it("should set the state of 'newPalette' equal to true when newPalette is opened", () => {
      wrapper.find("[data-test='open-new-palette']").simulate('click')
      expect(wrapper.state('newPalette')).toEqual(true)
    })

    it("should set the state of 'newPalette' equal to false when newPalette is closed", () => {
      wrapper.setState({ newPalette: true })
      wrapper.find("[data-test='close-new-palette']").simulate('click')
      expect(wrapper.state('newPalette')).toEqual(false)
    })

    it("should set the state of 'editProject' equal to true when editProject is opened", () => {
      wrapper.find("[data-test='open-edit-project']").simulate('click')
      expect(wrapper.state('editProject')).toEqual(true)
    })

    it("should set the state of 'editProject' equal to false when editProject is closed", () => {
      wrapper.setState({ editProject: true })
      wrapper.find("[data-test='close-edit-project']").simulate('click')
      expect(wrapper.state('editProject')).toEqual(false)
    })

    it("should invoke 'patchPalette' when user clicks update palette btn", () => {
      wrapper.setState({ editProjectButton: true, chosenPalette: 33 })
      wrapper.find("[data-test='update-palette-btn']").simulate('click')
      expect(mockPatchPallette).toHaveBeenCalled()
    })

    it('should set the state of editProjectButton to false when invoked', () => {
      wrapper.setState({ editProjectButton: true, chosenPalette: 33 })
      wrapper.find("[data-test='update-palette-btn']").simulate('click')
      expect(wrapper.state('editProjectButton')).toEqual(false)
    })

    it("should change the state of chosenPalette when invoked", () => {
      wrapper.setState({editProject: true})
      expect(wrapper.state("chosenPalette")).toEqual(0)
      let paletteInput = { target: { value: 33, classList: "palette-select" } };
      wrapper.find("[data-test='palette-select']").simulate('change', paletteInput)
      expect(wrapper.state("chosenPalette")).toEqual(33)
    })

    it("should change the state of paletteTitle when invoked", () => {
      wrapper.setState({newProject: true})
      expect(wrapper.state("paletteTitle")).toEqual("")
      let paletteInput = { target: { value: "Matts palette", classList: "palette-select" } };
      wrapper.find("[data-test='palette-name']").simulate('change', paletteInput)
      expect(wrapper.state("paletteTitle")).toEqual("Matts palette")
    })
  })
})
