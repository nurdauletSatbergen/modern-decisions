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
  tableColumns: (keyof User)[];
  total: number;
}

export interface UsersFilter {
  searchTerm: string;
  pageSize: number;
  pageIndex: number;
  sort: {
    column: keyof User | null;
    direction: "asc" | "desc" | null;
  }
}

export interface PaginatedResponse<T> {
  value: T[];
  total: number;
}
