import { Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Form/input";

interface ISignInData {
  email: string;
  password: string;
}

interface ILoginFormProps {
  handleSignIn: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<ISignInData>;
  loading: boolean;
}

export const LoginForm = ({
  handleSignIn,
  errors,
  register,
  loading,
}: ILoginFormProps) => {
  const navigate = useNavigate();

  return (
    <Grid
      onSubmit={handleSignIn}
      as="form"
      padding="25px"
      border="3px solid"
      borderColor="gray.100"
      borderRadius="8px"
      bg="white"
      color="gray.900"
      mt={["4", "4", "0"]}
      w={["100%", "100%", "40%", "40%"]}
    >
      <Heading as="h2" size="lg" textAlign="center">
        Bem vindo de volta!
      </Heading>
      <VStack mt="5" spacing="2">
        <Input
          placeholder="Digite seu login"
          type="email"
          label="Login"
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
      </VStack>
      <VStack mt="7" spacing="2">
        <Button
          isLoading={loading}
          bg="purple.800"
          color="white"
          w="100%"
          h="50px"
          borderRadius="8px"
          _hover={{
            background: "purple.900",
          }}
          type="submit"
        >
          Entrar
        </Button>
        <Text color="gray.400">Ainda não possui uma conta? </Text>
        <Button
          bg="gray.100"
          w="100%"
          color="gray.300"
          h="50px"
          borderRadius="8px"
          onClick={() => navigate("/signup")}
          _hover={{
            background: "gray.200",
          }}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
