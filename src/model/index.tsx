export enum Role {
  GUEST,
  USER,
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  email: string;
}

export interface Client extends User {
  avatar: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  token: string;
}
