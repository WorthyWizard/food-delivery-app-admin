import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";

import { Form } from "@/components";
import { FormTextField, useForm } from "@/features/form";
import { Button } from "@/lib/mui";
import { authEndpointsMap } from "@/router";

import { useSignUp } from "../api";
import { FormSecretTextField } from "../components";
import { SignUpFormData, SignUpSchema } from "../validation";

export const SignUp = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<SignUpFormData>({
    validationSchema: SignUpSchema,
    defaultValues: {
      email: "test@test.com",
      firstName: "Jack",
      lastName: "Sparrow",
      password: "1234566789+gg",
      confirmPassword: "1234566789+gg",
    },
  });

  const signUp = useSignUp();

  const submitHandler = handleSubmit((submitData) => {
    const { email, password, firstName, lastName } = submitData;

    signUp.mutate(
      {
        email,
        firstName,
        lastName,
        password,
      },
      {
        onSuccess: () => {
          navigate(`../${authEndpointsMap.SIGN_IN}`);
        },
      },
    );
  });

  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography component="h1" variant="h5">
        Create an account
      </Typography>
      <Form sx={{ mt: 1 }} onSubmit={submitHandler}>
        <FormTextField
          autoFocus
          required
          fullWidth
          label="First Name"
          config={{
            control,
            name: "firstName",
          }}
        />
        <FormTextField
          fullWidth
          label="Last Name"
          config={{
            control,
            name: "lastName",
          }}
        />
        <FormTextField
          required
          fullWidth
          label="Email"
          autoComplete="email"
          config={{
            control,
            name: "email",
          }}
        />
        <FormSecretTextField
          required
          fullWidth
          label="Password"
          autoComplete="current-password"
          config={{
            control,
            name: "password",
          }}
        />
        <FormSecretTextField
          required
          fullWidth
          label="Confirm Password"
          config={{
            control,
            name: "confirmPassword",
          }}
        />
        <Button
          fullWidth
          type="submit"
          disabled={signUp.isPending}
          sx={{ mt: 3, mb: 1 }}
        >
          Sign Up
        </Button>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography>Already have an account?</Typography>
          <Link
            underline="none"
            component={RouterLink}
            to={`../${authEndpointsMap.SIGN_IN}`}
          >
            Sign In
          </Link>
        </Stack>
      </Form>
    </Stack>
  );
};
