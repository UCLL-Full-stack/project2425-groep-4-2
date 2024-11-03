export type User = {
    id: number;
    name: string;
    email: string;
    dateOfBirth: Date;
    role?: "normal";
    consoles: [];
    reviews: [];
  };

export type Console = {
  id?: number;
  price?: number;
  name: string;
  version: string;
  brand: string;
  releaseDate: string;
  };