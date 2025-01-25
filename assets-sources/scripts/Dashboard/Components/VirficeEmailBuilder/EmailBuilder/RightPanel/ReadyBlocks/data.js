import { allCTA } from "./categories/cta";
import { allFeatures } from "./categories/features";
import { allHeaders } from "./categories/headers";

export const allBlocks = [
  {
    id: "headers",
    title: "Header",
    blocks: allHeaders,
  },
  {
    id: "feature",
    title: "Feature",
    blocks: allFeatures,
  },

  {
    id: "cta",
    title: "Call to Actions",
    blocks: allCTA,
  },
];
