import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../../services/api";
import { ISignInData, ISignUpData, IUser } from "../../interfaces";
import { useHistory } from "react-router-dom";

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
  isAuthenticated: boolean;
  signIn(data: ISignInData): Promise<void>;
  signUp(data: ISignUpData): Promise<void>;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const history = useHistory();

  const [data, setData] = useState<IAuthState>(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("@SophaChalenge:accessToken");
      const user = localStorage.getItem("@SophaChalenge:user");

      if (accessToken && user) {
        return { accessToken, user: JSON.parse(user) };
      }
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async (data: ISignInData) => {
    const { email, password } = data;

    const response = await api.post("/login", { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem("@SophaChalenge:accessToken", accessToken);
    localStorage.setItem("@SophaChalenge:user", JSON.stringify(user));

    setData({ accessToken, user });
    setIsAuthenticated(true);
  }, []);

  const signUp = useCallback(async (data: ISignUpData) => {
    const { name, email, password } = data;

    await api.post("/signup", { name, email, password });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@SophaChalenge:accessToken");
    localStorage.removeItem("@SophaChalenge:user");

    setData({} as IAuthState);
    setIsAuthenticated(false);
    history.push("/");
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        isAuthenticated,
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
