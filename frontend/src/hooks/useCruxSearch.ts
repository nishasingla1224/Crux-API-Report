// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useState, useCallback } from "react";
import { CruxApiResponse, CruxApiValue } from "../components/DataTable";
import { isValidURL } from "../utils/searchUtil";

function useCruxSearch() {
  const [tableData, setTableData] = useState<CruxApiResponse[] | []>([]);

  const fetchSiteData = useCallback((url: string) => {
    return fetch(`/api/data?url=${url}`).then((res) => res.json());
  }, []);

  const handleSearch = useCallback(async (val: string) => {
    const urlList: string[] = val.split(",");
    const promiseList: any[] = [];
    urlList.forEach((url: string) => {
      let trimmedUrl = url.trim();
      if (isValidURL(trimmedUrl)) {
        promiseList.push(fetchSiteData(trimmedUrl));
      }
    });

    try {
      let res = (await Promise.allSettled(promiseList)) as {
        status: "fulfilled" | "rejected";
        value: CruxApiValue;
      }[];

      const fulfilledRequests = res.filter((obj) => !!obj.value.record);
      const rejectedRequests = res.filter((obj) => !obj.value.record);

      //   const { record } = await res.json();
      const tableData = fulfilledRequests.map((obj) => obj?.value?.record);
      debugger;
      setTableData(tableData);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const handleMultipleSearch = (val: string) => {
    const urlList = val.split(",");

    urlList.map((url) => url);
  };
  return { tableData, handleSearch, handleMultipleSearch };
}
export default useCruxSearch;
