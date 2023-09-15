import React from "react";
import { useParams } from "react-router-dom";
import useOneSuperhero from "../hooks/useOneSuperhero";

const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  //console.log(location);
  //console.log(heroId);
  const { isLoading, data, isError, error } = useOneSuperhero(heroId);
  //console.log(data);
  if (isLoading) {
    return <h2>Loading ..... </h2>;
  } //if it is fetching or loading show loading text
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <div>SUPER HERO</div>
      <div>
        {data?.data.first_name} -- {data?.data.last_name}
      </div>
    </>
  );
};

export default RQSuperHeroPage;
