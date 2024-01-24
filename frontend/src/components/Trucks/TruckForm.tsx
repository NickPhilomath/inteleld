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
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FUEL_TYPE, STATES, YEARS } from "../..";
import useRequest from "../../hooks/useRequest";
import { getHeaders } from "../../hooks/useData";
import { getErrorMsg } from "../../util";
import SpinnerButton from "../common/SpinnerButton";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";

export const schema = z.object({
  // truck: z.number({ invalid_type_error: "Truck is required" }).positive(),
  unit_number: z.string().max(10),
  make: z.string().max(15),
  model: z.string().max(20),
  license_number: z.string().max(15),
  license_state: z.string(),
  year: z.string(),
  fuel_type: z.string(),
  vin_number: z.string().max(20),
  notes: z.string().max(255),
});

export type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleRefetch: () => void;
}

const TruckForm = ({ isOpen, onClose, handleRefetch }: Props) => {
  const { post, isLoading, errorMsg, resErros } = useRequest<FormData>(
    "/trucks/",
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
    post(data, () => {
      handleRefetch();
      reset();
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="69rem">
        <ModalHeader>Create a Truck</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="truck-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <FormInput
                  type="text"
                  placeholder="Vehicle ID"
                  id="unit_number"
                  conf={register("unit_number")}
                  errMsg={errors.unit_number?.message}
                  resErrMsg={getErrorMsg(resErros, "unit_number")}
                />
                <FormInput
                  type="text"
                  placeholder="Make"
                  id="make"
                  conf={register("make")}
                  errMsg={errors.make?.message}
                  resErrMsg={getErrorMsg(resErros, "make")}
                />
                <FormInput
                  type="text"
                  placeholder="Model"
                  id="model"
                  conf={register("model")}
                  errMsg={errors.model?.message}
                  resErrMsg={getErrorMsg(resErros, "model")}
                />
                <FormInput
                  type="text"
                  placeholder="License number"
                  id="license_number"
                  conf={register("license_number")}
                  errMsg={errors.license_number?.message}
                  resErrMsg={getErrorMsg(resErros, "eld_device")}
                />
              </HStack>
              <HStack>
                <FormSelect
                  placeholder="Year"
                  id="year"
                  conf={register("year")}
                  errMsg={errors.year?.message}
                  resErrMsg={getErrorMsg(resErros, "year")}
                >
                  {YEARS.map((year, index) => {
                    return (
                      <option key={index} value={year.value}>
                        {year.name}
                      </option>
                    );
                  })}
                </FormSelect>
                <FormSelect
                  placeholder="License Plate Issued State"
                  id="license_state"
                  conf={register("license_state")}
                  errMsg={errors.license_state?.message}
                  resErrMsg={getErrorMsg(resErros, "license_state")}
                >
                  {STATES.map((state, index) => {
                    return (
                      <option key={index} value={state.value}>
                        {state.name}
                      </option>
                    );
                  })}
                </FormSelect>
                <FormSelect
                  placeholder="Fuel Type"
                  id="fuel_type"
                  conf={register("fuel_type")}
                  errMsg={errors.fuel_type?.message}
                  resErrMsg={getErrorMsg(resErros, "fuel_type")}
                >
                  {FUEL_TYPE.map((fuel_type, index) => {
                    return (
                      <option key={index} value={fuel_type.value}>
                        {fuel_type.name}
                      </option>
                    );
                  })}
                </FormSelect>
              </HStack>
              <HStack>
                <FormInput
                  type="text"
                  placeholder="VIN number"
                  id="vin_number"
                  conf={register("vin_number")}
                  errMsg={errors.vin_number?.message}
                  resErrMsg={getErrorMsg(resErros, "vin_number")}
                />
                <FormInput
                  type="text"
                  placeholder="Notes"
                  id="notes"
                  conf={register("notes")}
                  errMsg={errors.notes?.message}
                  resErrMsg={getErrorMsg(resErros, "notes")}
                />
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
              form="truck-form"
              colorScheme="blue"
            >
              Save
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TruckForm;
