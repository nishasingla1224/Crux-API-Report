import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Link,
  SelectChangeEvent,
} from "@mui/material";
import {
  CruxApiComponentProps,
  CruxPropertyName,
  Direction,
  IMetric,
} from "./types";
import {
  getMetricImprovementDocLink,
  getPropertyColor,
  getScore,
  getSortedTableData,
} from "../../utils/dataTableUtil";
import {
  metricKeyDisplayNameMap,
  metricsList,
  originStyles,
  scoreStyles,
} from "./constants";
import MetricFilter from "../MetricFilter/Filter";

const DataTable = ({ tableData }: CruxApiComponentProps) => {
  const [orderBy, setOrderBy] = useState<string>("url");
  const [order, setOrder] = useState("asc");

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(metricsList);

  const handleMetricChange = (
    event: SelectChangeEvent<typeof selectedMetrics>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedMetrics(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = getSortedTableData(tableData, orderBy, order);

  return (
    <>
      <MetricFilter
        metricName={selectedMetrics}
        handleChange={handleMetricChange}
      />

      <TableContainer component={Paper} className="mt20">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "url"}
                  onClick={() => handleSort("url")}
                  direction={order as Direction}
                >
                  <strong>URL</strong>
                </TableSortLabel>
              </TableCell>
              {selectedMetrics.map((currentMetricName) => {
                return (
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === currentMetricName}
                      onClick={() => handleSort(currentMetricName)}
                      direction={order as Direction}
                    >
                      <strong>
                        {
                          metricKeyDisplayNameMap[
                            currentMetricName as string as CruxPropertyName
                          ]
                        }
                      </strong>
                    </TableSortLabel>
                  </TableCell>
                );
              })}
              <TableCell>
                <TableSortLabel
                  active={orderBy === "score"}
                  onClick={() => handleSort("score")}
                  direction={order as Direction}
                >
                  <strong>Relative Weighted Score</strong>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => {
              const {
                metrics,
                key: { origin },
              } = row;
              return (
                <TableRow key={index}>
                  <TableCell style={originStyles}>{origin}</TableCell>
                  {selectedMetrics.map((currentMetricName: string) => {
                    const currentMetric: IMetric =
                      metrics[currentMetricName as unknown as CruxPropertyName];
                    const percentile: number = currentMetric?.percentiles.p75;
                    return (
                      <TableCell
                        style={{
                          color: getPropertyColor(
                            currentMetricName as CruxPropertyName,
                            percentile
                          ),
                          fontWeight: "bold",
                        }}
                      >
                        {(getMetricImprovementDocLink(
                          currentMetricName as CruxPropertyName,
                          percentile
                        ) === "" &&
                          percentile) || (
                          <Link
                            href={getMetricImprovementDocLink(
                              currentMetricName as CruxPropertyName,
                              percentile
                            )}
                            color="inherit"
                            target="_blank"
                          >
                            {percentile}
                          </Link>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell style={scoreStyles}>{getScore(row)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default DataTable;
