import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const StyledFormRow = styled.div`
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, watch } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created"),
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const regularPrice = watch("regularPrice");

  function onSubmit(data) {
    mutate({...data, image: data.image[0]});
  }
  // function onError(errors) {
  //   console.log(errors);
  // }
  return (
    // <Form onSubmit={handleSubmit(onSubmit,onError)}>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>
      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            valueAsNumber: true,
            validate: (value) =>
              value <= regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isCreating}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <StyledFormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
