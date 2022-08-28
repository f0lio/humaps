export interface User {
  full_name: string;
  username: string;
  bio: string;
  address: string;
  avatar: string;
  dob: string;
  location: { longitude: number; latitude: number };
}

export interface Point {
  lat: number;
  long: number;
  radius: number;
}
