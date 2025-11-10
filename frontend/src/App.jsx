import React, { useState } from "react";
import { Box, SimpleGrid, Center, Spinner, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "./graphql/queries";

const App = () => {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading)
    return (
      <Center h="100vh" flexDirection="column">
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Center>
    );

  if (error)
    return (
      <Center h="100vh">
        <Text color="red.500">Error: {error.message}</Text>
      </Center>
    );

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar
        cartCount={totalItems}
        onCartClick={() => setIsDrawerOpen(true)}
      />

      <Box p={8}>
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {data.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </SimpleGrid>
      </Box>

      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cartItems={cartItems}
      />
    </Box>
  );
};

export default App;
