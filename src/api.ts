import { Task, User } from "./types";

const TASKS_URL = "https://jsonplaceholder.typicode.com/todos?_limit=50";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(TASKS_URL);
  const tasks = (await response.json()) as Task[];

  return tasks;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(USERS_URL);
  const users = (await response.json()) as User[];

  return users;
}
