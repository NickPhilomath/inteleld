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
import useEntities from "../../hooks/useEntities";
import Spinner from "../common/Spinner";
import TruckForm from "./TruckForm";
//import DriverFromUpdate from "./DriverFormUpdate";
//import DriverDeactivate from "./DriverDeactivate";
import { Truck } from "../..";

const CFaPen = chakra(FaPen);
const CFaTrash = chakra(FaTrash);

const Trucks = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initTruckId, setInitTruckId] = useState<number | undefined>();
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

  const handleEditTruck = (id: number) => {
    setInitTruckId(id);
    setFormState("update");
    onOpen();
  };

  const handleDeactivateTruck = (id: number) => {
    setInitTruckId(id);
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
            setInitTruckId(undefined);
            setFormState("create");
            onOpen();
          }}
        >
          Add truck
        </Button>
      </HStack>

      {formState === "create" && (
        <TruckForm
          isOpen={isOpen}
          onClose={onClose}
          handleRefetch={handleRefetch}
        />
      )}

      {/* {formState === "update" && (
        <DriverFromUpdate
          isOpen={isOpen}
          onClose={onClose}
          handleRefetch={handleRefetch}
          driverID={initTruckId}
        />
      )}

      {formState === "deactivate" && (
        <DriverDeactivate
          isOpen={isOpen}
          onClose={onClose}
          handleRefetch={handleRefetch}
          driverID={initTruckId}
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
              <Th>Unit Number</Th>
              <Th>Driver Name</Th>
              <Th>Make / Model</Th>
              <Th>ELD</Th>
              <Th>Notes</Th>
              <Th>Vin Number</Th>
              <Th>Actions</Th>
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
                          handleEditTruck(truck.id);
                        }}
                      />
                      <CFaTrash
                        ml={3}
                        color="tomato"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDeactivateTruck(truck.id);
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
