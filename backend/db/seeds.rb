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

# Reset all products to their default stock values
products.each do |product_attrs|
  product = Product.find_or_initialize_by(name: product_attrs[:name])
  product.price = product_attrs[:price]
  product.stock = product_attrs[:stock]
  product.save!
end

# Set exactly 2 random products to out of stock
out_of_stock_ids = Product.order("RANDOM()").limit(2).pluck(:id)
Product.where(id: out_of_stock_ids).update_all(stock: 0)
out_of_stock_names = Product.where(id: out_of_stock_ids).pluck(:name)
puts "Set #{out_of_stock_names.join(', ')} to out of stock"

puts "Seeded #{Product.count} products!"
