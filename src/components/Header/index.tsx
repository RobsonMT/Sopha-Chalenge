import { Center, Flex, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { FaTh } from "react-icons/fa";
import LogoMin from "../../assets/logo-min.svg";
import { theme } from "../../styles/theme";
import { Menu } from "./Menu";

export const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Flex
      borderBottom="1px"
      borderBlockEndColor="#f5f5f5"
      paddingX="8"
      paddingY="2"
    >
      <Flex align="center">
        <Image src={LogoMin} />
        <Heading ml="4" size="lg">
          Dashboard
        </Heading>
      </Flex>
      <Center as="button" onClick={onToggle} ml="auto" fontSize="2rem">
        <FaTh color={theme.colors.gray[300]} />
      </Center>
      <Menu isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
