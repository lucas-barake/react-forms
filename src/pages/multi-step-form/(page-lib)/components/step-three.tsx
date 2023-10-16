import React from "react";
import {
  type MultiStepFormSchema,
  stepThreeSchema,
  type StepThreeSchema,
} from "$/pages/multi-step-form/(page-lib)/lib";
import { useForm } from "react-hook-form";
import { Label } from "$/components/ui/label";
import { FieldError } from "$/components/ui/field-error";
import { Button, buttonVariants } from "$/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "$/components/ui/form";
import { type Steps } from "$/pages/multi-step-form/(page-lib)/lib";
import { Input } from "$/components/ui/input";
import { useToast } from "$/components/ui/use-toast";
import { Code } from "$/components/ui/code";
import Link from "next/link";

type Props = {
  formValues: MultiStepFormSchema;
  setFormValues: React.Dispatch<React.SetStateAction<MultiStepFormSchema>>;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};

const StepTwo: React.FC<Props> = ({ formValues, setFormValues, setStep }) => {
  const toast = useToast();
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
    toast.toast({
      title: "Success",
      description: <Code object={newData} />,
    });
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

        <Button type="submit">Submit</Button>
      </div>

      <Link className={buttonVariants({})} href="/">
        Pass in something
      </Link>
    </Form>
  );
};

export default StepTwo;
