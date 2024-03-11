import React, { useState } from 'react';
import cards, { generateRandomDeck } from './cards';
import Navbar from './components/Navbar';
import Cards from './components/Cards';

const ChooseCards = ({ onCardSelect, onStartCombat, playerGold, setPlayerGold, playerDeck, round, shop, life }) => {
  const [selectedCards, setSelectedCards] = useState(playerDeck);
  const [shopCards, setShopCards] = useState(generateRandomDeck(cards, 6));
  const [playerGoldInComponent, setPlayerGoldInComponent] = useState(playerGold);
  const [playerRound, setPlayerRound] = useState(round);
  const [isDragging, setIsDragging] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

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
    shop(updatedCards);
    setPlayerGoldInComponent(playerGoldInComponent + deletedCard.cost);
    setPlayerGold(playerGoldInComponent + deletedCard.cost);
  };

  const handleStartCombat = () => {
    onStartCombat();
  };

  const handleDragStart = (e, card) => {
    setIsDragging(true);
    setCurrentCard(card);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setCurrentCard(null);
    handleDeleteCard();
  };

  return (
    <div>
      <Navbar life={life} gold={playerGoldInComponent} stage={1} round={playerRound} text={"SHOP"}></Navbar>

      <div className="d-flex mt-5 ms-3 justify-content-center">
        {shopCards.map((card, index) => (
          <Cards key={index} onClick={() => handleCardSelect(card)} attk={card.attack} name={card.name} hp={card.life} ability={card.ability} splashArt={card.art} />
        ))}
      </div>

      <div className="d-flex p-5 justify-content-center ms-3">
        {selectedCards.map((card, index) => (
          <Cards
            draggable={true}
            key={index}
            attk={card.attack}
            name={card.name}
            hp={card.life}
            ability={card.ability}
            splashArt={card.art}
            index={index}
            onDragStart={(e) => handleDragStart(e, card)}
          />
        ))}
      </div>
      <div
        className='sell-square d-flex justify-content-center'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h1 className='align-self-center sell-title'>SELL</h1>
      </div>
      <div className='fight-square d-flex justify-content-center' onClick={handleStartCombat}>
        <h1 className='align-self-center sell-title'>GO</h1>
      </div>
    </div>
  );
};

export default ChooseCards;