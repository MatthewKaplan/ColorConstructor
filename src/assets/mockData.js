const mockColorsFalse = [
  {
    isLocked: false,
    hex: "25e8c6",
    id: 1
  },
  {
    isLocked: false,
    hex: "a6bdad",
    id: 2
  },
  {
    isLocked: false,
    hex: "acfcd1",
    id: 3
  },
  {
    isLocked: false,
    hex: "2fa05a",
    id: 4
  },
  {
    isLocked: false,
    hex: "cf817c",
    id: 5
  }
];

const mockColorsTrue = [
  {
    isLocked: true,
    hex: "25e8c6",
    id: 1
  },
  {
    isLocked: false,
    hex: "a6bdad",
    id: 2
  },
  {
    isLocked: false,
    hex: "acfcd1",
    id: 3
  },
  {
    isLocked: false,
    hex: "2fa05a",
    id: 4
  },
  {
    isLocked: false,
    hex: "cf817c",
    id: 5
  }
];

const mockColors = [
  {
    isLocked: false,
    hex: "25e8c6",
    id: 1
  },
  {
    isLocked: false,
    hex: "a6bdad",
    id: 2
  },
  {
    isLocked: false,
    hex: "acfcd1",
    id: 3
  },
  {
    isLocked: false,
    hex: "2fa05a",
    id: 4
  },
  {
    isLocked: false,
    hex: "cf817c",
    id: 5
  }
];

const mockPalette = [
  {
    id: 3,
    name: "palette 1",
    color_1: "#534496",
    color_2: "#d923eb",
    color_3: "#29c346",
    color_4: "#e51662",
    color_5: "#ee8c59",
    project_id: 3,
    created_at: "2019-07-02T21:25:43.996Z",
    updated_at: "2019-07-02T21:25:43.996Z"
  }
];

const mockProject = [
  {
    id: 3,
    name: "project 1",
    created_at: "2019-07-02T21:25:43.989Z",
    updated_at: "2019-07-02T21:25:43.989Z"
  }
];

const mockSingleProject = {
  id: 3,
  name: "project 1",
  created_at: "2019-07-02T21:25:43.989Z",
  updated_at: "2019-07-02T21:25:43.989Z"
};

module.exports = {
  mockColorsFalse,
  mockColorsTrue,
  mockColors,
  mockPalette,
  mockProject,
  mockSingleProject
};
