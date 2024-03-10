import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SignupInfo } from "./SignupInfo";
import { SignupForm } from "./SignupForm";
import { GoBackButton } from "./GoBackButton";
import { api } from "../../services/api";
import { ModalSuccess } from "../../components/Modal/ModalSuccess";
import { ModalError } from "../../components/Modal/ModalError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

export const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { signUp } = useAuth();

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ISignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignup = async (data: ITask<Omit, "id">) => {
    setLoading(true);
    Signup({ name, email, password });

    // api
    //   .post("/register", { name, email, password })
    //   .then(() => {
    //     setLoading(false);
    //     onModalSuccessOpen();
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //     onModalErrorOpen();
    //   });
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <ModalSuccess
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
        onClick={() => navigate("/")}
        buttonMessage="Ir para o login agora"
        message="Seu cadastro deu super certo, <b>vamos lá</b>"
        secondaryText="Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo..."
      />
      <ModalError
        error="Email já cadastrado."
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
        secondaryText="Você pode tentar novamente, <b>clicando</b> no botão acima ou aguarde alguns minutos..."
      />
      <Flex
        padding={["10px 15px", "10 15px", "0px", "0px"]}
        alignItems="center"
        justifyContent="center"
        height={["auto", "auto", "100vh", "100vh"]}
        bgGradient={[
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-l, purple.800 65%, white 35%)",
          "linear(to-l, purple.800 65%, white 35%)",
        ]}
        color="white"
      >
        <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column", "column", "row", "row"]}
        >
          {isWideVersion ? (
            <>
              <GoBackButton top="75" left="24" />
              <SignupForm
                errors={errors}
                handleSignup={handleSubmit(handleSignup)}
                loading={loading}
                register={register}
              />
              <SignupInfo />
            </>
          ) : (
            <>
              <GoBackButton top="10" left="75vw" />
              <SignupInfo />
              <SignupForm
                errors={errors}
                handleSignup={handleSubmit(handleSignup)}
                loading={loading}
                register={register}
              />
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
