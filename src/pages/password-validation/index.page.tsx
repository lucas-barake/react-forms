import { type NextPage } from "next";
import { Label } from "$/components/ui/label";
import { Input } from "$/components/ui/input";
import { Form } from "$/components/ui/form";
import { Button } from "$/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { cn } from "$/utils/cn";
import { Main } from "$/components/ui/main";
import { useToast } from "$/components/ui/use-toast";
import { Code } from "$/components/ui/code";

const atLeastOneLowerCaseLetter = z.string().regex(/[a-z]/);
const atLeastOneUpperCaseLetter = z.string().regex(/[A-Z]/);
const atLeastOneNumber = z.string().regex(/[0-9]/);
const atLeastOneSpecialCharacter = z.string().regex(/[^a-zA-Z0-9]/);
const atLeastEightCharacters = z.string().min(8);

const validations = [
  {
    label: "At least one lowercase letter",
    schema: atLeastOneLowerCaseLetter,
  },
  {
    label: "At least one uppercase letter",
    schema: atLeastOneUpperCaseLetter,
  },
  {
    label: "At least one number",
    schema: atLeastOneNumber,
  },
  {
    label: "At least one special character",
    schema: atLeastOneSpecialCharacter,
  },
  {
    label: "At least 8 characters",
    schema: atLeastEightCharacters,
  },
];

const schema = z.object({
  password: z
    .string()
    .pipe(atLeastOneLowerCaseLetter)
    .pipe(atLeastOneUpperCaseLetter)
    .pipe(atLeastOneNumber)
    .pipe(atLeastOneSpecialCharacter)
    .pipe(atLeastEightCharacters),
});
type Schema = z.infer<typeof schema>;

const PasswordValidation: NextPage = () => {
  const toast = useToast();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  function handleSubmit(data: Schema) {
    toast.toast({
      title: "Success",
      description: <Code object={data} />,
    });
  }

  return (
    <Main>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <React.Fragment>
              <Label>
                Password
                <Input
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                />
              </Label>

              <div className="flex flex-col gap-1">
                {validations.map(({ label, schema }) => (
                  <div
                    key={label}
                    className={cn("flex items-center gap-1.5", {
                      "text-green-500": schema.safeParse(field.value).success,
                      "text-destructive": !schema.safeParse(field.value)
                        .success,
                    })}
                  >
                    {schema.safeParse(field.value).success ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      <XIcon className="h-5 w-5" />
                    )}
                    {label}
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}
        />

        <Button className="w-full" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </Form>
    </Main>
  );
};

export default PasswordValidation;
