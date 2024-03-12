import React, { useState } from "react";
import {
  Button,
  Center,
  Flex,
  InputGroup,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { ModalCreateTask } from "../Modal/CreateTask";
import { Input } from "./Input";
import { SEARCH } from "../../constants";

interface ISearchBoxProps {
  filterData(inputValue: string, slug: string): void;
}

export const SearchBox = ({ filterData }: ISearchBoxProps) => {
  const [slugState, setSlugState] = useState<string>("title");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchData = (
    event: React.ChangeEvent<HTMLInputElement>,
    slug: string
  ) => {
    return filterData(event.target.value, slug);
  };

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
        <Flex
          flexDir={["column", "row"]}
          justifyContent="center"
          alignItems="center"
        >
          <InputGroup
            flexDirection="row"
            w="100%"
            mr={["0", "2"]}
            mb={["2", "2", "2", "0"]}
          >
            <Select
              placeholder="Selecione um filtro"
              textAlign="center"
              fontSize={["sm", "md"]}
              bg="gray.50"
              h="50px"
              color="gray.500"
              borderColor="gray.200"
              borderRightRadius="0"
              _hover={{ bgColor: "gray.100" }}
              _placeholder={{ color: "gray.300" }}
              _focus={{ bg: "gray.100" }}
              defaultValue={slugState}
              onChange={(e) => setSlugState(e.target.value)}
            >
              {SEARCH.map((item, key) => (
                <option key={key} value={item.name}>
                  filtrar por {item.display}
                </option>
              ))}
            </Select>
            <Center
              borderRightRadius="6px"
              w="60px"
              h="50px"
              fontSize="2xl"
              bg="purple.500"
            >
              <FaFilter color={theme.colors.white} />
            </Center>
          </InputGroup>
          <InputGroup flexDirection="row" mb={["2", "2", "2", "0"]}>
            <Input
              name="title"
              placeholder="Pesquisar tarefa"
              w="100%"
              fontSize={["sm", "md"]}
              borderRightRadius="0"
              onChange={(e) => searchData(e, slugState)}
            />
            <Center
              borderRightRadius="6px"
              w="60px"
              h="50px"
              fontSize="2xl"
              bg="purple.500"
            >
              <FaSearch color={theme.colors.white} />
            </Center>
          </InputGroup>
        </Flex>
        <Button
          bg="purple.500"
          color="white"
          paddingX="5"
          ml="2"
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
