import { Box } from "@chakra-ui/react";

const logStatusMap = [
  { status: "of", color: "grey", text: "OFF" },
  { status: "pc", color: "grey", text: "PC" },
  { status: "on", color: "blue.500", text: "ON" },
  { status: "ym", color: "blue.400", text: "YM" },
  { status: "sb", color: "yellow.500", text: "SB" },
  { status: "dr", color: "green.500", text: "DR" },
];

const LogStatus = ({ status }: { status: string }) => {
  const map = logStatusMap.find((m) => m.status === status);
  return (
    <Box
      bg={map?.color || "red.500"}
      color="white"
      fontWeight="bold"
      fontSize="12px"
      padding="3px 5px"
      borderRadius={3}
      width="45px"
      height="22px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {map?.text || "NONE"}
    </Box>
  );
};

export default LogStatus;
