import {
  Button,
  Center,
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
import { ITask, IUpdateTask } from "../../interfaces";
import { PRIORITY } from "../../constants";
import { useTask } from "../../contexts/Tasks";
import { useAuth } from "../../contexts/Auth";

interface IModalEditTaskProrps {
  isOpen: boolean;
  onClose(): void;
  task: ITask;
}

const editTaskSchema = yup.object().shape({
  title: yup.string().optional(),
  description: yup.string().max(100, "Máximo de 100 caracteres").optional(),
  completed: yup.boolean().optional(),
  dueDate: yup.string().optional(),
  priority: yup.string().optional(),
});

export const ModalEditTask = ({
  isOpen,
  onClose,
  task,
}: IModalEditTaskProrps) => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<IUpdateTask>({
    resolver: yupResolver(editTaskSchema),
  });

  const { accessToken } = useAuth();
  const { updateTask } = useTask();

  const handleUpdateTask = (data: IUpdateTask) => {
    updateTask(task.id, data, accessToken).then(() => {
      reset();
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(handleUpdateTask)}
        padding="2"
        bg="white"
        color="gray.800"
      >
        <ModalHeader display="flex">
          <Center bg="purple.500" w="30px" h="30px" borderRadius="5px">
            <FaClipboard color={theme.colors.white} />
          </Center>
          <Text fontWeight="bold" ml="2">
            Editar Tarefa
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
              defaultValue={task.title}
            />
            <TextArea
              placeholder="Degite a descrição"
              label="Descrição"
              error={errors.description}
              {...register("description")}
              defaultValue={task.description}
            />
            <Input
              placeholder="Data de vencimento"
              type="date"
              label="Data de vencimento"
              error={errors.dueDate}
              {...register("dueDate")}
              defaultValue={task.dueDate}
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
                defaultValue={task.priority}
              >
                {PRIORITY.map((item, key) => (
                  <option key={key} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Select>
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
            Editar tarefa
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
