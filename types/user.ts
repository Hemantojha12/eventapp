export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  bookingsCount: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
}