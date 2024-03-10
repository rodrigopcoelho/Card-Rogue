import React, { useState } from 'react';
import ChooseCards from './ChooseCards';
import Combat from './Combat';
import cards, { generateRandomDeck } from './cards';


const Game = () => {
  const [life, setLife] = useState(100); 
  const [playerDeck, setPlayerDeck] = useState([]);
  const [enemyDeck, setEnemyDeck] = useState([]);
  const [gameState, setGameState] = useState('chooseCards');
  const [playerGold, setPlayerGold] = useState(4); 
  const [round, setRound] = useState(1); 
  const [stage, setStage] = useState(1); 

  const handleRound = (newRound) => {
    if (newRound > 7) {
      setStage(stage + 1); // Increase stage by 1
      setRound(1); // Reset round to 1
    } else {
      setRound(newRound);
    }
  };

  const handleLife= (lessLife) => {
    setLife(lessLife);
  };

  const handleGold= (moreGold) => {
    setPlayerGold(moreGold);
  };

  const handleUserDeck = (newDeck) => {
    setPlayerDeck(newDeck); 
    setGameState('chooseCards');
  };

  const handleCardSelection = (card) => {
    setPlayerDeck([...playerDeck, card]);
  };



  const startCombat = () => {
    const enemyCards = generateRandomDeck(cards, 6);
    setEnemyDeck(enemyCards);
    setGameState('combat');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'chooseCards':
        return (
          <ChooseCards cards={cards} round={round} life={life} stage={stage} playerDeck={playerDeck} shop={handleUserDeck} onCardSelect={handleCardSelection} onStartCombat={startCombat} playerGold={playerGold} setPlayerGold={setPlayerGold}/>
        );
      case 'combat':
        return <Combat  updateRound={handleRound} stage={stage} updateGold={handleGold} handleLife={handleLife} life={life}  playerDeck={playerDeck} round={round} enemyDeck={enemyDeck} playerGold={playerGold} shop={handleUserDeck}/>;
      default:
        return null;
    };
    
  };

  return <div>{renderGameState()}</div>;
};

export default Game;