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

export interface UsersState {
  users: User[];
  filter: UsersFilter;
  loading: boolean;
}

export interface UsersFilter {
  searchTerm: string;
  pageSize: number;
  pageIndex: number;
  sortBy: keyof User | null;
}
