import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../../services/api";
import { ITask } from "../../interfaces";

interface ITaskProviderProps {
  children: ReactNode;
}

// type TPriority = "baixa" | "média" | "alta";

interface ITaskContextData {
  tasks: ITask[];
  createTask(data: Omit<ITask, "id">, accessToken: string): Promise<void>;
  loadTasks(userId: string, accessToken: string): Promise<void>;
  deleteTask(taskId: string, accessToken: string): Promise<void>;
  updateTask(
    taskId: string,
    userId: string,
    accessToken: string
  ): Promise<void>;
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

  const loadTasks = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await api.get(`/tasks?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteTask = useCallback(
    async (taskId: string, accessToken: string) => {
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

  const updateTask = useCallback(
    async (taskId: string, userId: string, accessToken: string) => {
      try {
        await api.patch(
          `/tasks/${taskId}`,
          {
            completed: true,
            userId,
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
          task.completed = true;
          setTasks([...filteredTasks, task]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, loadTasks, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { useTask, TaskProvider };
