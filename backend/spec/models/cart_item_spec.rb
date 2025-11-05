require 'rails_helper'

RSpec.describe CartItem, type: :model do
  it 'is valid with cart, product, and quantity' do
    cart = Cart.create!
    product = Product.create!(name: 'T-shirt', price: 499)
    cart_item = CartItem.new(cart: cart, product: product, quantity: 2)

    expect(cart_item).to be_valid
  end

  it 'is invalid without quantity' do
    cart = Cart.create!
    product = Product.create!(name: 'T-shirt', price: 499)
    cart_item = CartItem.new(cart: cart, product: product)

    expect(cart_item).not_to be_valid
  end
end
