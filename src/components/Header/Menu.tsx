import { useAuth } from "../../contexts/Auth";
import { Box, Drawer, DrawerContent, Heading, Text } from "@chakra-ui/react";
import { DrawerBody, Flex, Center } from "@chakra-ui/react";
import { DrawerOverlay, DrawerHeader } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { theme } from "../../styles/theme";

interface IMenuProps {
  isOpen: boolean;
  onClose(): void;
}

export const Menu = ({ isOpen, onClose }: IMenuProps) => {
  const { user, signOut } = useAuth();

  return (
    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay mt="78px" />
      <DrawerContent ml="auto" mt="80px" w={["450px", "350px"]}>
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor="gray.50"
          color="gray.400"
        >
          {user.name}
        </DrawerHeader>
        <DrawerBody>
          <Flex align="center" onClick={signOut} _hover={{ cursor: "pointer" }}>
            <Center
              w="50px"
              h="50px"
              bg="red.600"
              fontSize="2xl"
              borderRadius="md"
            >
              <FiLogOut color={theme.colors.white} />
            </Center>
            <Box ml="4">
              <Heading as="h2" fontSize="lg">
                Sair da minha conta
              </Heading>
              <Text color="gray.300" fontSize="small">
                sair da minha conta agora
              </Text>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
