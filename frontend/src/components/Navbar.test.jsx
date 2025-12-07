import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { describe, it, expect, vi } from "vitest";
import Navbar from "./Navbar";

const renderWithChakra = (ui) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>);
};

describe("Navbar component", () => {
  it("renders the store name", () => {
    renderWithChakra(<Navbar cartCount={0} onCartClick={() => {}} />);
    expect(screen.getByText("ChatPat Store")).toBeInTheDocument();
  });

  it("renders the cart button", () => {
    renderWithChakra(<Navbar cartCount={0} onCartClick={() => {}} />);
    expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument();
  });

  it("does not show badge when cart count is 0", () => {
    renderWithChakra(<Navbar cartCount={0} onCartClick={() => {}} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("shows badge with correct count when cart has items", () => {
    renderWithChakra(<Navbar cartCount={5} onCartClick={() => {}} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("shows badge with large cart count", () => {
    renderWithChakra(<Navbar cartCount={99} onCartClick={() => {}} />);
    expect(screen.getByText("99")).toBeInTheDocument();
  });

  it("calls onCartClick when cart button is clicked", () => {
    const mockOnCartClick = vi.fn();
    renderWithChakra(<Navbar cartCount={3} onCartClick={mockOnCartClick} />);

    const cartButton = screen.getByRole("button", { name: /cart/i });
    fireEvent.click(cartButton);

    expect(mockOnCartClick).toHaveBeenCalledTimes(1);
  });
});


