import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const ParallelQueriesPage = () => {
  const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheros/");
  };
  const fetchFriends = () => {
    return axios.get("http://localhost:4000/friends/");
  };

  const { data: superheros } = useQuery("superheros", fetchSuperHeros);
  const { data: friends } = useQuery("friends", fetchFriends);
  return (
    <>
      <div>Super heros and friends</div>
      {superheros?.data.map((hero, index) => {
        return <div key={index}>{hero.first_name}</div>;
      })}
      <div>
        ================================================================================================================================
      </div>
      {friends?.data.map((friend, index) => {
        return <div key={index}>{friend.name}</div>;
      })}
    </>
  );
};

export default ParallelQueriesPage;
