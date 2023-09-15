import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const RQColorPaginationPage = () => {
  const [pageNumber, setpageNumber] = useState(1);
  const fetchColors = () => {
    return axios.get(
      `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
    );
  };
  const { data, isLoading, error, isError, isFetching } = useQuery(
    "color",
    fetchColors,
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>LOADING COLORS ..... </h2>;
  }
  if (isError) {
    return <h2>{error.message} </h2>;
  }
  return (
    <>
      <div>showing all the colors :</div>
      {data?.data.map((color) => {
        return (
          <div key={color.id} className="text-2xl font-bold">
            {color.id} -- {color.color}
          </div>
        );
      })}
      <div>
        <button
          className="bg-slate-500 p-2 mr-2"
          onClick={() => setpageNumber((pgnmb) => pgnmb - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          className="bg-slate-500 p-2 "
          onClick={() => setpageNumber((pgnmb) => pgnmb + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching && "loading ...."}
    </>
  );
};

export default RQColorPaginationPage;
