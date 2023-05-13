import React, { useEffect, useState } from 'react';
import Board from './Board';
import styled from 'styled-components';
import Button from '../components/Button/Button';

interface BingoProps {
    buzzwords: Array<string>,
    numrows: number,
    numcols: number,
}

const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to left, var(--color-primary), var(--color-background));
`;

const Header = styled.h1`
  font-size: var(--font-size-mega);
  text-align: center;

  @media (min-width:320px) and (max-width: 641px) {
    font-size: var(--font-size-xl);
  }
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        margin-top: 20px;
    }
`;

const Bingo: React.FC<BingoProps> = ({
    buzzwords,
    numrows,
    numcols,
}) => {
    const [markedCells, setMarkedCells] = useState<boolean[]>(new Array(25).fill(false));
    const handleCellClick = (index: number) => {
        if (markedCells[index]) return;

        setMarkedCells(prev => [...prev.slice(0, index), true, ...prev.slice(index + 1)]);
    };

    const handleReset = () => {
        const centerIndex = Math.floor(markedCells.length / 2);
        const newMarkedCells = markedCells.map((cell, index) => (index === centerIndex ? true : false));
        setMarkedCells(newMarkedCells);
    }

    useEffect(() => {
        setMarkedCells((prevMarkedCells) => {
            const newMarkedCells = [...prevMarkedCells];
            const centerCellIndex = Math.floor((numrows * numcols) / 2);
            newMarkedCells[centerCellIndex] = true;
            return newMarkedCells;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <MainContainer>
            <Header>
                Bingo
            </Header>
            <BoardContainer>
                <Board
                    buzzwords={buzzwords}
                    markedCells={markedCells}
                    handleCellClick={handleCellClick}
                    numcols={numcols}
                    numrows={numrows}
                />
                <Button onClick={handleReset}>Reset</Button>
            </BoardContainer>
        </MainContainer>
    );
};


export default Bingo;