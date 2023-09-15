import { Link, Route, Routes } from "react-router-dom";
import RQSuperHerosPage from "./components/RQSuperHeros.page";
import SuperHerosPage from "./components/SuperHeros.page";
import HomePage from "./components/Home.page";
import "./App.css";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import DynamicParallelPage from "./components/DynamicParallel.page";
import DependentSeqPAge from "./components/DependentSeq.page";
import RQColorPaginationPage from "./components/RQColorPagination.page";
import InfiniteQueryPage from "./components/InfiniteQuery.page";
import ArticleInfiniteQueryPage from "./components/ArticleInfiniteQuery.page";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/super-heroes">Traditional Super Heroes</Link>
          </li>
          <li>
            <Link to="/rq-super-heroes">RQ Super Heroes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/super-heroes" element={<SuperHerosPage />} />
        <Route path="/rq-colors" element={<RQColorPaginationPage />} />
        <Route path="/rq-infinite" element={<InfiniteQueryPage />} />
        <Route path="/rq-article" element={<ArticleInfiniteQueryPage />} />
        <Route path="/rq-super-heroes" element={<RQSuperHerosPage />} />
        <Route path="/rq-super-heroes/:heroId" element={<RQSuperHeroPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/parallel-queries" element={<ParallelQueriesPage />} />
        <Route
          path="/rq-dependent"
          element={<DependentSeqPAge email="mamad@mamad.com" />}
        />
        <Route
          path="/dynamic-parallel-queries"
          element={<DynamicParallelPage heroId={[1, 3, 5]} />}
        />
      </Routes>
    </div>
  );
}

export default App;
