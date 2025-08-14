import type { User } from "../types/user";

export async function fetchAllUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json() as Promise<User[]>;
}
