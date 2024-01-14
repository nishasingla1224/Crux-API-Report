export interface IHistogram {
  start: string;
  end: string;
  density: number;
}
export interface IPercentile {
  p75: number;
}
export interface IMetric {
  histogram: IHistogram[];
  percentiles: IPercentile;
}

export type CruxPropertyName =
  | "first_contentful_paint"
  | "largest_contentful_paint"
  | "cumulative_layout_shift"
  | "experimental_time_to_first_byte"
  | "first_input_delay"
  | "interaction_to_next_paint";

export interface CruxApiValue {
  record: CruxApiResponse;
}
interface Date {
  day: number;
  month: number;
  year: number;
}
export interface CruxApiResponse {
  collectionPeriod: {
    firstDate: Date;
    lastDate: Date;
  };
  key: {
    formFactor: string;
    origin: string;
  };
  metrics: {
    [key in CruxPropertyName]: IMetric;
  };
}
export interface CruxApiComponentProps {
  tableData: CruxApiResponse[];
}
export type Direction = "asc" | "desc";
export interface ThresholdInterface {
  firstThreshold: number;
  secondThreshold: number;
}
