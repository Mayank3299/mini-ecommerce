class AddDefaultStockToProducts < ActiveRecord::Migration[8.1]
  def change
    change_column_default :products, :stock, 0
  end
end
