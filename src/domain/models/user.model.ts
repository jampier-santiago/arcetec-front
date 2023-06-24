// * Model a user from business logic
export interface UserModel {
  email: string;
  id: string;
  name: string;
  password?: string;
  token?: string;
}
