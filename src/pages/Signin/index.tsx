import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { IUser } from "../../interfaces";

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório. Ex: nome@email.com.")
    .email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória."),
});

export const Signin = () => {
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm: ({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: Omit<IUser, "id" | "name">) => {
    setLoading(true);
    signIn(data).then(() => setLoading(false))
      .catch(() => setLoading(false));
    }
  };

  return (
    <Flex
      padding={["10px 15px", "10px 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="center"
      height={["auto", "auto", "100vh", "100vh"]}
      bgGradient={[
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-r, purple.800 70%, white 30%)",
        "linear(to-r, purple.800 70%, white 30%)",
      ]}
      color="white"
    >
      <Flex
        w={["100%", "100%", "100%", "80%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
        alignItems="center"
      >
        <LoginInfo />
        <LoginForm
          errors={errors}
          handleSignIn={handleSubmit(handleSignIn)}
          loading={loading}
          register={register}
        />
      </Flex>
    </Flex>
  );
};
