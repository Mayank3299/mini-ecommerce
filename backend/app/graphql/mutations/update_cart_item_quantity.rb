# frozen_string_literal: true

module Mutations
  class UpdateCartItemQuantity < BaseMutation
    field :success, Boolean, null: false
    field :message, String, null: false
    field :cart, Types::CartType, null: true

    argument :cart_id, ID, required: true
    argument :product_id, ID, required: true
    argument :quantity, Integer, required: true

    def resolve(cart_id:, product_id:, quantity:)
      cart = Cart.find_by(id: cart_id)
      return { success: false, message: "Cart not found", cart: nil } unless cart

      cart_item = cart.cart_items.find_by(product_id: product_id)
      return { success: false, message: "Item not found in cart.", cart: cart } unless cart_item

      if quantity <= 0
        cart_item.destroy
        return { success: true, message: "Item removed from cart.", cart: cart }
      end

      cart_item.update!(quantity: quantity)
      { success: true, message: "Quantity updated successfully!", cart: cart }
    rescue => e
      { success: false, message: "Unexpected error: #{e.message}", cart: nil }
    end
  end
end
