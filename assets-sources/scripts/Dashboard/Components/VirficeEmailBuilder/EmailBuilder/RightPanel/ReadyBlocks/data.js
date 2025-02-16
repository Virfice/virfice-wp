import { allCTA } from "./categories/cta";
import { allDiscountAndOffers } from "./categories/discount-and-offers";
import { allFeatures } from "./categories/features";
import { allFooters } from "./categories/footers";
import { allHeaders } from "./categories/headers";
import { allOrders } from "./categories/orders";
import { allProducts } from "./categories/products";
import { allSignature } from "./categories/signature";
import { allTestimonials } from "./categories/testimonial";
import { allTimers } from "./categories/timers";

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
  {
    id: "discount-offers",
    title: "Discount and Offers",
    blocks: allDiscountAndOffers,
  },
  {
    id: "orders",
    title: "Orders",
    blocks: allOrders,
  },
  {
    id: "products",
    title: "Products",
    blocks: allProducts,
  },
  {
    id: "signature",
    title: "Signature",
    blocks: allSignature,
  },
  {
    id: "testimonials",
    title: "Testimonials",
    blocks: allTestimonials,
  },
  {
    id: "timers",
    title: "Timers",
    blocks: allTimers,
  },
  {
    id: "footers",
    title: "Footers",
    blocks: allFooters,
  },
];
