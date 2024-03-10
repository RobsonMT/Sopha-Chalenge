import { Box, Button, Center, Modal, Text } from "@chakra-ui/react";
import { ModalOverlay, ModalBody } from "@chakra-ui/react";
import { ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { FaExclamation, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";

interface IModalErrorProrps {
  isOpen: boolean;
  onClose(): void;
  error: string;
  secondaryText: string;
}

export const ModalError = ({
  isOpen,
  onClose,
  error,
  secondaryText,
}: IModalErrorProrps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />

    <ModalContent color="gray.800">
      <ModalHeader display="flex">
        <Center bg="red.600" w="30px" h="30px" borderRadius="5px">
          <FaExclamation color={theme.colors.white} />
        </Center>
        <Text fontWeight="bold" ml="2">
          Oops!
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

      <ModalBody>
        <Center>Ocorreu algum erro!</Center>
        <Center fontWeight="bold">{error}</Center>
      </ModalBody>

      <ModalFooter flexDirection="column">
        <Button
          bg="red.600"
          color="white"
          w="100%"
          h="50px"
          _hover={{ bg: "red.700" }}
          onClick={onClose}
        >
          Tentar novamente
        </Button>
        <Text mt="4" textAlign="center">
          <Box dangerouslySetInnerHTML={{ __html: secondaryText }} />
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
