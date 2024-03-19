import React from "react";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { ModalCreateTask } from "../Modal/ModalCreateTask";

export const SearchBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
      <Flex
        mt="6"
        w="100%"
        paddingX={["4", "8"]}
        paddingY={["2"]}
        borderWidth="1px"
        borderColor="gray.50"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Flex flexDir="row" justifyContent="flex-end" gap="4" h="100%"></Flex>
        <Button
          display="inline-flex"
          gap="2"
          bg="purple.500"
          color="white"
          paddingX="5"
          h="50px"
          onClick={onOpen}
          _hover={{ bg: "purple.600" }}
        >
          Adicionar uma nova tarefa
          <FaPlus size={20} color={theme.colors.white} />
        </Button>
      </Flex>
    </React.Fragment>
  );
};
