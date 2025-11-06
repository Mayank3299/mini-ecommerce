require 'rails_helper'

RSpec.describe 'Cart Query', type: :request do
  let!(:product1) { Product.create!(name: 'T-shirt', price: 499) }
  let!(:product2) { Product.create!(name: 'Shoes', price: 1299) }
  let!(:cart) { Cart.create! }
  let!(:item1) { cart.cart_items.create!(product: product1, quantity: 2) }
  let!(:item2) { cart.cart_items.create!(product: product2, quantity: 1) }

  it 'fetches a cart with its items and products' do
    query = <<~GQL
      query {
        cart(id: #{cart.id}) {
          id
          cartItems {
            quantity
            product {
              name
              price
            }
          }
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['cart']

    expect(data['id']).to eq(cart.id.to_s)

    product_names = data['cartItems'].map { |item| item['product']['name'] }
    expect(product_names).to match_array([ 'T-shirt', 'Shoes' ])

    quantities = data['cartItems'].map { |item| item['quantity'] }
    expect(quantities).to match_array([ 2, 1 ])
  end

  it 'returns an error when cart does not exist' do
    query = <<~GQL
      query {
        cart(id: 9999) {
          id
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)

    expect(json['errors']).not_to be_nil
    expect(json['errors'].first['message']).to match(/Cart not found/)
  end
end
