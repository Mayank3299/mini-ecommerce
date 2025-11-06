require 'rails_helper'

RSpec.describe 'AddToCart Mutation', type: :request do
  let!(:product) { Product.create!(name: 'T-shirt', price: 499, stock: 5) }
  let!(:cart) { Cart.create! }

  it 'returns success and message when product is added' do
    query = <<~GQL
      mutation {
        addToCart(input: { cartId: #{cart.id}, productId: #{product.id}, quantity: 2 }) {
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
    data = json['data']['addToCart']

    expect(data['success']).to eq(true)
    expect(data['message']).to eq('Product added successfully!')
    expect(data['cart']['cartItems'].first['quantity']).to eq(2)
  end

  it 'returns error message when product does not exist' do
    query = <<~GQL
      mutation {
        addToCart(input: { cartId: #{cart.id}, productId: 9999, quantity: 1 }) {
          success
          message
          cart { id }
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['addToCart']

    expect(data['success']).to eq(false)
    expect(data['message']).to eq('Product not found')
    expect(data['cart']).to be_nil
  end
end
