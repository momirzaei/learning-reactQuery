import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheros");
};
const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheros", hero);
};
export const useSuperHeroData = (onSuccess, onError) => {
  return useQuery("super-heros", fetchSuperHeros, {
    //cacheTime: 5000, normal it is 5 min , not loading data until this time finish
    //staleTime: 30000, normal it is 0 sec , not feteching data until this time finish
    //refetchOnMount: true, //if the data is stale the query will refetch
    //refetchOnMount: false,
    //refetchOnMount: "always", // always refetch
    //refetchOnWindowFocus: true, // any time ur tab lose focus and gain background data refetch if it is true
    //refetchInterval: 2000, refetch screen when u are in background per 2 sec
    //refetchIntervalInBackground:true, refetch data on react query even u are not in screen
    //enabled: false, //cause the enable is false data does not fetch , we can use it by button for fetching
    onSuccess,
    onError,
    //onSuccess and OnError for the time that we want to show a callback from the result we get from queries
    //refetchInterval: duration,
    // select: (data) => {
    //   return data.data.map((hero) => hero.first_name);
    // }, //select proper data from all the data we have have map over it (in this case we just select first name and get it as our data)
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    //after usemutation work porperly and succeed
    //we can invalidate superhero query by a queryClient
    //we can refetch the superhero query
    // onSuccess: (data) => {
    //   // by using setquery , data network does not call GET API again
    //   // and just add new data to prev data we have
    //   // but by using invalidateQureis data by fetching data we call get api again
    //   // queryClient.invalidateQueries("super-heros");
    //   queryClient.setQueryData("super-heros", (oldQuerydata) => {
    //     return {
    //       ...oldQuerydata,
    //       data: [...oldQuerydata.data, data.data],
    //     };
    //   });
    // },
    //this is the code for optimistic updates
    //optimistic update assume that the server will
    //respond the user u do the work successfully and accomplished ur work

    //do not override optimistic update
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heros");
      //hold current query data help roll back if current query failed
      const previousHeroData = queryClient.getQueryData("super-heros");
      queryClient.setQueryData("super-heros", (oldQuerydata) => {
        return {
          ...oldQuerydata,
          data: [
            ...oldQuerydata.data,
            { id: oldQuerydata?.data?.length + 1, ...newHero },
          ],
        };
      });
      // this will be use to roll back data if the current query failed
      return {
        previousHeroData,
      };
    },
    // addition information to mutation  in context
    //and we can access prev data when error accur
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heros", context.previousHeroData);
    },
    onSettle: () => {
      queryClient.invalidateQueries("super-heros");
    },
  });
};

export default useSuperHeroData;
