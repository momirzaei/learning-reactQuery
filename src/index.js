import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryDevtools } from "react-query/devtools";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryclient = new QueryClient();
root.render(
  <QueryClientProvider client={queryclient}>
    <Router>
      <App />
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
);
