import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchUser = (useremail) => {
  return axios.get(`http://localhost:4000/users/${useremail}`);
};
const fetchChannel = (channel) => {
  return axios.get(`http://localhost:4000/channels/${channel}`);
};

const DependentSeqPAge = ({ email }) => {
  const { data: users } = useQuery(["users", email], () => fetchUser(email));
  const channel = users?.data.channelId;
  const { data: channels } = useQuery(
    ["courses", channel],
    () => fetchChannel(channel),
    {
      enabled: !!channel, //to dependent this data to the users data we get to fetch this data just after we have the user's data
    }
  );
  console.log(channels);
  return <div></div>;
};

export default DependentSeqPAge;
