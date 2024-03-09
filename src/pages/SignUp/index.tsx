import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/Input";
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { Container, Wrapper } from "./styles";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { ISignup } from "../../interfaces";
import { useAuth } from "../../providers/hooks";

const Signup = () => {
  const { signUp } = useAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignup>({
    resolver: yupResolver(schema),
  });

  const onSubmitFunc = (data: ISignup) => {
    console.log(data);

    signUp(data).then(() => {
      reset();
    });
  };

  return (
    <Container>
      <Wrapper>
        <h1>cadastro</h1>
        <form onSubmit={handleSubmit(onSubmitFunc)}>
          <Input
            icon={FaUserAlt}
            type="text"
            placeholder="Nome"
            register={register}
            name="name"
            error={errors.name?.message}
          />
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
          <span>Já possui uma conta?</span>&nbsp;
          <Link to={"/"}>Login</Link>
        </form>
      </Wrapper>
    </Container>
  );
};

export default Signup;
