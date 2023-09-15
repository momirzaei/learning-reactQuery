import { useState, useEffect } from "react";
import axios from "axios";

const SuperHerosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheros")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data?.map((hero) => {
        return <div>{hero.first_name}</div>;
      })}
    </>
  );
};

export default SuperHerosPage;
