// cards.js
const cards = [
    { name: 'Normal Cat', cost: 1, attack: 2, life: 1, art: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:'Gain +1 attack for each cat card in your deck.' },
    { name: 'Weird Fish', cost: 1, attack: 1, life: 2 , art: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=3112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:'When facing an enemy cat, do not attack. If the enemy is an insect, double your attack.'},
    { name: 'Traveler Beetle', cost: 1, attack: 1, life: 3 , art: 'https://images.unsplash.com/photo-1581859680484-a9fb0180a858?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"Recovers 1 health point per victory."},
    { name: 'Orange Cat', cost: 1, attack: 2, life: 2 , art: 'https://images.unsplash.com/photo-1604675223954-b1aabd668078?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"miau miau."},
    { name: 'Heretic Mantis', cost: 1, attack: 2, life: 3, art: 'https://images.unsplash.com/photo-1523151594509-9d2e49774fec?q=80&w=2924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"Recovers 1 health point per victory."},
    { name: 'City Pidgeon', cost: 1, attack: 1, life: 1 , art: 'https://images.unsplash.com/photo-1641958064293-d8cd4372ae95?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"bread?"},
    { name: 'Friendly Bird', cost: 1, attack: 1, life: 1 , art: 'https://images.unsplash.com/photo-1623719678037-84c54bfde8c8?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"Bestows +1 HP upon the card to the left."},
    { name: 'Icy Pidgeon', cost: 1, attack: 1, life: 2 , art: 'https://images.unsplash.com/photo-1548151002-9de85c595c1e?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"Freezes the opponent's highest attack card for 1 turn."},
    { name: 'LGBT Zebras', cost: 1, attack: 2, life: 2, art: 'https://images.unsplash.com/photo-1506352385411-112dd3a0d814?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"Doubles the attack of your lowest HP card."},
    { name: 'Blue Bird', cost: 1, attack: 1, life: 3 , art: 'https://images.unsplash.com/photo-1572402230267-f3e267c1e5a2?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"When this bird is defeated, the next ally gains +1 HP."},
    { name: 'Master Cat', cost: 1, attack: 1, life: 3 , art: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"Provides +1 attk to the card adjacent to your leftmost card."},
    { name: 'Hungry Bird', cost: 1, attack: 1, life: 1 , art: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"the attk doubles vs insects."},
    { name: 'Hummingbird', cost: 1, attack: 1, life: 3 , art: 'https://images.unsplash.com/photo-1553736277-055142d018f0?q=80&w=3158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"Your rightmost card gains +1 HP."},
    { name: 'worm', cost: 1, attack: 1, life: 1 , art: 'https://images.unsplash.com/photo-1598431429388-c561cb614d2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ability:"Upon defeat, grants +1 Attack to the adjacent ally."}
    // ... Add more cards
  ];
  
  const generateRandomDeck = (cards, numCards) => {
    const shuffledCards = [...cards].sort(() => 0.5 - Math.random());
    return shuffledCards.slice(0, numCards);
  };
  
  export default cards;
  export { generateRandomDeck };