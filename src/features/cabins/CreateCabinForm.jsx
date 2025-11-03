import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CreateCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const { mutate, isPending: iSFormSubmit } = useMutation({
    mutationFn: CreateCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created ");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    //image object me pass ho rha h agar data.image.at(0) direct error aayega becouse at() pure array pr kaam karta h
    // console.log(data.image[0].name);  //solution 1

    // solution 2
    // const files = Array.from(data.image); // pahle array me conver kar rhe h object ko
    // const file = files.at(0);

    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is required.",
          })}
          disabled={iSFormSubmit}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is required.",
            min: {
              value: 1,
              message: "Capacity should be atleast 1.",
            },
          })}
          disabled={iSFormSubmit}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This Field is required." })}
          disabled={iSFormSubmit}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "Discount should be less than regularPrice",
          })}
          disabled={iSFormSubmit}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          {...register("description", { required: "This Field is required." })}
          disabled={iSFormSubmit}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", { required: "This Field is required." })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={iSFormSubmit}>Add cabin</Button>
      </FormRow>

      {/* old code in same page 
      const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

      <FormRow2>
        <Label htmlFor="name">Cabin Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is required.",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow2>

      <FormRow2>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is required.",
            min: {
              value: 1,
              message: "Capacity should be atleast 1.",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow2>

      <FormRow2>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This Field is required." })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow2>

      <FormRow2>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "Discount should be less than regularPrice",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow2>

      <FormRow2>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          {...register("description", { required: "This Field is required." })}
          defaultValue=""
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow2>

      <FormRow2>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow2>

      <FormRow2>
        
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={iSFormSubmit}>Add cabin</Button>
      </FormRow2> */}
    </Form>
  );
}

export default CreateCabinForm;
