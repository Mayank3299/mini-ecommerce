import { gql } from "@apollo/client";

export const CREATE_CART = gql`
  mutation CreateCart {
    createCart(input:{}) {
      cart {
        id
      }
      message
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($cartId: ID!, $productId: ID!, $quantity: Int!) {
    addToCart(input: { cartId: $cartId, productId: $productId, quantity: $quantity }) {
      success
      message
      cart {
        id
        cartItems {
          id
          quantity
          product {
            id
            name
            price
            stock
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($cartId: ID!, $productId: ID!, $quantity: Int!) {
    updateCartItemQuantity(
      input: { cartId: $cartId, productId: $productId, quantity: $quantity }
    ) {
      success
      message
      cart {
        id
        cartItems {
          id
          quantity
          product {
            id
            name
            price
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartId: ID!, $productId: ID!) {
    removeFromCart(input: { cartId: $cartId, productId: $productId }) {
      success
      message
      cart {
        id
        cartItems {
          id
          quantity
          product {
            id
            name
            price
          }
        }
      }
    }
  }
`;

export const GET_CART = gql`
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      cartItems {
        id
        quantity
        product {
          id
          name
          price
          stock
        }
      }
    }
  }
`;
