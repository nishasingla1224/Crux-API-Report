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

export const metricKeyDisplayNameMap = {
  first_contentful_paint: "FCP",
  cumulative_layout_shift: "CLS",
  largest_contentful_paint: "LCP",
  first_input_delay: "FID",
  interaction_to_next_paint: "INP",
  experimental_time_to_first_byte: "TTFB",
};
