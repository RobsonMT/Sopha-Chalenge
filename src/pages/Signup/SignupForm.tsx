import { Button, Grid, Heading, VStack } from "@chakra-ui/react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Input } from "../../components/Form/Input";

interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface ISignupData {
  handleSignup: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<ISignUpData>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignup,
  errors,
  register,
  loading,
}: ISignupData) => (
  <Grid
    onSubmit={handleSignup}
    as="form"
    padding="25px"
    border="3px solid"
    borderColor="gray.100"
    borderRadius="8px"
    bg="white"
    color="gray.900"
    mt={["4", "4", "0"]}
    w={["100%", "100%", "50%", "50%"]}
  >
    <Heading as="h2" size="lg" textAlign="center">
      Crie sua conta
    </Heading>
    <VStack mt="5" spacing="2">
      <Input
        placeholder="Digite seu nome"
        label="Nome"
        error={errors.name}
        icon={FaUser}
        {...register("name")}
      />
      <Input
        placeholder="Digite seu email"
        type="email"
        label="Email"
        error={errors.email}
        icon={FaEnvelope}
        {...register("email")}
      />
      <Input
        type="password"
        placeholder="Digite sua senha"
        label="Senha"
        error={errors.password}
        icon={FaLock}
        {...register("password")}
      />
      <Input
        type="password"
        placeholder="Confirme sua senha"
        label="Confirmação de senha"
        error={errors.confirm_password}
        icon={FaLock}
        {...register("confirm_password")}
      />
    </VStack>
    <Button
      mt="6"
      isLoading={loading}
      bg="purple.800"
      w="100%"
      color="white"
      h="50px"
      borderRadius="8px"
      _hover={{
        background: "purple.900",
      }}
      type="submit"
    >
      Finalizar cadastro
    </Button>
  </Grid>
);
