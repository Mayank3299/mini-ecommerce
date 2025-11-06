# frozen_string_literal: true

module Mutations
  class RemoveFromCart < BaseMutation
    field :success, Boolean, null: false
    field :message, String, null: false
    field :cart, Types::CartType, null: true

    argument :cart_id, ID, required: true
    argument :product_id, ID, required: true

    def resolve(cart_id:, product_id:)
      cart = Cart.find_by(id: cart_id)
      return { success: false, message: "Cart not found", cart: nil } unless cart

      item = cart.cart_items.find_by(product_id: product_id)
      return { success: false, message: "Item not found in cart.", cart: cart } unless item

      item.destroy
      { success: true, message: "Item removed successfully!", cart: cart }
    rescue => e
      { success: false, message: "Unexpected error: #{e.message}", cart: nil }
    end
  end
end
