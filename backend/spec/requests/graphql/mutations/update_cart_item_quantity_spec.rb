require 'rails_helper'

RSpec.describe 'UpdateCartItemQuantity Mutation', type: :request do
  let!(:product) { Product.create!(name: 'T-shirt', price: 499, stock: 5) }
  let!(:cart) { Cart.create! }
  let!(:cart_item) { cart.cart_items.create!(product: product, quantity: 2) }

  it 'updates the quantity of an existing cart item' do
    query = <<~GQL
      mutation {
        updateCartItemQuantity(input: {
          cartId: #{cart.id},
          productId: #{product.id},
          quantity: 5
        }) {
          success
          message
          cart {
            id
            cartItems {
              quantity
              product { name }
            }
          }
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['updateCartItemQuantity']

    expect(data['success']).to eq(true)
    expect(data['message']).to eq('Quantity updated successfully!')
    expect(data['cart']['cartItems'].first['quantity']).to eq(5)
  end

  it 'removes the item if quantity is zero' do
    query = <<~GQL
      mutation {
        updateCartItemQuantity(input: {
          cartId: #{cart.id},
          productId: #{product.id},
          quantity: 0
        }) {
          success
          message
          cart {
            id
            cartItems { quantity }
          }
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['updateCartItemQuantity']

    expect(data['success']).to eq(true)
    expect(data['message']).to eq('Item removed from cart.')
    expect(data['cart']['cartItems']).to be_empty
  end

  it 'returns error if product not in cart' do
    another_product = Product.create!(name: 'Jeans', price: 999, stock: 5)

    query = <<~GQL
      mutation {
        updateCartItemQuantity(input: {
          cartId: #{cart.id},
          productId: #{another_product.id},
          quantity: 3
        }) {
          success
          message
          cart { id }
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['updateCartItemQuantity']

    expect(data['success']).to eq(false)
    expect(data['message']).to eq('Item not found in cart.')
  end
end
