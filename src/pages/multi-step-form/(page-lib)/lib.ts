import StepOne from "$/pages/multi-step-form/(page-lib)/components/step-one";
import { z } from "zod";
import StepTwo from "$/pages/multi-step-form/(page-lib)/components/step-two";
import StepThree from "$/pages/multi-step-form/(page-lib)/components/step-three";

export const stepOneSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
});
export type StepOneSchema = z.infer<typeof stepOneSchema>;

export const stepTwoSchema = z.object({
  email: z.string().email(),
});
export type StepTwoSchema = z.infer<typeof stepTwoSchema>;

export const stepThreeSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type StepThreeSchema = z.infer<typeof stepThreeSchema>;

export const multiStepFormSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
});
export type MultiStepFormSchema = z.infer<typeof multiStepFormSchema>;

export const components = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
} as const;
export type Steps = keyof typeof components;
