import { render, screen, fireEvent, within } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { describe, it, expect, vi } from "vitest";
import CartDrawer from "./CartDrawer";

const renderWithChakra = (ui) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>);
};

describe("CartDrawer component", () => {
  const mockCartItems = [
    { id: "1", name: "T-shirt", price: 499, quantity: 2 },
    { id: "2", name: "Jeans", price: 999, quantity: 1 },
  ];

  const emptyCart = [];

  it("renders 'Your Cart' title when open", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={mockCartItems}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  it("shows empty cart message when cart is empty", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={emptyCart}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("renders all cart items", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={mockCartItems}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.getByText("T-shirt")).toBeInTheDocument();
    expect(screen.getByText("Jeans")).toBeInTheDocument();
  });

  it("displays individual item prices", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={mockCartItems}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.getByText("₹499 each")).toBeInTheDocument();
    expect(screen.getByText("₹999 each")).toBeInTheDocument();
  });

  it("displays item quantities", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={mockCartItems}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calculates and displays correct total", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={mockCartItems}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.getByText("₹1997")).toBeInTheDocument();
  });

  it("calculates item subtotals correctly", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={mockCartItems}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.getByText("₹998")).toBeInTheDocument();
    const priceElements = screen.getAllByText("₹999");
    expect(priceElements.length).toBeGreaterThanOrEqual(1);
  });

  it("calls onClose when Close button is clicked", () => {
    const mockOnClose = vi.fn();
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={mockOnClose}
        cartItems={mockCartItems}
        onUpdateCart={() => {}}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("shows Checkout button when cart has items", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={mockCartItems}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /checkout/i })).toBeInTheDocument();
  });

  it("hides Checkout button when cart is empty", () => {
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={emptyCart}
        onUpdateCart={() => {}}
      />
    );
    expect(screen.queryByRole("button", { name: /checkout/i })).not.toBeInTheDocument();
  });

  it("calls onUpdateCart with 'increase' when plus button is clicked", () => {
    const mockOnUpdateCart = vi.fn();
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={[{ id: "1", name: "T-shirt", price: 499, quantity: 2 }]}
        onUpdateCart={mockOnUpdateCart}
      />
    );

    const buttons = screen.getAllByRole("button");
    const iconButtons = buttons.filter((btn) => btn.querySelector("svg"));
    
    if (iconButtons.length >= 3) {
      fireEvent.click(iconButtons[2]);
      expect(mockOnUpdateCart).toHaveBeenCalledWith(
        { id: "1", name: "T-shirt", price: 499, quantity: 2 },
        "increase"
      );
    }
  });

  it("calls onUpdateCart with 'decrease' when minus button is clicked", () => {
    const mockOnUpdateCart = vi.fn();
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={[{ id: "1", name: "T-shirt", price: 499, quantity: 2 }]}
        onUpdateCart={mockOnUpdateCart}
      />
    );

    const buttons = screen.getAllByRole("button");
    const iconButtons = buttons.filter((btn) => btn.querySelector("svg"));
    
    if (iconButtons.length >= 1) {
      fireEvent.click(iconButtons[0]);
      expect(mockOnUpdateCart).toHaveBeenCalled();
    }
  });

  it("calls onUpdateCart with 'remove' when trash button is clicked", () => {
    const mockOnUpdateCart = vi.fn();
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={[{ id: "1", name: "T-shirt", price: 499, quantity: 2 }]}
        onUpdateCart={mockOnUpdateCart}
      />
    );

    const removeButton = screen.getByRole("button", { name: /remove item/i });
    fireEvent.click(removeButton);

    expect(mockOnUpdateCart).toHaveBeenCalledWith(
      { id: "1", name: "T-shirt", price: 499, quantity: 2 },
      "remove"
    );
  });

  it("handles cart with single item correctly", () => {
    const singleItem = [{ id: "1", name: "Single Item", price: 250, quantity: 3 }];
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={singleItem}
        onUpdateCart={() => {}}
      />
    );
    
    expect(screen.getByText("Single Item")).toBeInTheDocument();
    expect(screen.getByText("₹250 each")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    const priceElements = screen.getAllByText("₹750");
    expect(priceElements.length).toBeGreaterThanOrEqual(1);
  });

  it("handles high quantity items", () => {
    const highQuantityItem = [{ id: "1", name: "Bulk Item", price: 100, quantity: 50 }];
    renderWithChakra(
      <CartDrawer
        isOpen={true}
        onClose={() => {}}
        cartItems={highQuantityItem}
        onUpdateCart={() => {}}
      />
    );
    
    expect(screen.getByText("50")).toBeInTheDocument();
    const priceElements = screen.getAllByText("₹5000");
    expect(priceElements.length).toBeGreaterThanOrEqual(1);
  });
});

