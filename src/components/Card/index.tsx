import { HStack, Progress, Text, useDisclosure } from "@chakra-ui/react";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/Auth";
import { useTask } from "../../contexts/Tasks";
import { theme } from "../../styles/theme";
import { ITask } from "../../interfaces";
import { ModalEditTask } from "../Modal/ModalEditTask";
import { Draggable } from "@hello-pangea/dnd";
import React from "react";

interface ICardProps {
  task: ITask;
  index: number;
}

export const Card = ({ task, index }: ICardProps) => {
  const { user, accessToken } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { completeTask, deleteTask } = useTask();

  return (
    <React.Fragment>
      <ModalEditTask isOpen={isOpen} onClose={onClose} task={task} />
      <Draggable draggableId={String(task.id)} index={index}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            cursor="pointer"
            _hover={{ transform: "translateY(-7px)", borderColor: "gray.100" }}
            transition="border 0.2s, ease 0s , transform 0.2s"
            borderWidth="1px"
            borderColor="gray.50"
            boxShadow="base"
            padding="7"
            w={["100%", "auto"]}
          >
            <Flex justify="space-between">
              <Heading as="h1" size="md">
                {task.title}
              </Heading>
              <HStack spacing="4">
                <Center
                  as="button"
                  w="30px"
                  h="30px"
                  borderWidth="1px"
                  borderRadius="5px"
                  borderColor="gray.200"
                  bgColor="white"
                  onClick={onOpen}
                >
                  <FaEdit color={theme.colors.gray[300]} />
                </Center>
                <Center
                  as="button"
                  w="30px"
                  h="30px"
                  borderWidth="1px"
                  borderRadius="5px"
                  borderColor="gray.200"
                  bgColor="white"
                  onClick={() => deleteTask(task.id, accessToken)}
                >
                  <FaTrash color={theme.colors.gray[300]} />
                </Center>
                <Center
                  as="button"
                  w="30px"
                  h="30px"
                  borderWidth="1px"
                  borderRadius="5px"
                  borderColor="gray.200"
                  bgColor="white"
                  onClick={() => completeTask(task.id, user.id, accessToken)}
                >
                  <FaCheck color={theme.colors.gray[300]} />
                </Center>
              </HStack>
            </Flex>

            <Box w="100%" mt="4">
              <Text>{task.description}</Text>
              <Progress
                colorScheme="purple"
                mt="2.5"
                value={task.completed ? 100 : 10}
              />
              <Box
                color="gray.200"
                mt="3"
                display="inline-flex"
                w="100%"
                justifyContent="space-between"
              >
                <Text>{task.dueDate.split("-").reverse().join("/")}</Text>
                <Box display="inline-flex" alignItems="center">
                  <Text
                    w="10px"
                    h="10px"
                    borderRadius="50%"
                    mr="5px"
                    background={
                      task.priority === "baixa"
                        ? "orange"
                        : task.priority === "média"
                        ? "blue"
                        : "red"
                    }
                  />
                  <Text>{task.priority}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Draggable>
    </React.Fragment>
  );
};
