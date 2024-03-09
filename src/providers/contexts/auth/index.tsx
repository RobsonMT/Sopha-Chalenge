import { useState, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services";
import { ISignIn, ISignup, IUser } from "../../../interfaces";
import toast from "react-hot-toast";

interface IChildrenProps {
  children: ReactNode;
}

interface IAuthState {
  user: IUser;
  accessToken: string;
}

interface IAuthProviderData {
  user: Omit<IUser, "password">;
  signIn: (data: ISignIn) => Promise<void>;
  signUp: (data: ISignup) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthProviderData>({} as IAuthProviderData);

const AuthProvider = ({ children }: IChildrenProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const [data, setData] = useState<IAuthState>(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem("@sophaChalenge:accessToken");
      const user = localStorage.getItem("@sophaChalenge:user");

      if (accessToken && user) {
        return { accessToken, user: JSON.parse(user) };
      }
    }

    return {} as IAuthState;
  });

  const signIn = async (data: ISignIn) => {
    try {
      const promise = api.post("/signin", data);

      toast
        .promise(promise, {
          loading: "Carregando...",
          success: <p>Usuário validado com sucesso!</p>,
          error: <p>Erro inesperado!</p>,
        })
        .then((res) => {
          const { accessToken, user } = res.data;

          localStorage.setItem("@sophaChalenge:accessToken", accessToken);
          localStorage.setItem("@sophaChalenge:user", JSON.stringify(user));

          setData({ accessToken, user });
          setIsAuthenticated(true);

          navigate("/dashboard");
        });
    } catch (e) {
      console.error(e);
      toast.error("Usuário não encontrado!");
    }
  };

  const signUp = async (data: ISignup) => {
    try {
      const promise = api.post("/signup", data);

      toast
        .promise(promise, {
          loading: "Salvando...",
          success: <p>Usuário registrado com sucesso!</p>,
          error: <p>Erro inesperado!</p>,
        })
        .then(() => {
          navigate("/");
        });
    } catch (e) {
      console.error(e);
      toast.error("Email já registrado");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("@sophaChalenge:accessToken");
    localStorage.removeItem("@sophaChalenge:user");

    setData({} as IAuthState);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
