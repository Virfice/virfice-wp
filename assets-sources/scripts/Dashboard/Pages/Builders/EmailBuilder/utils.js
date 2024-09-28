const settings = {
  heading: {
    type: "heading",
    title: "Settings Heading",
    subTitle: false,
  },
  divider: {
    type: "divider",
  },
  color: {
    type: "color",
    title: "Color",
    defaultValue: "#000000",
  },
  sliderWidth: {
    type: "sliderWidth",
    title: "Width",
    defaultValue: 100,
    min: 10,
    max: 400,
  },
};

const spacerElement = {
  id: "RANDOM_ID",
  name: "spacer",
  title: "Spacer",
  subTitle: "Edit the spacer element here",
  settings: {
    order: [
      "backgroundHeading",
      "fillColor",
      "borderWidth",
      "borderColor",
      "divider",
      "backgroundHeading2",
      "fillColor2",
      "borderWidth2",
      "borderColor2",
    ],
    backgroundHeading: { ...settings.heading, title: "Style 1" },
    fillColor: { ...settings.color, title: "Fill color" },
    borderWidth: {
      ...settings.sliderWidth,
      defaultValue: 24,
      title: "Height",
    },
    borderColor: { ...settings.color, title: "Border color" },
    divider: { ...settings.divider },
    backgroundHeading2: { ...settings.heading, title: "Style 2" },
    fillColor2: { ...settings.color, title: "Fill color" },
    borderWidth2: {
      ...settings.sliderWidth,
      defaultValue: 24,
      title: "Height",
    },
    borderColor2: { ...settings.color, title: "Border color" },
  },
  tabSettings: false,
  childs: [],
  status: "active",
};

export const pageInitData = {
  pageData: {
    id_1: { ...spacerElement, id: "id_1", childs: ["id_2", "id_3"] },
    id_2: { ...spacerElement, id: "id_2", childs: [], title: "Spacer 2" },
    id_3: { ...spacerElement, id: "id_3", childs: [], title: "Spacer 3" },
  },
  root: "id_1",
  globalCSS: "",
};
