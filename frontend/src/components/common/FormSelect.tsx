import { FormControl, Select } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";
import Msg from "./Msg";

interface Props {
  id: string;
  placeholder: string;
  conf: UseFormRegisterReturn;
  children: ReactNode;
  errMsg: string | undefined;
  resErrMsg: string;
}

const FormSelect = ({
  id,
  placeholder,
  conf,
  children,
  errMsg,
  resErrMsg,
}: Props) => {
  return (
    <FormControl>
      <Select placeholder={placeholder} id={id} {...conf}>
        {children}
      </Select>
      <Msg level="error">{errMsg}</Msg>
      <Msg level="error">{resErrMsg}</Msg>
    </FormControl>
  );
};

export default FormSelect;
