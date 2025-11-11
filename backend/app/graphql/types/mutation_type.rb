# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_cart, mutation: Mutations::CreateCart
    field :remove_from_cart, mutation: Mutations::RemoveFromCart
    field :update_cart_item_quantity, mutation: Mutations::UpdateCartItemQuantity
    field :add_to_cart, mutation: Mutations::AddToCart
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
