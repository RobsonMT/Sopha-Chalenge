import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Textarea as ChakraTextarea } from "@chakra-ui/react";
import { TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { ForwardRefRenderFunction, forwardRef } from "react";

import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";

interface ITextareaProps extends ChakraTextareaProps {
  label?: string;
  icon?: IconType;
  name: string;
  error?: FieldError | null;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: "red.500",
  default: "gray.200",
  focus: "purple.800",
  filled: "green.500",
};

const TextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  ITextareaProps
> = ({ label, icon: Icon, name, error = null, ...rest }, ref) => {
  const [variation, setVariation] = useState("default");
  const [value, setValue] = useState("");

  useEffect(() => {
    error && setVariation("error");
  }, [error]);

  const handleTextAreaFocus = useCallback(() => {
    !error && setVariation("focus");
  }, [error]);

  const handleTextAreaBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel color="gray.400">{label}</FormLabel>}
      <InputGroup flexDirection="column">
        {Icon && (
          <InputLeftElement
            children={<Icon />}
            color={inputVariation[variation]}
            mt="1"
          />
        )}
        <ChakraTextarea
          name={name}
          bg="gray.50"
          color={inputVariation[variation]}
          borderColor={inputVariation[variation]}
          onFocus={handleTextAreaFocus}
          onBlurCapture={handleTextAreaBlur}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          size="lg"
          h="50px"
          variant="outline"
          _hover={{ bgColor: "gray.100" }}
          _placeholder={{ color: "gray.300" }}
          _focus={{ bg: "gray.100" }}
          ref={ref}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage color="red.500">{error.message}</FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const TextArea = forwardRef(TextAreaBase);
