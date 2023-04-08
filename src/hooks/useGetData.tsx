import { useEffect, useState } from "react";

function arraysEqual(a: any, b: any) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default function useGetData(pageNumber: number) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.instantwebtools.net/v1/passenger?page=0&size=10"
      );
      const res: any = await response.json();
      setData((prevData: any) => {
        return [...prevData, ...res.data];
      });
    })();
  }, [pageNumber]);

  return { data };
}
