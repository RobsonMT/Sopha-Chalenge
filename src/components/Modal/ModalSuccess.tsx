import { Box, Button, Center, Modal, Text } from "@chakra-ui/react";
import { ModalOverlay, ModalBody } from "@chakra-ui/react";
import { ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { FaExclamation, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";

interface IModalSuccessProrps {
  isOpen: boolean;
  onClose(): void;
  onClick(): void;
  message: string;
  buttonMessage: string;
  secondaryText: string;
}

export const ModalSuccess = ({
  isOpen,
  onClose,
  onClick,
  buttonMessage,
  message,
  secondaryText,
}: IModalSuccessProrps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent padding="2" bg="white" color="gray.800">
      <ModalHeader display="flex">
        <Center bg="purple.500" w="30px" h="30px" borderRadius="5px">
          <FaExclamation color={theme.colors.white} />
        </Center>
        <Text fontWeight="bold" ml="2">
          Yeesss...
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
        <Box dangerouslySetInnerHTML={{ __html: message }} />
      </ModalBody>

      <ModalFooter flexDirection="column">
        <Button
          bg="purple.500"
          mr={3}
          color="white"
          w="100%"
          h="50px"
          onClick={onClick}
          _hover={{ bg: "purple.600" }}
        >
          {buttonMessage}
        </Button>
        <Text mt="4" textAlign="center">
          <Box dangerouslySetInnerHTML={{ __html: secondaryText }} />
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
