export interface User {
  email: string;
  firstName: string | null;
  lastName: string | null;
  tokens: string[];
}

export interface Token {
  accessToken: string;
}
