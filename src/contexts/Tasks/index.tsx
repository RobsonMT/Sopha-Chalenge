import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../../services/api";
import { ITask, IUpdateTask } from "../../interfaces";
import { compareByPriority } from "../../utils";

interface ITaskProviderProps {
  children: ReactNode;
}

interface ITaskContextData {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  createTask(data: Omit<ITask, "id">, accessToken: string): Promise<void>;
  loadTasks(userId: number, accessToken: string): Promise<void>;
  completeTask(
    taskId: ITask,
    userId: number,
    accessToken: string
  ): Promise<void>;
  updateTask(
    taskId: number,
    data: IUpdateTask,
    accessToken: string
  ): Promise<void>;
  deleteTask(taskId: number, accessToken: string): Promise<void>;
}

const TaskContext = createContext({} as ITaskContextData);

const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within an taskProvider");
  }

  return context;
};

const TaskProvider = ({ children }: ITaskProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const createTask = useCallback(
    async (data: Omit<ITask, "id">, accessToken: string) => {
      try {
        const response = await api.post("/tasks", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setTasks((oldState) => [...oldState, response.data]);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const loadTasks = useCallback(async (userId: number, accessToken: string) => {
    try {
      const response = await api.get(`/tasks?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTasks(response.data.sort(compareByPriority));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateTask = useCallback(
    async (taskId: number, data: IUpdateTask, accessToken: string) => {
      try {
        await api.patch(
          `/tasks/${taskId}`,
          {
            ...data,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        const task = tasks.find((task) => task.id === taskId);

        if (task) {
          Object.assign(task, data);
          setTasks([...filteredTasks, task]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [tasks]
  );

  const completeTask = useCallback(
    async (task: ITask, userId: number, accessToken: string) => {
      await api.patch(
        `/tasks/${task.id}`,
        {
          completed: !task.completed,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const filteredTasks = tasks.filter((item) => item.id !== task.id);

      if (task) {
        task.completed = !task.completed;
        setTasks([...filteredTasks, task]);
      }
    },
    [tasks]
  );

  const deleteTask = useCallback(
    async (taskId: number, accessToken: string) => {
      try {
        await api.delete(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
      } catch (error) {
        console.log(error);
      }
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask,
        loadTasks,
        completeTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { useTask, TaskProvider };
