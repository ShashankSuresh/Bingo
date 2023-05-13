import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
};

const ButtonStyled = styled.button`
  background-color: var(--color-primary);
  color: var(--color-background);
  border: none;
  padding: 10px 20px;
  font-size: var(--font-size-medium);
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-tertiary);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <ButtonStyled onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
