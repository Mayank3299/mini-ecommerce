import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "./ProductCard";

const renderWithChakra = (ui) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>);
};

describe("ProductCard component", () => {
  const inStockProduct = {
    id: "1",
    name: "Test Product",
    price: 599,
    stock: 10,
  };

  const outOfStockProduct = {
    id: "2",
    name: "Out of Stock Product",
    price: 299,
    stock: 0,
  };

  it("renders product name correctly", () => {
    renderWithChakra(
      <ProductCard product={inStockProduct} onAddToCart={() => {}} />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders product price with rupee symbol", () => {
    renderWithChakra(
      <ProductCard product={inStockProduct} onAddToCart={() => {}} />
    );
    expect(screen.getByText("₹599")).toBeInTheDocument();
  });

  it("shows IN STOCK label when product is in stock", () => {
    renderWithChakra(
      <ProductCard product={inStockProduct} onAddToCart={() => {}} />
    );
    expect(screen.getByText("IN STOCK")).toBeInTheDocument();
  });

  it("shows OUT OF STOCK label when product stock is 0", () => {
    renderWithChakra(
      <ProductCard product={outOfStockProduct} onAddToCart={() => {}} />
    );
    expect(screen.getByText("OUT OF STOCK")).toBeInTheDocument();
  });

  it("renders Add to Cart button", () => {
    renderWithChakra(
      <ProductCard product={inStockProduct} onAddToCart={() => {}} />
    );
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("calls onAddToCart with product when button is clicked", () => {
    const mockOnAddToCart = vi.fn();
    renderWithChakra(
      <ProductCard product={inStockProduct} onAddToCart={mockOnAddToCart} />
    );

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(inStockProduct);
  });

  it("disables Add to Cart button when product is out of stock", () => {
    renderWithChakra(
      <ProductCard product={outOfStockProduct} onAddToCart={() => {}} />
    );

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    expect(addButton).toBeDisabled();
  });

  it("enables Add to Cart button when product is in stock", () => {
    renderWithChakra(
      <ProductCard product={inStockProduct} onAddToCart={() => {}} />
    );

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    expect(addButton).not.toBeDisabled();
  });

  it("handles product with null stock", () => {
    const nullStockProduct = { id: "3", name: "Null Stock", price: 100, stock: null };
    renderWithChakra(
      <ProductCard product={nullStockProduct} onAddToCart={() => {}} />
    );
    expect(screen.getByText("OUT OF STOCK")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeDisabled();
  });
});


