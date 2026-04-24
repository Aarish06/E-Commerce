export type Role = "admin" | "customer";



export interface User {

  id: string;

  email: string;

  name: string | null;

  phone: string | null;

  address: string | null;

  avatarUrl: string | null;

  createdAt: string;

}