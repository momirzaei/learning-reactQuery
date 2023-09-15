// import axios from "axios";
import { useState } from "react";
// import { useQuery } from "react-query";
import useSuperHeroData, {
  useAddSuperHeroData,
} from "../hooks/useSuperHeroData";
import { Link } from "react-router-dom";

const RQSuperHerosPage = () => {
  const [duration, setduration] = useState(3000);
  const [first_name, setFname] = useState();
  const [last_name, setLname] = useState();
  // const onSuccess = (data) => {
  //   if (data.data.length === 11) {
  //     setduration(false);
  //   }
  //   console.log("perform that data is working properly", data);
  // };

  // const onError = (error) => {
  //   if (error) setduration(false);
  //   console.log("perform that data is not working and having error", error);
  // };
  const onSuccess = (data) => {
    console.log("perform that data is working properly", data);
  };

  const onError = (error) => {
    console.log("perform that data is not working and having error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroData(onSuccess, onError);
  console.log({
    duration,
  });
  //using usemutation to post data to json server and save the data
  //2 feild that we have (fname , lname) add pass it to usemutation
  //use mutation also have isLoading and fetching and error and isError too
  //use may need to use aliasing to findout where u are using it and avoid confusing
  const { mutate: addhero } = useAddSuperHeroData();
  const handleNewperson = () => {
    console.log({ first_name, last_name });
    const hero = { first_name, last_name };
    addhero(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading ..... </h2>;
  } //if it is fetching or loading show loading text
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  // console.log(data);
  console.log({ isFetching, isLoading });

  return (
    <>
      <div>RQ superHerosPage</div>
      <div className="">
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFname(e.target.value)}
          className="bg-slate-200 m-2 p-2 rounded"
        />
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLname(e.target.value)}
          className="bg-slate-200 m-2 p-2 rounded"
        />
        <button onClick={handleNewperson} className="bg-slate-500 p-3 rounded">
          adding new person
        </button>
      </div>
      <button onClick={refetch} className="bg-slate-500 p-2 rounded">
        fetching heroes
      </button>
      {data?.data.map((hero) => {
        return (
          <div>
            <Link to={`/rq-super-heroes/${hero.id}`} key={hero.id}>
              {hero.first_name}
            </Link>
          </div>
        );
      })}
      {/* {data.map((heroFn) => {
        return <div>{heroFn}</div>;
      })} */}
    </>
  );
};

export default RQSuperHerosPage;
