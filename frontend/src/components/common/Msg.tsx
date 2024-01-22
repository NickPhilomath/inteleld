import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

const Msg = ({
  children,
  level = "info",
  bold = false,
}: {
  children: ReactNode;
  level: "success" | "info" | "warn" | "error";
  bold?: boolean;
}) => {
  return (
    <Text
      fontSize={15}
      color={
        level === "success"
          ? "green"
          : level === "info"
          ? "blue"
          : level === "warn"
          ? "yellow.400"
          : level === "error"
          ? "tomato"
          : undefined
      }
      fontWeight={bold ? "bold" : undefined}
    >
      {children}
    </Text>
  );
};

export default Msg;
