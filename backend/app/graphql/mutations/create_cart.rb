# frozen_string_literal: true

module Mutations
  class CreateCart < BaseMutation
    field :cart, Types::CartType, null: false
    field :message, String, null: false

    def resolve
      cart = Cart.create!
      {
        cart: cart,
        message: "Cart created successfully"
      }
    rescue => e
      GraphQL::ExecutionError.new("Failed to create cart: #{e.message}")
    end
  end
end
