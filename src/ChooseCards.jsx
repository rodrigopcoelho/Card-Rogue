import React, { useState } from 'react';
import cards, { generateRandomDeck } from './cards';

const ChooseCards = ({ onCardSelect, onStartCombat, playerGold, setPlayerGold }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [shopCards, setShopCards] = useState(generateRandomDeck(cards, 6));
  const [playerGoldInComponent, setPlayerGoldInComponent] = useState(playerGold);

  const handleCardSelect = (card) => {
    if (selectedCards.length < 6 && playerGoldInComponent >= card.cost) {
      setSelectedCards([...selectedCards, card]);
      onCardSelect(card);
      setShopCards(shopCards.filter(c => c !== card));
      setPlayerGoldInComponent(playerGoldInComponent - card.cost);
      setPlayerGold(playerGoldInComponent - card.cost);
    }
  };

  const handleDeleteCard = (index) => {
    const updatedCards = [...selectedCards];
    const deletedCard = updatedCards.splice(index, 1)[0];
    setSelectedCards(updatedCards);
    setShopCards([...shopCards, deletedCard]);
    setPlayerGoldInComponent(playerGoldInComponent + deletedCard.cost);
    setPlayerGold(playerGoldInComponent + deletedCard.cost);
  };

  const handleStartCombat = () => {
    onStartCombat();
  };

  return (
    <div>
      <div className='p-2'>
        <h2>The Shop</h2>
        <p>Player's Gold: {playerGoldInComponent}</p>
      </div>
      <div className="d-flex p-5 justify-content-center">
        {shopCards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardSelect(card)}
            className="card"
            style={{ width: 12 + 'rem', marginRight: 1 + 'rem' }}
          >
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
      <div>
        <h3>Your Cards:</h3>
        <div className="d-flex p-5 justify-content-center">
          {selectedCards.map((card, index) => (
            <div key={index} className="card" style={{ width: 12 + 'rem', marginRight: 1 + 'rem' }}>
              <div className="card-body">
                <h3>{card.name}</h3>
                <p>Cost: {card.cost}</p>
                <p>Attack: {card.attack}</p>
                <p>Life: {card.life}</p>
                <p className="card-text">Some quick example text .</p>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteCard(index)}>
                  Delete
                </button>
              </div>
            </div>
          )).slice(0, 6)}
        </div>
      </div>
      <div className='d-flex p-3 justify-content-center'>
        <button type="button" className="btn btn-primary btn-lg" onClick={handleStartCombat}>
          Start Combat
        </button>
      </div>
    </div>
  );
};

export default ChooseCards;