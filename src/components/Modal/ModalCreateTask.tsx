import {
  Button,
  Center,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Modal,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ModalOverlay, ModalBody } from "@chakra-ui/react";
import { ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaClipboard, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "../Form/Input";
import * as yup from "yup";
import { TextArea } from "../Form/TextArea";
import { useAuth } from "../../contexts/Auth";
import { useTask } from "../../contexts/Tasks";
import { ITask } from "../../interfaces";
import { PRIORITY } from "../../constants";

interface IModalCreateTaskProrps {
  isOpen: boolean;
  onClose(): void;
}

const createTaskSchema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  description: yup
    .string()
    .required("Campo obrigatório")
    .max(100, "Máximo de 100 caracteres"),
  completed: yup.boolean().default(false).required("Campo obrigatório"),
  dueDate: yup.string().required("Campo obrigatório"),
  priority: yup.string().required("Campo obrigatório"),
});

export const ModalCreateTask = ({
  isOpen,
  onClose,
}: IModalCreateTaskProrps) => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<Omit<ITask, "id" | "userId">>({
    resolver: yupResolver(createTaskSchema),
  });

  const { user, accessToken } = useAuth();
  const { createTask } = useTask();

  const handleCreateTask = (data: Omit<ITask, "id" | "userId">) => {
    const newData = { ...data, userId: user.id };

    createTask(newData, accessToken).then(() => {
      onClose();
      reset();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(handleCreateTask)}
        padding="2"
        bg="white"
        color="gray.800"
      >
        <ModalHeader display="flex">
          <Center bg="purple.500" w="30px" h="30px" borderRadius="5px">
            <FaClipboard color={theme.colors.white} />
          </Center>
          <Text fontWeight="bold" ml="2">
            Adicionar Tarefa
          </Text>
          <Center
            onClick={onClose}
            as="button"
            ml="auto"
            w="32px"
            h="32px"
            bg="red.600"
            fontSize="large"
            borderRadius="md"
          >
            <FaTimes color={theme.colors.white} />
          </Center>
        </ModalHeader>

        <ModalBody textAlign="center">
          <VStack spacing="5">
            <Input
              placeholder="Digite o título"
              label="Título"
              error={errors.title}
              {...register("title")}
            />
            <TextArea
              placeholder="Degite a descrição"
              label="Descrição"
              error={errors.description}
              {...register("description")}
            />
            <Input
              placeholder="Data de vencimento"
              type="date"
              label="Data de vencimento"
              error={errors.dueDate}
              {...register("dueDate")}
            />
            <InputGroup flexDirection="column">
              <FormLabel color="gray.400">Prioridade</FormLabel>
              <Select
                placeholder="Selecione uma prioridade"
                textAlign="center"
                fontSize={["sm", "md"]}
                bg="gray.50"
                h="50px"
                color="gray.500"
                borderColor="gray.200"
                _hover={{ bgColor: "gray.100" }}
                _placeholder={{ color: "gray.300" }}
                _focus={{ bg: "gray.100" }}
                {...register("priority")}
              >
                {PRIORITY.map((item, key) => (
                  <option key={key} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {!!errors.priority && (
                <FormErrorMessage color="red.500">
                  {errors.priority?.message}
                </FormErrorMessage>
              )}
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter flexDirection="column">
          <Button
            type="submit"
            bg="purple.500"
            color="white"
            w="100%"
            h="50px"
            _hover={{ bg: "purple.600" }}
          >
            Adicionar tarefa
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
