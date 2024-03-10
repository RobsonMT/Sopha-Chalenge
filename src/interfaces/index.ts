export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  priority: string;
  userId: number;
}
