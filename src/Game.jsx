import React, { useState } from 'react';
import cards from './cards';

const generateRandomDeck = (cards, numCards) => {
  const shuffledCards = [...cards].sort(() => 0.5 - Math.random());
  return shuffledCards.slice(0, numCards);
};


// Game component
const Game = () => {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [enemyDeck, setEnemyDeck] = useState([]);
  const [gameState, setGameState] = useState('chooseCards');

  const handleCardSelection = (card) => {
    // Add card to player's deck
    setPlayerDeck([...playerDeck, card]);
  };


  const startCombat = () => {
    // Generate enemy's deck randomly
    const enemyCards = generateRandomDeck();
    setEnemyDeck(enemyCards);
    setGameState('combat');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'chooseCards':
        return <ChooseCards cards={cards} onCardSelect={handleCardSelection} onStartCombat={startCombat} />;
      case 'combat':
        return <Combat playerDeck={playerDeck} enemyDeck={enemyDeck} />;
      default:
        return null;
    }
  };

  return <div>{renderGameState()}</div>;
};

// ChooseCards component
const ChooseCards = ({ cards, onCardSelect, onStartCombat }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardSelect = (card) => {
    if (selectedCards.length < 6) {
      setSelectedCards([...selectedCards, card]);
      onCardSelect(card);
    }
  };

  const handleDeleteCard = (index) => {
    const updatedCards = [...selectedCards];
    updatedCards.splice(index, 1);
    setSelectedCards(updatedCards);
  };

  const handleStartCombat = () => {
    onStartCombat();
  };


  return (
    <div>
      <div className='p-2'>
      <h2>The Shop</h2>
    </div>
    <div className="d-flex p-5 justify-content-center">
      {cards.map((card, index) => (
        <div key={index} onClick={() => handleCardSelect(card)} className="card" style={{width: 12 + 'rem', marginRight: 1 + 'rem'}} >
        <div className="card-body">
        <h3>{card.name}</h3>
          <p>Cost: {card.cost}</p>
          <p>Attack: {card.attack}</p>
          <p>Life: {card.life}</p>
          <p className="card-text">Some quick example text.</p>
        </div>
      </div>
      ))}
    </div>
    <div >
      <h3>Your Cards:</h3>
      <div className="d-flex p-5 justify-content-center">
      {selectedCards.map((card, index) => (
        <div key={index} className="card" style={{width: 12 + 'rem', marginRight: 1 + 'rem'}}>
           <div className="card-body">
        <h3>{card.name}</h3>
          <p>Cost: {card.cost}</p>
          <p>Attack: {card.attack}</p>
          <p>Life: {card.life}</p>
          <p className="card-text">Some quick example text .</p>
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteCard(index)}>Delete</button>
        </div>
        </div>
        
      )).slice(0, 6)}</div>
    </div>
    <div className='d-flex p-3 justify-content-center'>
      <button type="button" className="btn btn-primary btn-lg" onClick={handleStartCombat} >Start Combat</button>
    </div>
  </div>
  );
};

// Combat component
const Combat = ({ playerDeck, enemyDeck }) => {
  // Component logic to display cards and handle combat
  // ...

  return (
    <div>
      {/* Display player's deck */}
      {/* Display enemy's deck */}
      {/* Display combat result */}
    </div>
  );
};

export default Game;