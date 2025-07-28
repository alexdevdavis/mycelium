import { ReactEventHandler } from "react";

interface ButtonProps {
  buttonText: string;
  className?: string;
  clickHandler: ReactEventHandler;
}

export const Button = ({
  buttonText,
  className,
  clickHandler,
}: ButtonProps) => {
  return (
    <button className={className} onClick={clickHandler}>
      {buttonText}
    </button>
  );
};
