import {
  Text,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { STATES } from "../..";
import useRequest from "../../hooks/useRequest";
import { getHeaders } from "../../hooks/useData";
import useEntity from "../../hooks/useEntity";
import { getErrorMsg } from "../../util";
import SpinnerButton from "../common/SpinnerButton";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";

export const schema = z.object({
  // truck: z.number({ invalid_type_error: "Truck is required" }).positive(),
  cdl_number: z.string().min(5),
  cdl_state: z.string(),
  phone: z.string().min(3).max(13),
  allow_pc: z.boolean(),
  allow_ym: z.boolean(),
  notes: z.string().max(255),
  user: z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    username: z.string().readonly(),
    email: z.string().email(),
  }),
});

export type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleRefetch: () => void;
  driverID?: number | undefined;
}

const DriverFromUpdate = ({
  isOpen,
  onClose,
  handleRefetch,
  driverID,
}: Props) => {
  const {
    data: driver,
    error,
    isLoading: initLoading,
    refetch,
  } = useEntity<FormData>({
    id: driverID,
    keys: ["driver", driverID],
    url: "/drivers",
    staleTime: 3 * 60 * 1000,
  });

  const { put, isLoading, errorMsg, resErros } = useRequest<FormData>(
    "/drivers/" + driverID,
    true,
    {
      headers: getHeaders(),
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    console.log("data^^^^", data);
    put(data, () => {
      reset();
      refetch();
      handleRefetch();
    });
  };

  const handleClose = () => {
    reset();

    onClose();
  };

  useEffect(() => {
    if (driver) reset(driver);
  }, [driver]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="69rem">
        <ModalHeader>Update Driver</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {initLoading && <Spinner />}
          <Text color="tomato" fontSize={18} mb={5}>
            {error?.message}
          </Text>
          <form id="driver-update-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <FormInput
                  type="text"
                  placeholder="First name"
                  id="user.first_name"
                  conf={register("user.first_name")}
                  errMsg={errors.user?.first_name?.message}
                  resErrMsg={getErrorMsg(resErros, "user.first_name")}
                />
                <FormInput
                  type="text"
                  placeholder="Last name"
                  id="user.last_name"
                  conf={register("user.last_name")}
                  errMsg={errors.user?.last_name?.message}
                  resErrMsg={getErrorMsg(resErros, "user.last_name")}
                />
                <FormInput
                  type="text"
                  placeholder="Username"
                  id="user.username"
                  conf={register("user.username")}
                  errMsg={errors.user?.username?.message}
                  resErrMsg={getErrorMsg(resErros, "user.username")}
                />
                <FormInput
                  type="text"
                  placeholder="Email"
                  id="user.email"
                  conf={register("user.email")}
                  errMsg={errors.user?.email?.message}
                  resErrMsg={getErrorMsg(resErros, "user.email")}
                />
              </HStack>
              <HStack>
                <FormInput
                  type="text"
                  placeholder="Phone number"
                  id="phone"
                  conf={register("phone")}
                  errMsg={errors.phone?.message}
                  resErrMsg={getErrorMsg(resErros, "phone")}
                />
                <FormInput
                  type="text"
                  placeholder="CDL number"
                  id="cdl_number"
                  conf={register("cdl_number")}
                  errMsg={errors.cdl_number?.message}
                  resErrMsg={getErrorMsg(resErros, "cdl_number")}
                />
                <FormSelect
                  placeholder="CDL state"
                  id="cdl_state"
                  conf={register("cdl_state")}
                  errMsg={errors.cdl_state?.message}
                  resErrMsg={getErrorMsg(resErros, "cdl_state")}
                >
                  {STATES.map((state, index) => {
                    return (
                      <option key={index} value={state.value}>
                        {state.name}
                      </option>
                    );
                  })}
                </FormSelect>
              </HStack>
              <HStack>
                <FormInput
                  type="text"
                  placeholder="Notes"
                  id="notes"
                  conf={register("notes")}
                  errMsg={errors.notes?.message}
                  resErrMsg={getErrorMsg(resErros, "notes")}
                />
              </HStack>
              <HStack>
                <Checkbox id="allow_pc" {...register("allow_pc")}>
                  Allow Personal Conveyance
                </Checkbox>
                <Checkbox id="allow_ym" {...register("allow_ym")} ml={8}>
                  Allow Yard Move
                </Checkbox>
              </HStack>
              {errorMsg && (
                <Text fontSize={15} color="tomato">
                  {errorMsg}
                </Text>
              )}
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          {isLoading ? (
            <SpinnerButton />
          ) : (
            <Button
              disabled={!isValid}
              type="submit"
              form="driver-update-form"
              colorScheme="blue"
            >
              Update
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DriverFromUpdate;
