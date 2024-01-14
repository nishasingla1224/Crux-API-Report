import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const data = [
  { name: "John", age: 25, salary: 50000, email: "john@example.com" },
  { name: "Alice", age: 30, salary: 60000, email: "alice@example.com" },
  { name: "Bob", age: 22, salary: 45000, email: "bob@example.com" },
  // Add more data as needed
];

const RangeFilterTable = () => {
  const [columnName, setColumnName] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const handleColumnNameChange = (event) => {
    setColumnName(event.target.value);
    setMinValue("");
    setMaxValue("");
  };

  const handleMinValueChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxValueChange = (event) => {
    setMaxValue(event.target.value);
  };

  const filteredData = data.filter((row) => {
    if (!columnName || !minValue || !maxValue) {
      return true; // No filter applied
    }

    const columnValue = row[columnName];
    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    return !isNaN(columnValue) && columnValue >= min && columnValue <= max;
  });

  return (
    <div>
      <h2>Material-UI Table with Range Filter</h2>
      <Select value={columnName} onChange={handleColumnNameChange}>
        <MenuItem value="">Select Column</MenuItem>
        {Object.keys(data[0]).map((column) => (
          <MenuItem key={column} value={column}>
            {column}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Min Value"
        variant="outlined"
        type="number"
        value={minValue}
        onChange={handleMinValueChange}
      />
      <TextField
        label="Max Value"
        variant="outlined"
        type="number"
        value={maxValue}
        onChange={handleMaxValueChange}
      />
    </div>
  );
};

export default RangeFilterTable;
