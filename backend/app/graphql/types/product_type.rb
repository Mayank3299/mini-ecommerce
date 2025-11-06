module Types
  class ProductType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String
    field :price, Integer, null: false
    field :stock, Integer, null: false
  end
end
