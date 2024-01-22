import { Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import SpinnerButton from "../common/SpinnerButton"
import useRequest from "../../hooks/useRequest";
import { getHeaders } from "../../hooks/useData";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    handleRefetch: () => void;
    driverID?: number;
  }


const DriverDeactivate = ({isOpen, onClose, handleRefetch, driverID} : Props) => {
    const { post, isLoading, errorMsg } = useRequest(
        "/drivers/deactivate/" + driverID,
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
            <ModalHeader>Deactiavte Driver</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form id="driver-form" onSubmit={onSubmit}>
                <Text color='red.300'>
                    Are you sure to deactivate this driver?
                    <br />
                    The driver will no longer be able to get access to his account
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
            <Button
              type="submit"
              form="driver-form"
              colorScheme="red"
            >
              Deactivate
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DriverDeactivate