import React from "react";
import {
  type MultiStepFormSchema,
  stepTwoSchema,
  type StepTwoSchema,
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

const StepTwo: React.FC<Props> = ({ formValues, setFormValues, setStep }) => {
  const form = useForm<StepTwoSchema>({
    defaultValues: {
      email: formValues.stepTwo.email,
    },
    mode: "onSubmit",
    resolver: zodResolver(stepTwoSchema),
  });

  function handleSubmit(data: MultiStepFormSchema["stepTwo"]) {
    setFormValues((prev) => ({
      ...prev,
      stepTwo: data,
    }));
    setStep(3);
  }

  return (
    //eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <Label>
        Email
        <Input {...form.register("email")} required />
        <FieldError message={form.formState.errors.email?.message} />
      </Label>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" onClick={() => setStep(1)}>
          Previous
        </Button>

        <Button type="submit">Next</Button>
      </div>
    </Form>
  );
};

export default StepTwo;
