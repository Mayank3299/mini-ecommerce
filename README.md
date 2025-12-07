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

- Docker & Docker Compose installed ([Get Docker](https://docs.docker.com/get-docker/))

That's it! No need to install Ruby, Rails, Node.js, or PostgreSQL locally.

### Using Docker (Recommended)

```bash
# 1. Clone/Fork the repository
git clone https://github.com/yourusername/mini_ecommerce.git
cd mini_ecommerce

# 2. Start all services (PostgreSQL + Rails + React)
docker-compose up --build

# 3. Wait for services to start (first time takes 2-5 minutes)
#    You'll see: "Listening on http://0.0.0.0:3000" from backend
#    And: "VITE ready" from frontend

# 4. In a NEW terminal, seed the database with products
docker-compose exec backend rails db:seed
```

### 🎉 Open your browser:

| Service | URL |
|---------|-----|
| **Frontend (Store)** | http://localhost:5173 |
| **Backend API** | http://localhost:3000/graphql |
| **GraphQL Playground** | http://localhost:3000/graphiql |

### Common Docker Commands

```bash
# Start services (in background)
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart a specific service
docker-compose restart backend

# Rebuild after code changes
docker-compose up --build

# Reset everything (including database)
docker-compose down -v
docker-compose up --build
```

### Troubleshooting

**Port already in use?**
```bash
# If port 5432 is in use (local PostgreSQL running)
# The docker-compose.yml already uses port 5433 externally

# If port 3000 is in use
docker-compose down
# Edit docker-compose.yml, change "3000:3000" to "3001:3000"
docker-compose up
```

**Database not seeded / Empty products?**
```bash
docker-compose exec backend rails db:seed
```

**Cart not working?**
```
Open browser DevTools → Application → Local Storage → Clear
Then refresh the page
```

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

## 🤝 Contributing / Forking

### Quick Start for Forkers

```bash
# 1. Fork this repo on GitHub (click Fork button)

# 2. Clone YOUR fork
git clone https://github.com/YOUR_USERNAME/mini_ecommerce.git
cd mini_ecommerce

# 3. Run with Docker (no other setup needed!)
docker-compose up --build

# 4. Seed the database
docker-compose exec backend rails db:seed

# 5. Open http://localhost:5173 - you're done!
```

### Making Changes

```bash
# Frontend changes (React)
# - Edit files in frontend/src/
# - Changes hot-reload automatically

# Backend changes (Rails)
# - Edit files in backend/app/
# - Most changes hot-reload, restart if needed:
docker-compose restart backend

# Run frontend tests
docker-compose exec frontend npm test

# Run backend tests
docker-compose exec backend rspec
```

## 🙏 Acknowledgments

- [Chakra UI](https://chakra-ui.com/) - Beautiful React components
- [Apollo GraphQL](https://www.apollographql.com/) - GraphQL client
- [GraphQL Ruby](https://graphql-ruby.org/) - Ruby GraphQL implementation

