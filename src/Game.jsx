import React, { useState } from 'react';
import ChooseCards from './ChooseCards';
import Combat from './Combat';
import cards, { generateRandomDeck } from './cards';

const Game = () => {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [enemyDeck, setEnemyDeck] = useState([]);
  const [gameState, setGameState] = useState('chooseCards');
  const [playerGold, setPlayerGold] = useState(4); // Initialize player's gold

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
          <ChooseCards
            cards={cards}
            onCardSelect={handleCardSelection}
            onStartCombat={startCombat}
            playerGold={playerGold}
            setPlayerGold={setPlayerGold}
          />
        );
      case 'combat':
        return <Combat playerDeck={playerDeck} enemyDeck={enemyDeck} playerGold={playerGold} />;
      default:
        return null;
    };
    
  };

  return <div>{renderGameState()}</div>;
};

export default Game;