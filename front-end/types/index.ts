export type User = {
    id?: number;
    name?: string;
    email?: string;
    dateOfBirth?: Date;
    blacklisted?: boolean;
    role?: "normal";
    consoles?: Console[];
    password?: string;
    reviewerId?: number;
  };

  export type Reviewer = {
    id: number;
    user: User;
    reviews: Review[];
  };

export type Console = {
  id?: number;
  price?: number;
  name: string;
  version: string;
  brand: string;
  releaseDate: string;
  games: Game[];
  userId: number;
  };

export type Game = {
  id?: number;
  name: string;
  genre: string;
  releaseDate: string;
  developer: string;
}

export type Review = {
  id?: number;
  game?: Game;
  stars: number;
  description: string;
  gameId : number;
  reviewerId: number;
}

export type ReviewData = { 
  id: number; 
  reviews: Review[]; 
  user: User; 
}

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};
