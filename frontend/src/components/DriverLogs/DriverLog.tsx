import { Image } from "@chakra-ui/react";
import chartday from "../../assets/chartday.svg";

const DriverLog = () => {
  console.log("chartday", chartday);
  return (
    <div>
      <Image src={chartday} alt="chartday" />
    </div>
  );
};

export default DriverLog;
