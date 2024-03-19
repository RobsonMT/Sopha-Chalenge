import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { ISignInData } from "../../interfaces";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { SigninInfo } from "./signinInfo";
import { SiginForm } from "./SigninForm";
import { useHistory } from "react-router-dom";
import { ModalError } from "../../components/Modal/ModalError";
import { MotionContainer } from "../../components/MotionContainer";

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório. Ex: nome@email.com.")
    .email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória."),
});

export const Signin = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signIn } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<ISignInData>({
    resolver: yupResolver(signInSchema),
  });

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const handleSignIn = async (data: ISignInData) => {
    setLoading(true);

    await signIn(data)
      .then(() => {
        setLoading(false);
        reset();
        history.push("/dashboard");
      })
      .catch(() => {
        setLoading(false);
        reset();
        onModalErrorOpen();
      });
  };

  return (
    <MotionContainer>
      <React.Fragment>
        <ModalError
          isOpen={isModalErrorOpen}
          onClose={onModalErrorClose}
          error="Usuário não encontrado."
          secondaryText="Você pode tentar novamente, <b>clicando</b> no botão acima ou aguarde alguns minutos..."
        />
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
            <SigninInfo />
            <SiginForm
              errors={errors}
              handleSignIn={handleSubmit(handleSignIn)}
              loading={loading}
              register={register}
            />
          </Flex>
        </Flex>
      </React.Fragment>
    </MotionContainer>
  );
};
