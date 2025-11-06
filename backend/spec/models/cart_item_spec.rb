require 'rails_helper'

RSpec.describe CartItem, type: :model do
  let(:cart) { Cart.create! }
  let(:product) { Product.create!(name: 'T-shirt', price: 499, stock: 5) }

  it 'is valid with valid attributes' do
    cart_item = CartItem.new(cart: cart, product: product, quantity: 2)
    expect(cart_item).to be_valid
  end

  it 'is invalid without quantity' do
    cart_item = CartItem.new(cart: cart, product: product)
    expect(cart_item).not_to be_valid
    expect(cart_item.errors[:quantity]).to include("can't be blank")
  end

  it 'is invalid without cart' do
    cart_item = CartItem.new(product: product, quantity: 2)
    expect(cart_item).not_to be_valid
    expect(cart_item.errors[:cart]).to include("must exist")
  end

  it 'is invalid without product' do
    cart_item = CartItem.new(cart: cart, quantity: 2)
    expect(cart_item).not_to be_valid
    expect(cart_item.errors[:product]).to include("must exist")
  end

  it 'is invalid with zero or negative quantity' do
    [ 0, -1 ].each do |invalid_qty|
      cart_item = CartItem.new(cart: cart, product: product, quantity: invalid_qty)
      expect(cart_item).not_to be_valid
      expect(cart_item.errors[:quantity]).to include("must be greater than 0")
    end
  end
end
