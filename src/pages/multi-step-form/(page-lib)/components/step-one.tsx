import React from "react";
import {
  type MultiStepFormSchema,
  type StepOneSchema,
  stepOneSchema,
} from "$/pages/multi-step-form/(page-lib)/lib";
import { useForm } from "react-hook-form";
import { Label } from "$/components/ui/label";
import { FieldError } from "$/components/ui/field-error";
import { Button } from "$/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "$/components/ui/form";
import { type Steps } from "$/pages/multi-step-form/(page-lib)/lib";
import { Input } from "$/components/ui/input";

type Props = {
  formValues: MultiStepFormSchema;
  setFormValues: React.Dispatch<React.SetStateAction<MultiStepFormSchema>>;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};

const StepOne: React.FC<Props> = ({ formValues, setFormValues, setStep }) => {
  const form = useForm<StepOneSchema>({
    defaultValues: {
      firstName: formValues.stepOne.firstName,
      lastName: formValues.stepOne.lastName,
    },
    mode: "onSubmit",
    resolver: zodResolver(stepOneSchema),
  });

  function handleSubmit(data: MultiStepFormSchema["stepOne"]) {
    setFormValues((prev) => ({
      ...prev,
      stepOne: data,
    }));
    setStep(2);
  }

  return (
    //eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <Label>
        First Name
        <Input {...form.register("firstName")} required />
        <FieldError message={form.formState.errors.firstName?.message} />
      </Label>

      <Label>
        Last Name
        <Input {...form.register("lastName")} required />
        <FieldError message={form.formState.errors.lastName?.message} />
      </Label>

      <Button type="submit">Next</Button>
    </Form>
  );
};

export default StepOne;
