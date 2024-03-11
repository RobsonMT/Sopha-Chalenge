import { Button, Center, Flex, useDisclosure } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { ModalCreateTask } from "../Modal/CreateTask";
import { Input } from "./Input";
import React from "react";

export const SearchBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
      <Flex
        mt="6"
        w="100%"
        paddingX={["4", "8"]}
        paddingY="2"
        borderWidth="1px"
        borderColor="gray.50"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Flex as="form">
          <Input name="title" placeholder="Pesquisar por tarefa" w="45vw" />
          <Center
            as="button"
            borderRadius="6px"
            ml="1"
            w="60px"
            h="50px"
            fontSize="2xl"
            bg="purple.500"
            _hover={{ bg: "purple.600" }}
          >
            <FaSearch color={theme.colors.white} />
          </Center>
        </Flex>
        <Button
          bg="purple.500"
          color="white"
          paddingX="5"
          ml="4"
          mt={["4", "0"]}
          h="50px"
          onClick={onOpen}
          _hover={{ bg: "purple.600" }}
        >
          Adicionar uma nova tarefa
        </Button>
      </Flex>
    </React.Fragment>
  );
};
