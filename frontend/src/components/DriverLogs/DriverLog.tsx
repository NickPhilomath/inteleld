import {
  chakra,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import useEntities from "../../hooks/useEntities";
import LogChart from "./LogChart";
import { Log } from "../..";
import Msg from "../common/Msg";
import LogStatus from "../common/LogStatus";

const CFaPen = chakra(FaPen);

const DriverLog = () => {
  const {
    data: logs,
    error,
    isLoading,
    refetch,
  } = useEntities<Log>({
    keys: ["logs"],
    url: "/drivers/1/logs/01-24-2024",
    staleTime: 3 * 60 * 1000,
    logoutOn404: true,
  });

  return (
    <>
      <LogChart logs={logs || []} />

      <TableContainer mt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>No</Th>
              <Th>status</Th>
              <Th>start (EST)</Th>
              <Th>duration</Th>
              <Th>location</Th>
              <Th>vehicle</Th>
              <Th>odometer</Th>
              <Th>eng. hours</Th>
              <Th>notes</Th>
              <Th>document</Th>
              <Th>trailer</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs?.map((log, index) => {
              return (
                <Tr key={log.id}>
                  <Td isNumeric>{index + 1}</Td>
                  <Td>
                    <LogStatus status={log.status} />
                  </Td>
                  <Td>{log.time}</Td>
                  <Td>*</Td>
                  <Td>{log.location.address}</Td>
                  <Td>
                    {log.truck || (
                      <Msg level="error" bold>
                        not assigned
                      </Msg>
                    )}
                  </Td>
                  <Td>{log.odometer}</Td>
                  <Td>{log.eng_hours}</Td>
                  <Td>{log.notes}</Td>
                  <Td>{log.document}</Td>
                  <Td>{log.trailer}</Td>

                  <Td>
                    <HStack fontSize={20}>
                      <CFaPen
                        color="orange.400"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          // handleEditlog(log.id);
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

export default DriverLog;
