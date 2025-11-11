import { useEffect, useState } from "react";
import { Box, SimpleGrid, Spinner, Center, Text } from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import { PRODUCTS_QUERY } from "./graphql/queries";
import { CREATE_CART, ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_FROM_CART, GET_CART } from "./graphql/cart";

const App = () => {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);

  const [createCart] = useMutation(CREATE_CART);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [updateCart] = useMutation(UPDATE_CART_ITEM);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);

  const { data: cartData, refetch } = useQuery(GET_CART, {
    variables: { id: cartId },
    skip: !cartId,
  });

  useEffect(() => {
    if (cartData?.cart) {
      const items = cartData.cart.cartItems.map((ci) => ({
        id: ci.product.id,
        name: ci.product.name,
        price: ci.product.price,
        quantity: ci.quantity,
      }));
      setCartItems(items);
    }
  }, [cartData]);

  const handleAddToCart = async (product) => {
    let id = cartId;
    if (!id) {
      const { data } = await createCart();
      id = data.createCart.cart.id;
      localStorage.setItem("cartId", id);
      setCartId(id);
    }
    await addToCart({ variables: { cartId: id, productId: product.id, quantity: 1 } });
    await refetch();
  };

  const handleUpdateCart = async (product, action) => {
    if (action === "increase")
      await updateCart({ variables: { cartId, productId: product.id, quantity: product.quantity + 1 } });
    else if (action === "decrease")
      product.quantity > 1
        ? await updateCart({ variables: { cartId, productId: product.id, quantity: product.quantity - 1 } })
        : await removeFromCart({ variables: { cartId, productId: product.id } });
    else if (action === "remove")
      await removeFromCart({ variables: { cartId, productId: product.id } });
    await refetch();
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

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
      <Navbar cartCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
      <Box p={8}>
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </SimpleGrid>
      </Box>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateCart={handleUpdateCart}
      />
    </Box>
  );
};

export default App;
