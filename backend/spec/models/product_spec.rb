require 'rails_helper'

RSpec.describe Product, type: :model do
    it 'is valid with valid attributes' do
        product = Product.new(name: 'T-shirt', price: 499, stock: 5)
        expect(product).to be_valid
    end

    it 'is invalid without a name' do
        product = Product.new(price: 499, stock: 5)
        expect(product).not_to be_valid
    end

    it 'is invalid without a price' do
        product = Product.new(name: 'T-shirt', stock: 5)
        expect(product).not_to be_valid
    end

    it 'is valid without a stock' do
        product = Product.new(name: 'T-shirt', price: 499)
        expect(product).to be_valid
    end
end
