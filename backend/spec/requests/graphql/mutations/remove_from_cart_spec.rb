require 'rails_helper'

RSpec.describe 'RemoveFromCart Mutation', type: :request do
  let!(:product) { Product.create!(name: 'T-shirt', price: 499, stock: 5) }
  let!(:cart) { Cart.create! }
  let!(:cart_item) { cart.cart_items.create!(product: product, quantity: 2) }

  it 'removes an item successfully' do
    query = <<~GQL
      mutation {
        removeFromCart(input: {
          cartId: #{cart.id},
          productId: #{product.id}
        }) {
          success
          message
          cart {
            id
            cartItems {
              product { name }
            }
          }
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['removeFromCart']

    expect(data['success']).to eq(true)
    expect(data['message']).to eq('Item removed successfully!')
    expect(data['cart']['cartItems']).to be_empty
  end

  it 'returns an error if item not in cart' do
    another_product = Product.create!(name: 'Shoes', price: 1299, stock: 5)

    query = <<~GQL
      mutation {
        removeFromCart(input: {
          cartId: #{cart.id},
          productId: #{another_product.id}
        }) {
          success
          message
          cart { id }
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['removeFromCart']

    expect(data['success']).to eq(false)
    expect(data['message']).to eq('Item not found in cart.')
  end
end
