import "./App.css";
import { Typography, Container } from "@mui/material";

import SearchBar from "./components/SearchBar/SearchBar";
import DataTable from "./components/DataTable/DataTable";
import useCruxSearch from "./hooks/useCruxSearch";

function App() {
  // useEffect(() => {
  //   // Example API request to your Node.js server
  //   fetch('/api/data')
  //     .then((response) => response.json())
  //     .then((result) => setData(result))
  //     .catch((error) => console.error('API Error:', error));
  // }, []);

  const { tableData, handleSearch } = useCruxSearch();

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        CRUX Report
      </Typography>
      <SearchBar onSearch={handleSearch} />

      {tableData?.length > 0 && (
        <div className="mt10">
          <DataTable tableData={tableData} />
        </div>
      )}
    </Container>
  );
}

export default App;
