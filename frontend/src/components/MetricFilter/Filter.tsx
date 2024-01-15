import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {
  CruxPropertyName,
  metricKeyDisplayNameMap,
  metricsList,
} from "../DataTable";
import { MenuProps } from "./constants";
import { FormHelperText } from "@mui/material";
import { MetricFilterComponentProps } from "./types";

export default function MetricFilter({
  metricName,
  handleChange,
}: MetricFilterComponentProps) {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Metrics</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={metricName}
          onChange={handleChange}
          input={<OutlinedInput label="Metrics" />}
          renderValue={(selected) =>
            selected
              .map(
                (prop: string) =>
                  metricKeyDisplayNameMap[prop as CruxPropertyName]
              )
              .join(", ")
          }
          MenuProps={MenuProps}
        >
          {metricsList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={metricName.indexOf(name) > -1} />
              <ListItemText primary={metricKeyDisplayNameMap[name]} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          Select the metrics which you want to analyze
        </FormHelperText>
      </FormControl>
    </div>
  );
}
