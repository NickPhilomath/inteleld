import { Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="90vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={200} fontWeight={600}>
          404
        </Text>
        <Text fontSize={30}>page not found</Text>
        <Text color="green.300">
          <Link to="/">get back to main</Link>
        </Text>
      </Stack>
    </Flex>
  );
};

export default PageNotFound;
