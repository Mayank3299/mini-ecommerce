# frozen_string_literal: true

module Mutations
  class AddToCart < BaseMutation
    field :success, Boolean, null: false
    field :message, String, null: false
    field :cart, Types::CartType, null: false

    argument :cart_id, ID, required: true
    argument :product_id, ID, required: true
    argument :quantity, Integer, required: true

    def resolve(cart_id:, product_id:, quantity:)
      cart = Cart.find(cart_id)
      product = Product.find(product_id)

      return { success: false, message: "Product not found", cart: nil } unless product

      item = cart.cart_items.find_or_initialize_by(product: product)
      item.quantity = (item.quantity || 0) + quantity
      item.save!

      { success: true, message: "Product added successfully!", cart: cart }
    rescue ActiveRecord::RecordNotFound => e
      { success: false, message: e.message, cart: nil }
    rescue => e
      { success: false, message: "Unexpected error: #{e.message}", cart: nil }
    end
  end
end
