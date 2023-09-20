/* eslint-disable react/prop-types */
import { useState } from "react";

function Squere({ value, onSquereClick }) {
  return (
    <button className="squere" onClick={onSquereClick}>
      {value}
    </button>
  );
}

function Board({ isX, squeres, onPlay }) {
  function handleClick(i) {
    if (squeres[i] || whoWin(squeres)) return;
    const nextSquere = squeres.slice();

    nextSquere[i] = isX ? "X" : "0";

    onPlay(nextSquere);
  }

  const winner = whoWin(squeres);
  // console.log(winner);
  let status = "";
  status = winner ? "Winner : " + winner : "Next player : " + (isX ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Squere value={squeres[0]} onSquereClick={() => handleClick(0)} />
        <Squere value={squeres[1]} onSquereClick={() => handleClick(1)} />
        <Squere value={squeres[2]} onSquereClick={() => handleClick(2)} />
        <Squere value={squeres[3]} onSquereClick={() => handleClick(3)} />
        <Squere value={squeres[4]} onSquereClick={() => handleClick(4)} />
        <Squere value={squeres[5]} onSquereClick={() => handleClick(5)} />
        <Squere value={squeres[6]} onSquereClick={() => handleClick(6)} />
        <Squere value={squeres[7]} onSquereClick={() => handleClick(7)} />
        <Squere value={squeres[8]} onSquereClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function App() {
  const [isX, setIsX] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentTravel, setCurrentTravel] = useState(0);
  const currentSquere = history[currentTravel];

  function travelTo(nextTravel) {
    setCurrentTravel(nextTravel);
    setIsX(nextTravel % 2 === 0);
  }

  function handlePlay(nextSqueres) {
    const nextHistory = [...history.slice(0, currentTravel + 1), nextSqueres];
    setHistory(nextHistory);
    setCurrentTravel(nextHistory.length - 1);
    setIsX(!isX);
  }

  const travels = history.map((squeres, travel) => {
    let description = "";
    if (travel > 0) {
      description = "Travel To " + travel;
    } else {
      description = "Travel To Start";
    }

    return (
      <li key={travel}>
        <button className="btn-his" onClick={() => travelTo(travel)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isX={isX} squeres={currentSquere} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{travels}</ol>
      </div>
    </div>
  );
}

function whoWin(squeres) {
  const lines = [
    // Horizontal Win
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertikal Win
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal Win
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squeres[a] && squeres[a] === squeres[b] && squeres[c]) {
      return squeres[a];
    }
  }
  return false;
}

export default App;
