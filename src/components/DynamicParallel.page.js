import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchHeros = (hId) => {
  console.log(hId);
  return axios.get(`http://localhost:4000/superheros/${hId}`);
};
const DynamicParallelPage = ({ heroId }) => {
  //   const DynamicParallel = useQueries(
  //     heroId.map((id) => {
  //       return {
  //         queryKey: ["super-hero", id],
  //         queryFn: () => fetchHeros(id),
  //       };
  //     })
  //   );
  const DynamicParallel = useQueries(
    heroId.map((id) => ({
      queryKey: ["super-hero", id],
      queryFn: () => fetchHeros(id),
    }))
  );
  console.log({ DynamicParallel });
  return <div>salam bar hamegiiiii</div>;
};

export default DynamicParallelPage;
