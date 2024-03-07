// cards.js
const cards = [
    { name: 'Card 1', cost: 2, attack: 2, life: 3 },
    { name: 'Card 2', cost: 3, attack: 3, life: 2 },
    { name: 'Card 3', cost: 3, attack: 3, life: 2 },
    { name: 'Card 4', cost: 3, attack: 3, life: 2 },
    { name: 'Card 5', cost: 3, attack: 3, life: 2 },
    { name: 'Card 6', cost: 3, attack: 3, life: 2 },
    { name: 'Card 7', cost: 3, attack: 3, life: 2 },
    // ... Add more cards
  ];
  
  const generateRandomDeck = (cards, numCards) => {
    const shuffledCards = [...cards].sort(() => 0.5 - Math.random());
    return shuffledCards.slice(0, numCards);
  };
  
  export default cards;
  export { generateRandomDeck };