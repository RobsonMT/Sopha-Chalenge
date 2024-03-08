import { Container, ErrorMessage, InputContainer, InputLabel } from "./styles";
import { InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import { IconType } from "react-icons/lib";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register: any;
  name: string;
  error?: string | undefined;
  icon?: IconType;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: "var(--red)",
  default: "var(--grey)",
  focus: "var(--blue)",
  filled: "var(--green)",
};

const Input = ({
  label,
  register,
  name,
  error,
  icon: Icon,
  ...rest
}: InputProps) => {
  const [variation, setVariation] = useState("default");
  const [value, setValue] = useState("");

  const handleInputFocus = useCallback(() => {
    !error && setVariation("focus");
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  useEffect(() => {
    error && setVariation("error");
  }, [error]);

  return (
    <Container className="input_root">
      {!!label && <InputLabel>{label}</InputLabel>}
      <InputContainer variation={variation}>
        {Icon && <Icon color={inputVariation[variation]} />}
        <input
          {...register(name)}
          {...rest}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          onBlurCapture={handleInputBlur}
          onFocus={handleInputFocus}
          style={{
            color: `${inputVariation[variation]}`,
          }}
        />
      </InputContainer>
      <ErrorMessage>{!!error && <span>{error}</span>}</ErrorMessage>
    </Container>
  );
};

export default Input;
