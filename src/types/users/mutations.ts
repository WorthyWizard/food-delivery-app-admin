export interface CreateUser {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
}

export type UpdateUser = Partial<CreateUser>;
