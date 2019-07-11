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

const mockPalettes = [
  {
    "id": 3,
    "name": "test fe pal",
    "color_1": "#64807d",
    "color_2": "#778187",
    "color_3": "#75621e",
    "color_4": "#209bac",
    "color_5": "#0388ba",
    "project_id": 2,
    "created_at": "2019-07-10T04:49:40.102Z",
    "updated_at": "2019-07-10T04:49:40.102Z"
  },
  {
    "id": 33,
    "name": "kmmv",
    "color_1": "#d8aaeb",
    "color_2": "#08ea78",
    "color_3": "#3167fb",
    "color_4": "#acb23b",
    "color_5": "#783627",
    "project_id": 2,
    "created_at": "2019-07-10T20:27:09.888Z",
    "updated_at": "2019-07-10T20:27:09.888Z"
  },
  {
    "id": 37,
    "name": "lola",
    "color_1": "#6546f7",
    "color_2": "#ef845c",
    "color_3": "#b18500",
    "color_4": "#c8ba9b",
    "color_5": "#cf770f",
    "project_id": 25,
    "created_at": "2019-07-10T20:59:43.806Z",
    "updated_at": "2019-07-10T20:59:43.806Z"
  }
]

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
  mockSingleProject,
  mockPalettes
};
