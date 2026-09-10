export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
}

export type FilterStatus = "all" | "completed" | "pending";
