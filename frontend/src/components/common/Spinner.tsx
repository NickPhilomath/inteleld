import { Spinner as BaseSpinner } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <BaseSpinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
};

export default Spinner;
