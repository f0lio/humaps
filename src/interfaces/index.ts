export interface User {
  full_name: string;
  username: string;
  bio: string;
  github: string;
  linkedin: string;
  twitter: string;
  phone: string;
  website: string;
  address: string;
  location: { longitude: number; latitude: number };
  avatar: string;
  dob: Date;
}

export interface Point {
  lat: number;
  long: number;
  radius: number;
}
