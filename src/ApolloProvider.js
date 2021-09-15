import React from "react";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";

import { setContext } from "apollo-link-context";

const authLink = setContext((req, prev) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token? `Bearer ${token}`: ""
    }
  }
})
const httpLink = createHttpLink({ 
  uri: "http://localhost:4000"
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});


export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
