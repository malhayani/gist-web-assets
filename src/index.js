import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/apollo";
import GistViewer from "./gist-viewer";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GistViewer />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
