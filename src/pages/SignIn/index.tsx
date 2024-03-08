import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Container, Wrapper } from "./styles";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

export interface ISignIn {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: yupResolver(schema),
  });

  const onSubmitFunc = (data: ISignIn) => {
    console.log(data);
    reset();
    navigate("/dashboard");
  };

  return (
    <Container>
      <Wrapper>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmitFunc)}>
          <Input
            icon={FaEnvelope}
            type="email"
            placeholder="Email"
            register={register}
            name="email"
            error={errors.email?.message}
          />
          <Input
            icon={FaLock}
            type="text"
            placeholder="Senha"
            register={register}
            name="password"
            error={errors.password?.message}
          />
          <Button type="submit">Enviar</Button>
          <span>Ainda não possui uma conta?</span>&nbsp;
          <Link to={"/signup"}>Cadastre-se</Link>
        </form>
      </Wrapper>
    </Container>
  );
};

export default SignIn;
