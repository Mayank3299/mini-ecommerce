import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

// Use environment variable for API URL, fallback to localhost for local development
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/graphql";

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
