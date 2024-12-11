export type User = {
    id: number;
    name: string;
    email: string;
    dateOfBirth: Date;
    blacklisted: boolean;
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

export type Game = {
  id?: number
  name: string;
  genre: string;
  releaseDate: Date;
  developer: string;
}

export type Review = {
  id?: number;
  stars: number;
  description: string;
  game : Game;
  reviewerId: number;
}