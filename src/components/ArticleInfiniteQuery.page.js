import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";

const getUsers = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `https://api.realworld.io/api/articles?limit=10&offset=${pageParam}`
  );
  const data = await res.json();
  return { ...data, prevOffset: pageParam };
};

const ArticleInfiniteQueryPage = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 10 > lastPage.articleCount) {
        return false;
      }

      return lastPage.prevOffset + 10;
    },
  });
  const articles = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.articles];
  }, []);
  console.log(articles);

  return (
    <div>
      <h1>Hello monsterlessons</h1>

      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<div>Loading...</div>}
      >
        <div>
          {articles &&
            articles.map((article, index) => (
              <div key={index} className="element">
                {article.title}
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ArticleInfiniteQueryPage;
