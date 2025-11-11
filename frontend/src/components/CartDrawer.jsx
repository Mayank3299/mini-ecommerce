import {
  Drawer,
  Button,
  Text,
  VStack,
  HStack,
  Box,
  Icon,
  IconButton,
} from "@chakra-ui/react";
  import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateCart }) => {
  const handleIncrease = (item) => onUpdateCart(item, "increase");
  const handleDecrease = (item) => onUpdateCart(item, "decrease");
  const handleRemove = (item) => onUpdateCart(item, "remove");

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
                  >
                    <HStack justify="space-between">
                      <Text fontWeight="medium">{item.name}</Text>
                      <IconButton
                        size="xs"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleRemove(item)}
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </IconButton>
                    </HStack>

                    <Text color="gray.500" fontSize="sm">
                      ₹{item.price} each
                    </Text>

                    <HStack justify="space-between" mt={2}>
                      <HStack>
                        <IconButton
                          size="sm"
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => handleDecrease(item)}
                        >
                          <FaMinus />
                        </IconButton>  
                        <Text fontWeight="bold">{item.quantity}</Text>
                        <IconButton
                          icon={<FaPlus />}
                          size="sm"
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => handleIncrease(item)}
                        >
                          <FaPlus />
                        </IconButton>
                      </HStack>
                      <Text fontWeight="medium">
                        ₹{item.price * item.quantity}
                      </Text>
                    </HStack>
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
