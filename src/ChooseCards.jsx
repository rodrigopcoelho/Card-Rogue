import React, { useState } from 'react';
import cards, { generateRandomDeck } from './cards';
import sword from './img/sword.png';
import heart from './img/heart.png';
import coin from './img/coin.png';


const ChooseCards = ({ onCardSelect, onStartCombat, playerGold, setPlayerGold, playerDeck, round }) => {
  const [selectedCards, setSelectedCards] = useState(playerDeck); 
  const [shopCards, setShopCards] = useState(generateRandomDeck(cards, 6));
  const [playerGoldInComponent, setPlayerGoldInComponent] = useState(playerGold);
  const [playerRound, setPlayerRound] = useState(round);

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

    setPlayerGoldInComponent(playerGoldInComponent + deletedCard.cost);
    setPlayerGold(playerGoldInComponent + deletedCard.cost);
  };

  const handleStartCombat = () => {
    onStartCombat();
  };

  return (
    <div>
      <div className='d-flex justify-content-center blue py-2'>
        <h2>The Shop</h2>
        </div>
      
        <div className='d-flex justify-content-center bege pt-3'>
        <div className='d-flex me-4'><h3 className='me-1'>Player's Gold: </h3><p>{playerGoldInComponent}</p></div>
        <div className='d-flex'><h3 className='me-1'>Player's Round: </h3><p>{playerRound}</p></div>
        </div>
     
      <div className="d-flex p-5 justify-content-center">
        {shopCards.map((card, index) => (
          <div key={index} onClick={() => handleCardSelect(card)} className="card" style={{ width: 12 + 'rem', marginRight: 1 + 'rem' }}>
            <img className='splashart card-img-top' src={card.art} alt={card.name} />
            <div className="card-body">
              <h3 className='cardname'>{card.name}</h3>
              <p className="cardability">{card.ability}</p>
              <div className='d-flex justify-content-between'>
              <div><img className='icon' src={sword} alt="attack "/> {card.attack}</div>
              <div><img className='icon' src={heart} alt="life "/> {card.life}</div>
              <div><img className='icon' src={coin} alt="coin "/> {card.cost}</div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
      <div>
      <div className='d-flex justify-content-center'>
        <h2>Your Cards</h2>
        </div>
        <div className="d-flex p-5 justify-content-center">
          {selectedCards.map((card, index) => (
            <div key={index} className="card" style={{ width: 12 + 'rem', marginRight: 1 + 'rem' }}>
            <img className='splashart card-img-top' src={card.art} alt={card.name} />
            <div className="card-body">
              <h3 className='cardname'>{card.name}</h3>
              <p className="cardability">{card.ability}</p>
              <div className='d-flex justify-content-between'>
              <div><img className='icon' src={sword} alt="attack "/> {card.attack}</div>
              <div><img className='icon' src={heart} alt="life "/> {card.life}</div>
              
              <div><button type="button" className="btn btn-success btn-sm"onClick={() => handleDeleteCard(index)}>Sell </button></div>
              </div>
            </div>
          </div>
          )).slice(0, 6)}
        </div>
      </div>
      <div className='d-flex p-3 justify-content-center'>
        <button type="button" className="btn btn-primary btn-lg" onClick={handleStartCombat}>Start Combat </button>
      </div>
    </div>
  );
};

export default ChooseCards;