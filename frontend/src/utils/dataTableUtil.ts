import { metricThresholds } from "../components/DataTable/constants";
import {
  CruxPropertyName,
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
