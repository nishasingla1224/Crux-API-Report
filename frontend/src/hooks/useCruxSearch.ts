import { useState, useCallback } from "react";
import { CruxApiResponse, CruxApiValue } from "../components/DataTable";
import { isValidURL } from "../utils/searchUtil";

interface IApiResponse {
  status: "fulfilled" | "rejected";
  value: CruxApiValue;
}

function useCruxSearch() {
  const [tableData, setTableData] = useState<CruxApiResponse[] | []>([]);
  const [rejectedUrls, setRejectedUrls] = useState<string[]>([]);
  const [invalidUrls, setInvalidUrls] = useState<string[]>([]);

  const fetchSiteData = useCallback((url: string) => {
    return fetch(`/api/data?url=${url}`).then((res) => res.json());
  }, []);

  const handleSearch = useCallback(async (val: string) => {
    setInvalidUrls([]);
    setRejectedUrls([]);
    const urlList: string[] = val.split(",");
    const promiseList: any[] = [];

    urlList.forEach((url: string) => {
      let trimmedUrl = url.trim();
      if (!isValidURL(trimmedUrl)) {
        setInvalidUrls((prev) => [...prev, trimmedUrl]);
      }
      if (isValidURL(trimmedUrl)) {
        promiseList.push(fetchSiteData(trimmedUrl));
      }
    });

    try {
      let res = (await Promise.allSettled(promiseList)) as IApiResponse[];

      const fulfilledRequests = res.filter((obj) => !!obj.value.record);
      const rejectedRequests = res.filter((obj) => !obj.value.record);

      const tableData = fulfilledRequests.map((obj) => obj?.value?.record);
      const rejectedUrlList = rejectedRequests.map((obj) => obj?.value?.url);

      setTableData(tableData);
      setRejectedUrls(rejectedUrlList);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return { tableData, handleSearch, rejectedUrls, invalidUrls };
}
export default useCruxSearch;
