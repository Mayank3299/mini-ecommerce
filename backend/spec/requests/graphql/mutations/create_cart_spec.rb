require 'rails_helper'

RSpec.describe 'CreateCart Mutation', type: :request do
  it 'creates a new cart successfully' do
    query = <<~GQL
      mutation {
        createCart(input: {}) {
          cart {
            id
          }
          message
        }
      }
    GQL

    post '/graphql', params: { query: query }
    json = JSON.parse(response.body)
    data = json['data']['createCart']

    expect(data['cart']['id']).to be_present
    expect(data['message']).to eq('Cart created successfully')
    expect(Cart.count).to eq(1)
  end
end
