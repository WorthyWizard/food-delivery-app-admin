import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";

import { Form } from "@/components";
import { FormTextField, useForm } from "@/features/form";
import { Button } from "@/lib/mui";
import { authEndpointsMap } from "@/router";

import { useSignIn } from "../api";
import { FormSecretTextField } from "../components";
import { useAuthStore } from "../store";
import { SignInFormData, SignInSchema } from "../validation";

export const SignIn = () => {
  const setupUser = useAuthStore((state) => state.setup);

  const { control, handleSubmit } = useForm<SignInFormData>({
    validationSchema: SignInSchema,
    defaultValues: {
      email: "test@test.com",
      password: "123456789",
    },
  });

  const signIn = useSignIn();

  const submitHandler = handleSubmit((submitData) => {
    const { email, password } = submitData;

    signIn.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          setupUser(data);
        },
      },
    );
  });

  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography component="h2" variant="h5">
        Log In
      </Typography>
      <Form sx={{ mt: 1 }} onSubmit={submitHandler}>
        <FormTextField
          autoFocus
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
        <Button
          fullWidth
          type="submit"
          disabled={signIn.isPending}
          sx={{ mt: 3, mb: 1 }}
        >
          Sign In
        </Button>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography>Don't have an account?</Typography>
          <Link
            underline="none"
            component={RouterLink}
            to={`../${authEndpointsMap.SIGN_UP}`}
          >
            Sign Up
          </Link>
        </Stack>
      </Form>
    </Stack>
  );
};
