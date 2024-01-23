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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { getDateString } from "../../util";
import useEntities from "../../hooks/useEntities";
import Spinner from "../common/Spinner";
import Msg from "../common/Msg";
//import DriverForm from "./DriverForm";
//import DriverFromUpdate from "./DriverFormUpdate";
//import DriverDeactivate from "./DriverDeactivate";
import { Truck } from "../..";

const CFaPen = chakra(FaPen);
const CFaTrash = chakra(FaTrash);

const Trucks = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initDriverId, setInitDriverId] = useState<number | undefined>();
  const [formState, setFormState] = useState<
    "create" | "update" | "deactivate"
  >("create");
  const {
    data: trucks,
    error,
    isLoading,
    refetch,
  } = useEntities<Truck>({
    keys: ["trucks"],
    url: "/trucks",
    staleTime: 3 * 60 * 1000,
  });

  useEffect(() => {
    // this shit it causing to force user to login twice
    if (error?.response?.status === 401) {
      navigate("/login");
      // so i fixed it by changing status code, it doesnt execute here again
      error.response.status = 0;
    }
  }, [error]);

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
        <Heading size="lg">Trucks</Heading>
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

      {/* {formState === "create" && (
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
      )} */}

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
              <Th>unit number</Th>
              <Th>driver name</Th>
              <Th>make / model</Th>
              <Th>ELD</Th>
              <Th>notes</Th>
              <Th>vin number</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trucks?.map((truck, index) => {
              return (
                <Tr key={truck.id}>
                  <Td isNumeric>{index + 1}</Td>
                  <Td>{truck.unit_number}</Td>
                  <Td>****</Td>
                  <Td>
                    {truck.make} / {truck.model}
                  </Td>
                  <Td>{truck.eld_device}</Td>
                  <Td>{truck.notes}</Td>
                  <Td>{truck.vin_number}</Td>
                  <Td>
                    <HStack fontSize={20}>
                      <CFaPen
                        color="orange.400"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          handleEditDriver(truck.id);
                        }}
                      />
                      <CFaTrash
                        ml={3}
                        color="tomato"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDeactivateDriver(truck.id);
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

export default Trucks;
