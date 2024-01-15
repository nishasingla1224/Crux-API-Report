import {
  metricPerformanceImprovementDoc,
  metricThresholds,
  metricsList,
  weights,
} from "../components/DataTable/constants";
import {
  CruxApiResponse,
  CruxPropertyName,
  IMetric,
  INormalizedMetric,
  ThresholdInterface,
} from "../components/DataTable/types";

export const getPropertyColor = (
  propertyName: CruxPropertyName,
  value: number
): string => {
  const metric: ThresholdInterface = metricThresholds[propertyName];
  if (value < metric?.firstThreshold) {
    return "green";
  } else if (value > metric?.secondThreshold) {
    return "red";
  } else {
    return "orange";
  }
};

export const getScore = (data: CruxApiResponse): number => {
  const { metrics } = data;

  // Normalize metrics to a scale of 0 to 100
  let normalizedMetrics: INormalizedMetric = {
    cumulative_layout_shift:
      metrics.cumulative_layout_shift.percentiles.p75 * 100,
    first_contentful_paint: 0,
    largest_contentful_paint: 0,
    experimental_time_to_first_byte: 0,
    first_input_delay: 0,
    interaction_to_next_paint: 0,
  };

  metricsList.forEach((metricName: CruxPropertyName) => {
    const { firstThreshold, secondThreshold } = metricThresholds[metricName];
    normalizedMetrics[metricName] =
      (Math.abs(metrics[metricName].percentiles.p75 - firstThreshold) /
        (secondThreshold - firstThreshold)) *
      100;
  });

  const score = metricsList.reduce((prev, currentMetric) => {
    return prev + weights[currentMetric] * normalizedMetrics[currentMetric];
  }, 0);

  return Math.floor(score);
};

export const getMetricImprovementDocLink = (
  propertyName: CruxPropertyName,
  value: number
): string => {
  const metric: ThresholdInterface = metricThresholds[propertyName];
  if (value < metric?.firstThreshold) {
    return "";
  } else {
    return metricPerformanceImprovementDoc[propertyName];
  }
};

export const getSortedTableData = (
  tableData: CruxApiResponse[],
  orderBy: string,
  order: string
) => {
  return [...tableData].sort((a: CruxApiResponse, b: CruxApiResponse) => {
    if (orderBy === "url") {
      const aValue = a?.key.origin;
      const bValue = b?.key.origin;
      return order === "asc"
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    } else {
      const aMetric: IMetric = a.metrics[orderBy as string as CruxPropertyName];
      const bMetric: IMetric = b.metrics[orderBy as string as CruxPropertyName];

      const aValue = aMetric?.percentiles?.p75;
      const bValue = bMetric?.percentiles?.p75;
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }
  });
};
