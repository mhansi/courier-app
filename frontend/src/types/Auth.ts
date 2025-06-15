export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
};

export interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  role: Role;
}

export interface TokenUser {
  id: string;
  role: Role;
}