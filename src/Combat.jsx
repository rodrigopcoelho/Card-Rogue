import React, { useEffect, useState } from 'react';
import sword from './img/sword.png';
import heart from './img/heart.png';
import Navbar from './components/Navbar';
import Cards from './components/Cards';

const Combat = ({ playerDeck, enemyDeck, shop, playerGold, round, updateRound, updateGold ,handleLife, life}) => {
  const [winner, setWinner] = useState(null);
  const [playerGoldInComponent, setPlayerGoldInComponent] = useState(playerGold);
  const [userDeckCopy, setUserDeckCopy] = useState(JSON.parse(JSON.stringify(playerDeck)));
  const [enemyDeckCopy, setEnemyDeckCopy] = useState(JSON.parse(JSON.stringify(enemyDeck)));
  const [playerRound, setPlayerRound] = useState(round);

  const handleshop = () => {
    let newRound = playerRound + 1;
    setPlayerRound(newRound);
    updateRound(newRound); 
    shop(playerDeck);
  };

  useEffect(() => {
    const battle = (userDeck, enemyDeck) => {
      let userDeckCopy = JSON.parse(JSON.stringify(userDeck));
      let enemyDeckCopy = JSON.parse(JSON.stringify(enemyDeck));

      let userIndex = 0;
      let enemyIndex = 0;

      while (userIndex < userDeckCopy.length && enemyIndex < enemyDeckCopy.length) {
        let userCard = userDeckCopy[userIndex];
        let enemyCard = enemyDeckCopy[enemyIndex];

        // Simulate the battle
        let userCardLifeAfterAttack = userCard.life - enemyCard.attack;
        let enemyCardLifeAfterAttack = enemyCard.life - userCard.attack;

        // Check if any card is defeated
        if (userCardLifeAfterAttack <= 0) {
          userCard.life = 0;
          userIndex++;
        } else {
          userCard.life = userCardLifeAfterAttack;
        }
        if (enemyCardLifeAfterAttack <= 0) {
          enemyCard.life = 0;
          enemyIndex++;
        } else {
          enemyCard.life = enemyCardLifeAfterAttack;
        }
      }

      setUserDeckCopy(userDeckCopy);
      setEnemyDeckCopy(enemyDeckCopy);

      // Determine the winner
      let result;
      if (userIndex >= userDeckCopy.length) {
        result = 'Enemy wins';
      } else if (enemyIndex >= enemyDeckCopy.length) {
        result = 'User wins';
      } else {
        result = 'Draw';
      }

      // Update gold based on the result
      if (result === 'User wins') {
        let moregold = playerGoldInComponent + 3;
        updateGold(moregold); 
      } else if (result === 'Draw') {
        let moregold = playerGoldInComponent + 2;
        updateGold(moregold); 
      } else {
        let moregold = playerGoldInComponent + 1;
        updateGold(moregold); 
      }
      
      return result;
    }

    setWinner(battle(playerDeck, enemyDeck));
  }, [playerDeck, enemyDeck]);


  return (
    <div>
       <Navbar life={life} gold={playerGoldInComponent} stage={1} round={playerRound} text={"COMBAT"}></Navbar>
      <div className="d-flex p-5 justify-content-center">
      {enemyDeckCopy.map((card, index) => (
         <Cards key={index}  attk={card.attack} name={card.name} hp={card.life} ability={card.ability} splashArt={card.art} />
      ))}</div>
      <div className="d-flex p-5 justify-content-center">
      {userDeckCopy.map((card, index) => (
        <Cards key={index}  attk={card.attack} name={card.name} hp={card.life} ability={card.ability} splashArt={card.art} />
      ))}</div>
<div className={`d-flex justify-content-center ${winner === 'User wins' ? 'green' : 'red'}`}> 
  {winner && <h2 className='pt-2'>{winner}</h2>}
</div>
      <div className='d-flex justify-content-center mt-3'> 
      <button type="button" class="btn btn-secondary " onClick={handleshop}>Next Round</button>
      </div>
    </div>
  );
};

export default Combat;