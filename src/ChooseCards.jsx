import React, { useState } from 'react';
import cards, { generateRandomDeck } from './cards';
import Navbar from './components/Navbar';



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
    </div>
  );
};

export default ChooseCards;