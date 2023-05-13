import React, { useMemo } from 'react';
import Bingo from './pages/Bingo';

import { buzzwordsData } from './data/data';

const numcols = 5;
const numrows = 5;
const FREE_TEXT = "Free";

const App: React.FC = () => {
  // Memoizing to reduce re-rendering
  const data = useMemo(() => {
    const copyOfBuzzwordsData = [...buzzwordsData];
    const middleIndex = Math.floor(copyOfBuzzwordsData.length / 2);
    // Inserting the text Free in between the grid
    copyOfBuzzwordsData.splice(middleIndex, 0, FREE_TEXT);

    return copyOfBuzzwordsData;
  }, []);

  return (
    <div className="App">
      <Bingo buzzwords={data} numcols={numcols} numrows={numrows} />
    </div>
  );
};

export default App;
