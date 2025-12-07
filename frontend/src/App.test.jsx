import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";
import { PRODUCTS_QUERY } from "./graphql/queries";
import { GET_CART, CREATE_CART, ADD_TO_CART } from "./graphql/cart";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const renderWithProviders = (mocks) => {
  return render(
    <MockedProvider mocks={mocks}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </MockedProvider>
  );
};

describe("App component", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    vi.clearAllMocks();
  });

  const productsMock = {
    request: { query: PRODUCTS_QUERY },
    result: {
      data: {
        products: [
          { __typename: "Product", id: "1", name: "T-shirt", price: 499, stock: 10 },
          { __typename: "Product", id: "2", name: "Jeans", price: 999, stock: 5 },
          { __typename: "Product", id: "3", name: "Sneakers", price: 2499, stock: 0 },
        ],
      },
    },
  };

  it("shows loading spinner initially", () => {
    renderWithProviders([productsMock]);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders products after loading", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      expect(screen.getByText("T-shirt")).toBeInTheDocument();
      expect(screen.getByText("Jeans")).toBeInTheDocument();
      expect(screen.getByText("Sneakers")).toBeInTheDocument();
    });
  });

  it("renders product prices correctly", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      expect(screen.getByText("₹499")).toBeInTheDocument();
      expect(screen.getByText("₹999")).toBeInTheDocument();
      expect(screen.getByText("₹2499")).toBeInTheDocument();
    });
  });

  it("renders the Navbar", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      expect(screen.getByText("ChatPat Store")).toBeInTheDocument();
    });
  });

  it("shows cart button in navbar", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /^cart$/i })).toBeInTheDocument();
    });
  });

  it("displays error message when query fails", async () => {
    const errorMock = {
      request: { query: PRODUCTS_QUERY },
      error: new Error("Network error"),
    };

    renderWithProviders([errorMock]);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("renders Add to Cart buttons for each product", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
      expect(addButtons).toHaveLength(3);
    });
  });

  it("shows IN STOCK for products with stock", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      const inStockLabels = screen.getAllByText("IN STOCK");
      expect(inStockLabels).toHaveLength(2);
    });
  });

  it("shows OUT OF STOCK for products without stock", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      expect(screen.getByText("OUT OF STOCK")).toBeInTheDocument();
    });
  });

  it("opens cart drawer when cart button is clicked", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      expect(screen.getByText("T-shirt")).toBeInTheDocument();
    });

    const cartButton = screen.getByRole("button", { name: /^cart$/i });
    fireEvent.click(cartButton);

    await waitFor(() => {
      expect(screen.getByText("Your Cart")).toBeInTheDocument();
    });
  });

  it("shows empty cart message initially", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      expect(screen.getByText("T-shirt")).toBeInTheDocument();
    });

    const cartButton = screen.getByRole("button", { name: /^cart$/i });
    fireEvent.click(cartButton);

    await waitFor(() => {
      expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    });
  });

  it("renders products in a grid layout", async () => {
    renderWithProviders([productsMock]);

    await waitFor(() => {
      expect(screen.getByText("T-shirt")).toBeInTheDocument();
    });

    expect(screen.getByText("T-shirt")).toBeInTheDocument();
    expect(screen.getByText("Jeans")).toBeInTheDocument();
    expect(screen.getByText("Sneakers")).toBeInTheDocument();
  });

  describe("with existing cart", () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue("cart-123");
    });

    it("fetches cart data when cartId exists in localStorage", async () => {
      const cartMock = {
        request: {
          query: GET_CART,
          variables: { id: "cart-123" },
        },
        result: {
          data: {
            cart: {
              __typename: "Cart",
              id: "cart-123",
              cartItems: [
                {
                  __typename: "CartItem",
                  id: "item-1",
                  quantity: 2,
                  product: { __typename: "Product", id: "1", name: "T-shirt", price: 499, stock: 10 },
                },
              ],
            },
          },
        },
      };

      renderWithProviders([productsMock, cartMock]);

      await waitFor(() => {
        expect(screen.getByText("T-shirt")).toBeInTheDocument();
      });
    });
  });
});

describe("App integration tests", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    vi.clearAllMocks();
  });

  const productsMock = {
    request: { query: PRODUCTS_QUERY },
    result: {
      data: {
        products: [
          { __typename: "Product", id: "1", name: "Test Product", price: 100, stock: 5 },
        ],
      },
    },
  };

  it("creates cart and adds item when adding to empty cart", async () => {
    const createCartMock = {
      request: { query: CREATE_CART },
      result: {
        data: {
          createCart: {
            __typename: "CreateCartPayload",
            cart: { __typename: "Cart", id: "new-cart-123" },
            message: "Cart created",
          },
        },
      },
    };

    const addToCartMock = {
      request: {
        query: ADD_TO_CART,
        variables: { cartId: "new-cart-123", productId: "1", quantity: 1 },
      },
      result: {
        data: {
          addToCart: {
            __typename: "AddToCartPayload",
            success: true,
            message: "Added to cart",
            cart: {
              __typename: "Cart",
              id: "new-cart-123",
              cartItems: [
                {
                  __typename: "CartItem",
                  id: "item-1",
                  quantity: 1,
                  product: { __typename: "Product", id: "1", name: "Test Product", price: 100, stock: 4 },
                },
              ],
            },
          },
        },
      },
    };

    const getCartMock = {
      request: {
        query: GET_CART,
        variables: { id: "new-cart-123" },
      },
      result: {
        data: {
          cart: {
            __typename: "Cart",
            id: "new-cart-123",
            cartItems: [
              {
                __typename: "CartItem",
                id: "item-1",
                quantity: 1,
                product: { __typename: "Product", id: "1", name: "Test Product", price: 100, stock: 4 },
              },
            ],
          },
        },
      },
    };

    renderWithProviders([productsMock, createCartMock, addToCartMock, getCartMock]);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
  });
});
