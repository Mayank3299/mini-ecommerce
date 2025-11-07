import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";
import { PRODUCTS_QUERY } from "./graphql/queries";

const mocks = [
  {
    request: {
      query: PRODUCTS_QUERY,
    },
    result: {
      data: {
        products: [
          { id: "1", name: "T-shirt", price: 499, stock: 10 },
          { id: "2", name: "Jeans", price: 999, stock: 5 },
        ],
      },
    },
  },
];

describe("App component", () => {
  it("renders products fetched from GraphQL", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("T-shirt")).toBeInTheDocument();
      expect(screen.getByText("Jeans")).toBeInTheDocument();
      expect(screen.getByText(/₹499/i)).toBeInTheDocument();
      expect(screen.getByText(/₹999/i)).toBeInTheDocument();
    });
  });
});
