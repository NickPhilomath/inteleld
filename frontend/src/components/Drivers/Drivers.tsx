import {
  chakra,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { getDateString } from "../../util";
import useEntities from "../../hooks/useEntities";
import Spinner from "../common/Spinner";
import Msg from "../common/Msg";
import DriverForm from "./DriverForm";
import DriverFromUpdate from "./DriverFormUpdate";
import DriverDeactivate from "./DriverDeactivate";
import { Driver } from "../..";

const CFaPen = chakra(FaPen);
const CFaTrash = chakra(FaTrash);

const Drivers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initDriverId, setInitDriverId] = useState<number | undefined>();
  const [formState, setFormState] = useState<
    "create" | "update" | "deactivate"
  >("create");

  const {
    data: drivers,
    error,
    isLoading,
    refetch,
  } = useEntities<Driver>({
    keys: ["drivers"],
    url: "/drivers",
    staleTime: 3 * 60 * 1000,
    logoutOn404: true,
  });

  const handleRefetch = () => {
    setFormState("create");
    onClose();
    refetch();
  };

  const handleEditDriver = (id: number) => {
    setInitDriverId(id);
    setFormState("update");
    onOpen();
  };

  const handleDeactivateDriver = (id: number) => {
    setInitDriverId(id);
    setFormState("deactivate");
    onOpen();
  };

  return (
    <>
      <HStack justifyContent="space-between" padding={5} marginBottom={6}>
        <Heading size="lg">Drivers</Heading>
        <Button
          size="md"
          colorScheme="blue"
          onClick={() => {
            setInitDriverId(undefined);
            setFormState("create");
            onOpen();
          }}
        >
          Add driver
        </Button>
      </HStack>

      {formState === "create" && (
        <DriverForm
          isOpen={isOpen}
          onClose={onClose}
          handleRefetch={handleRefetch}
        />
      )}

      {formState === "update" && (
        <DriverFromUpdate
          isOpen={isOpen}
          onClose={onClose}
          handleRefetch={handleRefetch}
          driverID={initDriverId}
        />
      )}

      {formState === "deactivate" && (
        <DriverDeactivate
          isOpen={isOpen}
          onClose={onClose}
          handleRefetch={handleRefetch}
          driverID={initDriverId}
        />
      )}

      {isLoading && <Spinner />}

      {error && (
        <Text fontSize={30} color="tomato">
          {error.message}
        </Text>
      )}

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>#</Th>
              <Th>first Name</Th>
              <Th>last Name</Th>
              <Th>username</Th>
              <Th>co-driver</Th>
              <Th>vehicle</Th>
              <Th>app version</Th>
              <Th>date joined</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {drivers?.map((driver, index) => {
              return (
                <Tr key={driver.id}>
                  <Td isNumeric>{index + 1}</Td>
                  <Td>{driver.user.first_name}</Td>
                  <Td>{driver.user.last_name}</Td>
                  <Td>{driver.user.username}</Td>
                  <Td>{driver.co_driver}</Td>
                  <Td>
                    {driver.truck || (
                      <Msg level="error" bold>
                        not assigned
                      </Msg>
                    )}
                  </Td>
                  <Td>
                    {driver.app_version || (
                      <Msg level="warn" bold>
                        no data
                      </Msg>
                    )}
                  </Td>
                  <Td>{getDateString(driver.user.date_joined)}</Td>
                  <Td>
                    <HStack fontSize={20}>
                      <CFaPen
                        color="orange.400"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          handleEditDriver(driver.id);
                        }}
                      />
                      <CFaTrash
                        ml={3}
                        color="tomato"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDeactivateDriver(driver.id);
                        }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Drivers;
