require 'rails_helper'

RSpec.describe 'Products Query', type: :request do
  it 'returns a list of products' do
    Product.create!(name: 'T-shirt', price: 499, stock: 10)
    Product.create!(name: 'Jeans', price: 999, stock: 5)

    query = <<~GQL
      query {
        products {
          id
          name
          price
          stock
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['products']

    expect(data.length).to eq(2)
    expect(data[0]['name']).to eq('T-shirt')
    expect(data[1]['price']).to eq(999)
    expect(data[1]['stock']).to eq(5)
  end
end
