require 'rails_helper'

RSpec.describe Cart, type: :model do
  it 'is valid with default attributes' do
    cart = Cart.new
    expect(cart).to be_valid
  end

  it 'can have many items' do
    cart = Cart.create!
    product1 = Product.create!(name: 'T-shirt', price: 500)
    product2 = Product.create!(name: 'Jeans', price: 1000)

    cart_item1 = CartItem.create!(cart: cart, product: product1, quantity: 2)
    cart_item2 = CartItem.create!(cart: cart, product: product2, quantity: 1)

    expect(cart.cart_items.count).to eq(2)
    expect(cart.cart_items.first.product.name).to eq('T-shirt')
  end
end
