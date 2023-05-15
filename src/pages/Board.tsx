import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import Image from '../components/Image/Image';
import BingoCelebration from '../assets/images/bingo.png';

type BoardProps = {
  buzzwords: string[];
  markedCells: boolean[];
  handleCellClick: (index: number) => void;
  numcols: number;
  numrows: number;
};

const Grid = styled.div<{ numcols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.numcols}, 1fr);
  margin: 0 auto;
  text-align: center;
`;

const Overlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-opacility-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  ${(props) =>
    !props.show &&
    `
    display: none;
  `}
`;

const CongratsMessage = styled.h2`
  color: var(--color-background);
  font-size: var(--font-size-mega);
  text-align: center;
`;

const Board: React.FC<BoardProps> = ({ numcols, numrows, buzzwords, markedCells, handleCellClick }) => {
  const [isBingo, setIsBingo] = useState(false);
  const isCenter = (row: number, col: number): boolean => row === Math.floor(numrows / 2) && col === Math.floor(numcols / 2);

  const isLeftDiagonal = (row: number, col: number): boolean => row === col;

  const isRightDiagonal = (row: number, col: number): boolean => row + col === numcols - 1;

  const isRowChecked = (row: number): boolean => Array.from({ length: numcols }, (_, col) => markedCells[row * numcols + col]).every(Boolean);

  const isColChecked = (col: number): boolean => Array.from({ length: numrows }, (_, row) => markedCells[row * numcols + col]).every(Boolean);

  const isDiagonalChecked = (row: number, col: number): boolean => {
    if (isCenter(row, col)) return false;

    if (isLeftDiagonal(row, col)) return Array.from({ length: numrows }, (_, i) => markedCells[i * numcols + i]).every(Boolean);

    if (isRightDiagonal(row, col)) return Array.from({ length: numrows }, (_, i) => markedCells[i * numcols + (numcols - 1 - i)]).every(Boolean);

    return false;
  };

  useEffect(() => {
    if (isBingo) {
      const timer = setTimeout(() => {
        setIsBingo(false);
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [isBingo]);

  return (
    <>
      <Grid numcols={numcols}>
        {buzzwords.map((buzzword, index) => {
          const row = Math.floor(index / numcols);
          const col = index % numcols;
          const ishighlighted = isRowChecked(row) || isColChecked(col) || isDiagonalChecked(row, col);

          return (
            <Cell
              key={index}
              value={buzzword}
              ismarked={markedCells[index]}
              ishighlighted={ishighlighted}
              onClick={() => handleCellClick(index)}
              setIsBingo={setIsBingo}
            />
          );
        })}
      </Grid>
      <Overlay show={isBingo}>
        <CongratsMessage>
          <Image alt='bingo-celebration' src={BingoCelebration} width={220} height={220} />
        </CongratsMessage>
      </Overlay>
    </>
  );
};

export default Board;

