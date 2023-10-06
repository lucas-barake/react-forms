import { type NextPage } from "next";
import { Form } from "$/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "$/components/ui/input";
import { Label } from "$/components/ui/label";
import { Button } from "$/components/ui/button";
import { FieldError } from "$/components/ui/field-error";
import { Main } from "$/components/ui/main";

const schema = z.object({
  username: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[0-9]/, "Must contain at least one number"),
  email: z.string().email(),
});
type Schema = z.infer<typeof schema>;

const BasicFormPage: NextPage = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    reValidateMode: "onChange",
    mode: "onChange",
  });

  function handleSubmit(data: Schema) {
    window.alert(JSON.stringify(data, null, 2));
  }

  return (
    <Main>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <Label>
          Username
          <Input
            {...form.register("username")}
            required
            placeholder="Username"
          />
          <FieldError message={form.formState.errors.username?.message} />
        </Label>

        <Label>
          Password
          <Input
            {...form.register("password")}
            required
            type="password"
            placeholder="Password"
          />
          <FieldError message={form.formState.errors.password?.message} />
        </Label>

        <Label>
          Email
          <Input
            {...form.register("email")}
            required
            placeholder="example@domain.com"
          />
          <FieldError message={form.formState.errors.email?.message} />
        </Label>

        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </Form>
    </Main>
  );
};

export default BasicFormPage;
