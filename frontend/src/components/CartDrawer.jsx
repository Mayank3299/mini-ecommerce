import {
  Drawer,
  Button,
  Text,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";

const CartDrawer = ({ isOpen, onClose, cartItems }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} side="left">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content
          maxW="30vw"
          minW="350px"
          bg="white"
          p={4}
          borderRightWidth="1px"
          shadow="2xl"
          transition="all 0.3s ease-in-out"
        >
          <Drawer.Header borderBottomWidth="1px" pb={3}>
            <HStack spacing={3}>
              <Drawer.Title fontSize="xl" fontWeight="bold">
                Your Cart
              </Drawer.Title>
            </HStack>
          </Drawer.Header>

          <Drawer.Body overflowY="auto" py={6}>
            {cartItems.length === 0 ? (
              <Text color="gray.500" textAlign="center">
                Your cart is empty.
              </Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {cartItems.map((item) => (
                  <Box
                    key={item.id}
                    borderWidth="1px"
                    borderRadius="md"
                    p={3}
                    shadow="xs"
                    _hover={{ shadow: "sm", transform: "scale(1.01)" }}
                    transition="0.2s ease"
                  >
                    <HStack justify="space-between">
                      <Text fontWeight="medium">{item.name}</Text>
                      <Text color="gray.600">x{item.quantity}</Text>
                    </HStack>
                    <Text color="gray.500" fontSize="sm">
                      ₹{item.price} each
                    </Text>
                  </Box>
                ))}
                <HStack justify="space-between" pt={3}>
                  <Text fontWeight="bold">Total:</Text>
                  <Text fontWeight="bold" fontSize="lg">
                    ₹{total}
                  </Text>
                </HStack>
              </VStack>
            )}
          </Drawer.Body>

          <Drawer.Footer borderTopWidth="1px" justifyContent="space-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {cartItems.length > 0 && (
              <Button colorScheme="teal" px={6}>
                Checkout
              </Button>
            )}
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default CartDrawer;
