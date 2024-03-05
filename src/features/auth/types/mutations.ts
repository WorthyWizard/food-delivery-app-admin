export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp extends SignIn {
  firstName: string;
  lastName: string;
}
