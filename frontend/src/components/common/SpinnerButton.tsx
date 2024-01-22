import { Button, Spinner } from "@chakra-ui/react";

const SpinnerButton = () => {
  return (
    <Button variant="solid" colorScheme="blue">
      <Spinner />
    </Button>
  );
};

export default SpinnerButton;
