import { CruxPropertyName } from "./types";

export const pageSize = 20;
export const maxConcurrentAPICalls = 5;
export const metricThresholds = {
  first_contentful_paint: {
    firstThreshold: 1800,
    secondThreshold: 3000,
  },
  cumulative_layout_shift: {
    firstThreshold: 0.1,
    secondThreshold: 0.25,
  },
  largest_contentful_paint: {
    firstThreshold: 2500,
    secondThreshold: 4000,
  },
  first_input_delay: {
    firstThreshold: 100,
    secondThreshold: 300,
  },
  interaction_to_next_paint: {
    firstThreshold: 200,
    secondThreshold: 500,
  },
  experimental_time_to_first_byte: {
    firstThreshold: 800,
    secondThreshold: 1800,
  },
};

export const metricsList: CruxPropertyName[] = [
  "cumulative_layout_shift",
  "experimental_time_to_first_byte",
  "first_contentful_paint",
  "first_input_delay",
  "interaction_to_next_paint",
  "largest_contentful_paint",
];

export const metricKeyDisplayNameMap = {
  first_contentful_paint: "FCP",
  cumulative_layout_shift: "CLS",
  largest_contentful_paint: "LCP",
  first_input_delay: "FID",
  interaction_to_next_paint: "INP",
  experimental_time_to_first_byte: "TTFB",
};

export const weights = {
  first_contentful_paint: 0.25,
  largest_contentful_paint: 0.25,
  cumulative_layout_shift: 0.2,
  first_input_delay: 0.15,
  interaction_to_next_paint: 0.05,
  experimental_time_to_first_byte: 0.1,

  // Adjust weights based on importance
};

export const metricPerformanceImprovementDoc = {
  first_contentful_paint: "https://web.dev/articles/fcp#how_to_improve_fcp",
  cumulative_layout_shift: "https://web.dev/articles/optimize-cls",
  largest_contentful_paint: "https://web.dev/articles/optimize-lcp",
  first_input_delay: "https://web.dev/articles/optimize-fid",
  interaction_to_next_paint: "https://web.dev/articles/optimize-inp",
  experimental_time_to_first_byte: "https://web.dev/articles/optimize-ttfb",
};

export const originStyles = {
  color: "darkcyan",
  fontSize: "20px",
  fontWeight: "bold",
};

export const scoreStyles = {
  color: "darkviolet",
  fontSize: "18px",
  fontWeight: "bold",
};
