import { Center, theme } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface IGoBackButtonProps {
  top: string;
  left: string;
}

export const GoBackButton = ({ top, left }: IGoBackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Center
      as="button"
      position="absolute"
      top={top}
      left={left}
      backgroundColor="purple.500"
      fontSize="2xl"
      borderRadius="md"
      w={["60px", "80px"]}
      h="60px"
      _hover={{
        bg: "purple.600",
      }}
      onClick={() => navigate("/")}
    >
      <FaArrowLeft color={theme.colors.white} />
    </Center>
  );
};
