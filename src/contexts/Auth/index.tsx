import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../../services/api";
import { IUser } from "../../interfaces";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthState {
  accessToken: string;
  user: IUser;
}

interface IAuthContextData {
  user: IUser;
  accessToken: string;
  signUp(data: Omit<IUser, "id">): void;
  signIn(data: Omit<IUser, "id" | "name">): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used Within an AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IAuthState>(() => {
    const accessToken = localStorage.getItem("@SophaChalenge:accessToken");
    const user = localStorage.getItem("@SophaChalenge:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async (data: Omit<IUser, "id" | "name">) => {
    try {
      const { email, password } = data;

      const response = await api.post("/login", { email, password });

      const { accessToken, user } = response.data;

      localStorage.setItem("@SophaChalenge:accessToken", accessToken);
      localStorage.setItem("@SophaChalenge:user", JSON.stringify(user));

      setData({ accessToken, user });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signUp = useCallback(async (data: Omit<IUser, "id">) => {
    try {
      const { name, email, password } = data;

      const response = await api.post("/signup", { name, email, password });

      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@SophaChalenge:accessToken");
    localStorage.removeItem("@SophaChalenge:user");

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
