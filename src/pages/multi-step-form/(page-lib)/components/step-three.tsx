import React from "react";
import {
  type MultiStepFormSchema,
  stepThreeSchema,
  type StepThreeSchema,
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
  const form = useForm<StepThreeSchema>({
    defaultValues: {
      password: formValues.stepThree.password,
      confirmPassword: formValues.stepThree.confirmPassword,
    },
    mode: "onSubmit",
    resolver: zodResolver(stepThreeSchema),
  });

  function handleSubmit(data: MultiStepFormSchema["stepThree"]) {
    const newData = {
      ...formValues,
      stepThree: data,
    };
    setFormValues(newData);
    window.alert(JSON.stringify(newData, null, 2));
  }

  return (
    //eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <Label>
        Password
        <Input type="password" {...form.register("password")} required />
        <FieldError message={form.formState.errors.password?.message} />
      </Label>

      <Label>
        Confirm Password
        <Input type="password" {...form.register("confirmPassword")} required />
        <FieldError message={form.formState.errors.confirmPassword?.message} />
      </Label>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" onClick={() => setStep(2)}>
          Previous
        </Button>

        <Button type="submit">Next</Button>
      </div>
    </Form>
  );
};

export default StepTwo;
