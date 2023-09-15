import axios from "axios";
import React from "react";
import { useInfiniteQuery } from "react-query";

const InfiniteQueryPage = () => {
  const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(
      `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
    );
  };
  const {
    data,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("color", fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      // 8 colors and each page 2 colors so we have 4 pages
      // with this property we can increase page number
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>LOADING COLORS ..... </h2>;
  }
  if (isError) {
    return <h2>{error.message} </h2>;
  }
  return (
    <>
      <div>showing all the colors :</div>
      {data?.pages.map((group, i) => {
        return (
          <div key={i} className="text-2xl font-bold">
            {group.data.map((color) => (
              <h2 key={color.id}>
                {color.id}--{color.color}
              </h2>
            ))}
          </div>
        );
      })}

      <div>
        <button
          disabled={!hasNextPage}
          onClick={fetchNextPage}
          className="bg-slate-500 p-3 rounded"
        >
          Load more
        </button>
      </div>
      {/* show the loading indicator */}
      <div>{isFetching && !isFetchingNextPage ? "fetching ... " : null}</div>
    </>
  );
};

export default InfiniteQueryPage;
