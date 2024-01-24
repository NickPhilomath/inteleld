import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import SpinnerButton from "../common/SpinnerButton";
import useRequest from "../../hooks/useRequest";
import { getHeaders } from "../../hooks/useData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleRefetch: () => void;
  truckID?: number;
}

const TruckDeactivate = ({
  isOpen,
  onClose,
  handleRefetch,
  truckID,
}: Props) => {
  const { post, isLoading, errorMsg } = useRequest(
    "/trucks/deactivate/" + truckID,
    true,
    {
      headers: getHeaders(),
    }
  );

  const onSubmit = async () => {
    post({}, () => {
      handleRefetch();
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="40rem">
        <ModalHeader>Deactivate Truck</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="truck-form" onSubmit={onSubmit}>
            <Text color="red.300">
              Are you sure to deactivate this truck?
              <br />
              The truck will no longer be available
            </Text>
          </form>
          {errorMsg && (
            <Text fontSize={15} color="tomato">
              {errorMsg}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          {isLoading ? (
            <SpinnerButton />
          ) : (
            <Button type="submit" form="truck-form" colorScheme="red">
              Deactivate
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TruckDeactivate;
