export type User = {
  id: number;
  name: string;
  email: string;
}

export type Restaurant = {
  id: number;
  name: string;
  location: string;
  cuisine: string;
}

export type Review = {
  id: number;
  user_id: number;
  restaurant_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

export type Filter = "lowest" | "highest" | "nearby" | "none";
