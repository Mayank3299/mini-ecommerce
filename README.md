# 🛒 Mini E-commerce

A full-stack e-commerce application built with React and Ruby on Rails, featuring GraphQL API, shopping cart functionality, and Docker support.

![CI/CD](https://github.com/yourusername/mini_ecommerce/workflows/CI%2FCD%20Pipeline/badge.svg)
[![codecov](https://codecov.io/gh/yourusername/mini_ecommerce/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/mini_ecommerce)

## ✨ Features

- 🛍️ **Product Catalog** - Browse products with stock status
- 🛒 **Shopping Cart** - Add, update, and remove items
- 📊 **GraphQL API** - Modern, flexible API
- 🐳 **Docker Ready** - One command to run everything
- ✅ **Fully Tested** - Frontend & backend test coverage
- 🚀 **CI/CD Pipeline** - Automated testing and deployment

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Chakra UI** - Component library
- **Apollo Client** - GraphQL client
- **Vitest** - Testing framework

### Backend
- **Ruby on Rails 8** - API framework
- **GraphQL Ruby** - GraphQL implementation
- **PostgreSQL** - Database
- **RSpec** - Testing framework

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- Ruby 3.2+ (for local development)

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/mini_ecommerce.git
cd mini_ecommerce

# Start all services
docker-compose up --build

# In another terminal, seed the database
docker-compose exec backend rails db:seed
```

Open your browser:
- **Frontend**: http://localhost:5173
- **GraphQL API**: http://localhost:3000/graphql
- **GraphiQL**: http://localhost:3000/graphiql

### Local Development

#### Backend

```bash
cd backend

# Install dependencies
bundle install

# Setup database
rails db:create db:migrate db:seed

# Start server
rails server
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 🧪 Testing

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Backend Tests

```bash
cd backend

# Run tests
bundle exec rspec

# Run with coverage (generates coverage/ folder)
COVERAGE=true bundle exec rspec
```

## 📁 Project Structure

```
mini_ecommerce/
├── backend/                 # Rails API
│   ├── app/
│   │   ├── controllers/     # API controllers
│   │   ├── graphql/         # GraphQL schema, types, mutations
│   │   └── models/          # ActiveRecord models
│   ├── spec/                # RSpec tests
│   └── Dockerfile
├── frontend/                # React app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── graphql/         # GraphQL queries & mutations
│   │   └── App.jsx          # Main app component
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI/CD
├── docker-compose.yml       # Development setup
├── docker-compose.prod.yml  # Production setup
└── README.md
```

## 🔌 API Reference

### GraphQL Queries

```graphql
# Get all products
query {
  products {
    id
    name
    price
    stock
  }
}

# Get cart by ID
query GetCart($id: ID!) {
  cart(id: $id) {
    id
    cartItems {
      id
      quantity
      product {
        id
        name
        price
      }
    }
  }
}
```

### GraphQL Mutations

```graphql
# Create a new cart
mutation {
  createCart(input: {}) {
    cart {
      id
    }
  }
}

# Add item to cart
mutation AddToCart($cartId: ID!, $productId: ID!, $quantity: Int!) {
  addToCart(input: { 
    cartId: $cartId, 
    productId: $productId, 
    quantity: $quantity 
  }) {
    success
    message
    cart {
      id
      cartItems {
        id
        quantity
      }
    }
  }
}

# Update cart item quantity
mutation UpdateCartItem($cartId: ID!, $productId: ID!, $quantity: Int!) {
  updateCartItemQuantity(input: { 
    cartId: $cartId, 
    productId: $productId, 
    quantity: $quantity 
  }) {
    success
    cart {
      id
    }
  }
}

# Remove item from cart
mutation RemoveFromCart($cartId: ID!, $productId: ID!) {
  removeFromCart(input: { 
    cartId: $cartId, 
    productId: $productId 
  }) {
    success
  }
}
```

## 🐳 Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Rebuild containers
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Run Rails console
docker-compose exec backend rails console

# Run migrations
docker-compose exec backend rails db:migrate

# Run backend tests
docker-compose exec backend rspec

# Run frontend tests
docker-compose exec frontend npm test
```

## 🔧 Environment Variables

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `RAILS_ENV` | Environment | `development` |
| `DATABASE_URL` | PostgreSQL URL | - |
| `RAILS_MASTER_KEY` | Credentials key | - |

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend GraphQL URL | `http://localhost:3000/graphql` |

## 📊 Test Coverage

Coverage reports are generated automatically:

- **Frontend**: `frontend/coverage/` (HTML report)
- **Backend**: `backend/coverage/` (HTML report)

View coverage locally:
```bash
# Frontend
open frontend/coverage/index.html

# Backend
open backend/coverage/index.html
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [Chakra UI](https://chakra-ui.com/) - Beautiful React components
- [Apollo GraphQL](https://www.apollographql.com/) - GraphQL client
- [GraphQL Ruby](https://graphql-ruby.org/) - Ruby GraphQL implementation

