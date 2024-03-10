import { Button, Center, Modal, Text, VStack } from "@chakra-ui/react";
import { ModalOverlay, ModalBody } from "@chakra-ui/react";
import { ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaClipboard, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "../Form/input";
import * as yup from "yup";
import { TextArea } from "../Form/TextArea";
import { useAuth } from "../../contexts/Auth";
import { useTask } from "../../contexts/Tasks";
import { ITask } from "../../interfaces";

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
  dueDate: yup.date().required("Campo obrigatório"),
  priority: yup.string().required("Campo obrigatório"),
});

export const ModalCreateTask = ({
  isOpen,
  onClose,
}: IModalCreateTaskProrps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Omit<ITask, "id" | "userId">>({
    resolver: yupResolver(createTaskSchema),
  });

  const { user, accessToken } = useAuth();

  const { createTask } = useTask();

  const handleCreateTask = (data: Omit<ITask, "id">) => {
    const newData = { ...data, userId: user.id };

    createTask(newData, accessToken).then(() => onClose());
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
            Adicionar
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
              label="Data"
              error={errors.title}
              {...register("title")}
            />
            <Input
              placeholder="Data de Prioridade"
              type="date"
              label="Data"
              error={errors.title}
              {...register("title")}
            />
          </VStack>
        </ModalBody>

        <ModalFooter flexDirection="column">
          <Button
            type="submit"
            bg="purple.500"
            color="white"
            w="100%"
            h="50px"
            onClick={() => console.log("oi")}
            _hover={{ bg: "purple.600" }}
          >
            Adicionar tarefa
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
