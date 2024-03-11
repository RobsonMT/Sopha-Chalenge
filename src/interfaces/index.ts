export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: string;
  userId: number;
}

export interface IUpdateTask {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: string;
}
