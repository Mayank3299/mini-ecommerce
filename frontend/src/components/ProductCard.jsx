import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      shadow="sm"
      _hover={{ shadow: "md", transform: "scale(1.02)"}}
      transition="0.2s ease"
    >
      <VStack spacing={3}>
        <Heading size="md">{product.name}</Heading>
        <Text color="gray.600">₹{product.price}</Text>
        {product.stock ? (
            <Text fontSize="sm" color="green.500">IN STOCK</Text>
            ) : (
            <Text fontSize="sm" color="red.500">OUT OF STOCK</Text>
        )}
        <Button 
          colorScheme="teal" 
          size="sm" 
          onClick={() => onAddToCart(product)} 
          disabled={!product.stock || product.stock <= 0}
        >
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
