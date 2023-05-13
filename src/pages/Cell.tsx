import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import bingoSound from '../assets/sounds/bingo.mp3';

interface CellProps {
    value: string;
    ismarked: boolean;
    ishighlighted: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
    ref?: HTMLInputElement;
    setIsBingo: any;
}

const CellContainer = styled.div<{ ismarked: boolean; ishighlighted: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.ismarked ? 'var(--color-primary)' : 'var(--color-secondary)')};
  color: ${(props) => (props.ismarked ? 'var(--color-background)' : 'var(--color-text)')};
  font-weight: bold;
  font-size: var(--font-size-medium);
  width: 100px;
  height: 100px;
  cursor: pointer;
  border: 1px solid var(--color-text);
  overflow: hidden;

  @media (min-width:320px) and (max-width: 641px) {
    font-size: var(--font-size-small);
    width: 72px;
    height: 72px;
  }

  ${(props) =>
        props.ishighlighted &&
        css`
      background-color: var(--color-text);
      border: 1px solid var(--color-primary);
    `}
`;

const BuzzwordCell: React.FC<CellProps> = ({
    value,
    ismarked,
    ishighlighted,
    onClick,
    setIsBingo
}) => {
    useEffect(() => {
        if (ismarked && ishighlighted) {
            const audio = new Audio(bingoSound);
            audio.play();
            setIsBingo(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ismarked, ishighlighted])

    return (
        <CellContainer
            ismarked={ismarked}
            ishighlighted={ishighlighted}
            onClick={onClick}
        >
            {value}
        </CellContainer>
    );
};

export default BuzzwordCell;
