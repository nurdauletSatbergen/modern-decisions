export interface User {
  _id: string;
  isActive: boolean;
  balance?: string;
  picture: string;
  age: number;
  name?: UserName;
  company?: string;
  email?: string;
  address: string;
  tags: string[];
  favoriteFruit: string;
}

export interface UserName {
  first: string;
  last?: string;
}
