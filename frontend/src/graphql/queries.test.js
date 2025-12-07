import { describe, it, expect } from "vitest";
import { PRODUCTS_QUERY } from "./queries";

describe("GraphQL Queries", () => {
  describe("PRODUCTS_QUERY", () => {
    it("should be defined", () => {
      expect(PRODUCTS_QUERY).toBeDefined();
    });

    it("should have correct query structure", () => {
      const queryString = PRODUCTS_QUERY.loc.source.body;
      expect(queryString).toContain("products");
      expect(queryString).toContain("id");
      expect(queryString).toContain("name");
      expect(queryString).toContain("price");
      expect(queryString).toContain("stock");
    });
  });
});


