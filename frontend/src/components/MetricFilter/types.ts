import { SelectChangeEvent } from "@mui/material";

export interface MetricFilterComponentProps {
  metricName: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
}
