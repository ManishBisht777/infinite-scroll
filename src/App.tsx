import { useEffect, useState } from "react";

function App() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [data, setData] = useState<any>([]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  }

  const fetchData = async () => {
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=1`
    );

    const res: any = await response.json();

    setData((prevData: any) => {
      return [...prevData, ...res.data];
    });
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section>
      <h1>Infinite scroll and react virtualised</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        {data &&
          data.map((dataa: any, idx: any) => {
            return (
              <div key={idx} className="bg-green-400 min-h-[80vh] min-w-[80vw]">
                <h1>{dataa._id}</h1>
                <p>{dataa.name}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default App;
