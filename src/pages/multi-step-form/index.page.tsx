import { type NextPage } from "next";
import React from "react";
import {
  type MultiStepFormSchema,
  type Steps,
  components,
} from "$/pages/multi-step-form/(page-lib)/lib";
import { Main } from "$/components/ui/main";

const MultiStepFormPage: NextPage = () => {
  const [formValues, setFormValues] = React.useState<MultiStepFormSchema>({
    stepOne: {
      firstName: "",
      lastName: "",
    },
    stepTwo: {
      email: "",
    },
    stepThree: {
      password: "",
      confirmPassword: "",
    },
  });
  const [step, setStep] = React.useState<Steps>(1);
  const CurrentComponent = components[step];

  return (
    <Main>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold">Multi Step Form</h1>
        <span className="text-muted-foreground">
          (Step {step} of {Object.keys(components).length})
        </span>
      </div>

      <CurrentComponent
        formValues={formValues}
        setFormValues={setFormValues}
        setStep={setStep}
      />
    </Main>
  );
};

export default MultiStepFormPage;
