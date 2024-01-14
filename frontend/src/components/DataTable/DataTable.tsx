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
} from "@mui/material";
import {
  CruxApiComponentProps,
  CruxApiResponse,
  CruxPropertyName,
  Direction,
  IMetric,
} from "./types";
import { getPropertyColor } from "../../utils/dataTableUtil";
import { metricKeyDisplayNameMap } from "./constants";

const DataTable = ({ tableData }: CruxApiComponentProps) => {
  const [orderBy, setOrderBy] = useState<string>("url");
  const [order, setOrder] = useState("asc");

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedData = [...tableData].sort(
    (a: CruxApiResponse, b: CruxApiResponse) => {
      if (orderBy === "url") {
        const aValue = a?.key.origin;
        const bValue = b?.key.origin;
        return order === "asc"
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      } else {
        const aMetric: IMetric =
          a.metrics[orderBy as unknown as CruxPropertyName];
        const bMetric: IMetric =
          b.metrics[orderBy as unknown as CruxPropertyName];

        const aValue = aMetric?.percentiles?.p75;
        const bValue = bMetric?.percentiles?.p75;
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }
    }
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "url"}
                onClick={() => handleSort("url")}
                direction={order as Direction}
              >
                Url
              </TableSortLabel>
            </TableCell>
            {Object.keys(tableData[0].metrics ?? []).map(
              (currentMetricName) => {
                return (
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === currentMetricName}
                      onClick={() => handleSort(currentMetricName)}
                      direction={order as Direction}
                    >
                      {
                        metricKeyDisplayNameMap[
                          currentMetricName as string as CruxPropertyName
                        ]
                      }
                    </TableSortLabel>
                  </TableCell>
                );
              }
            )}
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
                <TableCell>{origin}</TableCell>
                {Object.keys(metrics ?? []).map((currentMetricName: string) => {
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
                      {percentile}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
