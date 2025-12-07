puts "Seeding products..."

products = [
  { name: "Classic T-Shirt", price: 499, stock: 50 },
  { name: "Denim Jeans", price: 1299, stock: 30 },
  { name: "Running Sneakers", price: 2499, stock: 25 },
  { name: "Leather Wallet", price: 799, stock: 40 },
  { name: "Cotton Hoodie", price: 1499, stock: 20 },
  { name: "Sports Watch", price: 3999, stock: 15 },
  { name: "Sunglasses", price: 999, stock: 35 },
  { name: "Backpack", price: 1799, stock: 18 },
  { name: "Wireless Earbuds", price: 2999, stock: 22 },
  { name: "Phone Case", price: 299, stock: 100 }
]

products.each do |product_attrs|
  Product.find_or_create_by!(name: product_attrs[:name]) do |product|
    product.price = product_attrs[:price]
    product.stock = product_attrs[:stock]
  end
end

# Set 2 random products to out of stock
out_of_stock_products = Product.order("RANDOM()").limit(2)
out_of_stock_products.update_all(stock: 0)
puts "Set #{out_of_stock_products.pluck(:name).join(', ')} to out of stock"

puts "Seeded #{Product.count} products!"
