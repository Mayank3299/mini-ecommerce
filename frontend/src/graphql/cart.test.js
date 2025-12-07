import { describe, it, expect } from "vitest";
import {
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  GET_CART,
} from "./cart";

describe("GraphQL Cart Mutations and Queries", () => {
  describe("CREATE_CART mutation", () => {
    it("should be defined", () => {
      expect(CREATE_CART).toBeDefined();
    });

    it("should have correct mutation structure", () => {
      const queryString = CREATE_CART.loc.source.body;
      expect(queryString).toContain("mutation CreateCart");
      expect(queryString).toContain("createCart");
      expect(queryString).toContain("cart");
      expect(queryString).toContain("id");
      expect(queryString).toContain("message");
    });
  });

  describe("ADD_TO_CART mutation", () => {
    it("should be defined", () => {
      expect(ADD_TO_CART).toBeDefined();
    });

    it("should have correct mutation structure", () => {
      const queryString = ADD_TO_CART.loc.source.body;
      expect(queryString).toContain("mutation AddToCart");
      expect(queryString).toContain("$cartId: ID!");
      expect(queryString).toContain("$productId: ID!");
      expect(queryString).toContain("$quantity: Int!");
      expect(queryString).toContain("addToCart");
      expect(queryString).toContain("success");
      expect(queryString).toContain("message");
      expect(queryString).toContain("cartItems");
    });

    it("should include product details in response", () => {
      const queryString = ADD_TO_CART.loc.source.body;
      expect(queryString).toContain("product");
      expect(queryString).toContain("name");
      expect(queryString).toContain("price");
      expect(queryString).toContain("stock");
    });
  });

  describe("UPDATE_CART_ITEM mutation", () => {
    it("should be defined", () => {
      expect(UPDATE_CART_ITEM).toBeDefined();
    });

    it("should have correct mutation structure", () => {
      const queryString = UPDATE_CART_ITEM.loc.source.body;
      expect(queryString).toContain("mutation UpdateCartItem");
      expect(queryString).toContain("$cartId: ID!");
      expect(queryString).toContain("$productId: ID!");
      expect(queryString).toContain("$quantity: Int!");
      expect(queryString).toContain("updateCartItemQuantity");
      expect(queryString).toContain("success");
    });
  });

  describe("REMOVE_FROM_CART mutation", () => {
    it("should be defined", () => {
      expect(REMOVE_FROM_CART).toBeDefined();
    });

    it("should have correct mutation structure", () => {
      const queryString = REMOVE_FROM_CART.loc.source.body;
      expect(queryString).toContain("mutation RemoveFromCart");
      expect(queryString).toContain("$cartId: ID!");
      expect(queryString).toContain("$productId: ID!");
      expect(queryString).toContain("removeFromCart");
      expect(queryString).toContain("success");
    });

    it("should not require quantity parameter", () => {
      const queryString = REMOVE_FROM_CART.loc.source.body;
      // Check the variable definitions don't include quantity
      const variableSection = queryString.match(/mutation RemoveFromCart\([^)]+\)/);
      expect(variableSection[0]).not.toContain("quantity");
    });
  });

  describe("GET_CART query", () => {
    it("should be defined", () => {
      expect(GET_CART).toBeDefined();
    });

    it("should have correct query structure", () => {
      const queryString = GET_CART.loc.source.body;
      expect(queryString).toContain("query GetCart");
      expect(queryString).toContain("$id: ID!");
      expect(queryString).toContain("cart(id: $id)");
      expect(queryString).toContain("cartItems");
    });

    it("should include all necessary cart item fields", () => {
      const queryString = GET_CART.loc.source.body;
      expect(queryString).toContain("id");
      expect(queryString).toContain("quantity");
      expect(queryString).toContain("product");
      expect(queryString).toContain("name");
      expect(queryString).toContain("price");
      expect(queryString).toContain("stock");
    });
  });
});


