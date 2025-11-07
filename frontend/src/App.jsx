import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "./graphql/queries";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Center,
} from "@chakra-ui/react";

function App() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

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
    <Box p={8}>
      <Heading textAlign="center" mb={8}>
        🛒 ChatPat Store
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {data.products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            shadow="md"
          >
            <Heading size="md">{product.name}</Heading>
            <Text color="gray.600" mt={2}>
              ₹{product.price}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Stock: {product.stock}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default App;
