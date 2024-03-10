import React, { useState } from 'react';
import cards, { generateRandomDeck } from './cards';
import Navbar from './components/Navbar';
import Cards from './components/Cards';



const ChooseCards = ({ onCardSelect, onStartCombat, playerGold, setPlayerGold, playerDeck, round, shop, life }) => {
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
    shop(updatedCards)
    setPlayerGoldInComponent(playerGoldInComponent + deletedCard.cost);
    setPlayerGold(playerGoldInComponent + deletedCard.cost);
  };

  const handleStartCombat = () => {
    onStartCombat();
  };

  return (
    <div>
      <Navbar life={life} gold={playerGoldInComponent} stage={1} round={playerRound} text={"SHOP"}></Navbar>
      <div className="d-flex p-5 justify-content-center">
        {selectedCards.map((card, index) => (
          <Cards attk={card.attack} name={card.name} hp={card.life} ability={card.ability} splashArt={card.art}/>
        ))}
      </div>

      <div className="d-flex p-5 justify-content-center">
        {shopCards.map((card, index) => (
          <Cards attk={card.attack} name={card.name} hp={card.life} ability={card.ability} splashArt={card.art}/>
        ))}
      </div>
     
    </div>
  );
};

export default ChooseCards;