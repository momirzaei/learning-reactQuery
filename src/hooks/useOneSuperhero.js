import axios from "axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

const useOneSuperhero = (heroId) => {
  //   const fetchSuperHero = (heroId) => {
  //     return axios.get(`http://localhost:4000/superheros/${heroId}`);
  //   };

  //   return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
  const fetchSuperHero = ({ queryKey }) => {
    const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheros/${heroId}`);
  };
  const queryClient = useQueryClient(); // has access to query chace we can access to set initial data

  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heros")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      //with this code we can manage cache and use the data in cache instead of loading data again and again
      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};

export default useOneSuperhero;
