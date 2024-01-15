import "./App.css";
import { Typography, Container } from "@mui/material";

import SearchBar from "./components/SearchBar/SearchBar";
import DataTable from "./components/DataTable/DataTable";
import useCruxSearch from "./hooks/useCruxSearch";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import { getFailedUrlsMsg, getInvalidUrlMsg } from "./utils/infoBlockUtil";

function App() {
  const { tableData, handleSearch, rejectedUrls, invalidUrls } =
    useCruxSearch();
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        CRUX Report
      </Typography>
      <SearchBar onSearch={handleSearch} />

      {invalidUrls?.length > 0 && (
        <InfoBlock infoType="error" message={getInvalidUrlMsg(invalidUrls)} />
      )}

      {tableData?.length > 0 && (
        <div className="mt10">
          <DataTable tableData={tableData} />
        </div>
      )}

      {rejectedUrls?.length > 0 && (
        <InfoBlock
          infoType="warning"
          message={getFailedUrlsMsg(rejectedUrls)}
        />
      )}
    </Container>
  );
}

export default App;
