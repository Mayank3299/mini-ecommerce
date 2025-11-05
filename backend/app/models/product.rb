class Product < ApplicationRecord
  has_many :cart_items, dependent: :destroy
  validates_presence_of :name, :price
end
