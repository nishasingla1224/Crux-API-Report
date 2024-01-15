import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SearchInputProps } from "./types";
import { Stack } from "@mui/material";
import { searchBtnStyles, searchFieldStyles } from "./constants";

const SearchBar: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Stack direction="row">
      <TextField
        label="Enter Comma separated Urls"
        variant="outlined"
        value={searchQuery}
        style={searchFieldStyles}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={searchBtnStyles}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
