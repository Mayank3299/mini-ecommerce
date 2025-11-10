import { Flex, Heading, Button, Badge, Box } from "@chakra-ui/react";

const Navbar = ({ cartCount, onCartClick }) => {
  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      px={8}
      py={4}
      bg="teal.500"
      color="white"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Heading size="lg">ChatPat Store</Heading>

      <Box position="relative">
        <Button
          variant="ghost"
          color="white"
          fontWeight="bold"
          _hover={{ bg: "teal.600" }}
          size="lg"
          onClick={onCartClick}
        >
          Cart
        </Button>

        {cartCount > 0 && (
          <Badge
            position="absolute"
            top="-1"
            right="-1"
            bg="red.500"
            color="white"
            borderRadius="full"
            px={2}
            fontSize="0.7rem"
            fontWeight="bold"
          >
            {cartCount}
          </Badge>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
