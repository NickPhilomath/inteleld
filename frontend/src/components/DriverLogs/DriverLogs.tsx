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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import useEntities from "../../hooks/useEntities";
import Spinner from "../common/Spinner";
import Msg from "../common/Msg";
import LogStatus from "../common/LogStatus";

const CFaTruck = chakra(FaTruck);

interface DriverLogs {
  id: number;
  user: {
    first_name: string;
    last_name: string;
  };
  truck: number;
  status: string;
  last_location: string;
  wars_n_vios: string;
  time: {
    break: number;
    drive: number;
    shift: number;
    cycle: number;
    recap: number;
  };
}

const DriverLogs = () => {
  const navigate = useNavigate();
  const {
    data: driver_logs,
    error,
    isLoading,
  } = useEntities<DriverLogs>({
    keys: ["driver_logs"],
    url: "/drivers/logs",
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

  return (
    <>
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
              <Th>driver</Th>
              <Th>truck</Th>
              <Th>status</Th>
              <Th>last location</Th>
              <Th>warning & violations</Th>
              <Th>break</Th>
              <Th>drive</Th>
              <Th>shift</Th>
              <Th>cycle</Th>
              <Th>recap</Th>
            </Tr>
          </Thead>
          <Tbody>
            {driver_logs?.map((driver, index) => {
              return (
                <Tr
                  key={driver.id}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/logs/driver/" + driver.id);
                  }}
                >
                  <Td isNumeric>{index + 1}</Td>
                  <Td>
                    {driver.user.first_name} {driver.user.last_name}
                  </Td>
                  <Td>
                    <HStack>
                      <CFaTruck fontSize={22} color="blue.300" />
                      <Text>{driver.truck || "null"}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <LogStatus status={driver.status} />
                  </Td>
                  <Td>
                    {driver.last_location || (
                      <Msg level="warn" bold>
                        no data found
                      </Msg>
                    )}
                  </Td>
                  <Td>{driver.wars_n_vios}</Td>
                  <Td>{driver.time?.break}</Td>
                  <Td>{driver.time?.drive}</Td>
                  <Td>{driver.time?.shift}</Td>
                  <Td>{driver.time?.cycle}</Td>
                  <Td>{driver.time?.recap}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DriverLogs;
