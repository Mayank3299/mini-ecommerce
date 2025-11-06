class Product < ApplicationRecord
  has_many :cart_items, dependent: :destroy
  validates_presence_of :name, :price
  validates_presence_of :stock, numericality: { greater_than: 0 }
end
