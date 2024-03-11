import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Cards from './components/Cards';

const Combat = ({ playerDeck, enemyDeck, shop, playerGold, round, updateRound, updateGold, handleLife, life }) => {
  const [winner, setWinner] = useState(null);
  const [playerLife, setPlayerLife] = useState(life);
  const [playerGoldInComponent, setPlayerGoldInComponent] = useState(playerGold);
  const [userDeckCopy, setUserDeckCopy] = useState(JSON.parse(JSON.stringify(playerDeck)));
  const [enemyDeckCopy, setEnemyDeckCopy] = useState(JSON.parse(JSON.stringify(enemyDeck)));
  const [playerRound, setPlayerRound] = useState(round);
  const [animatedCards, setAnimatedCards] = useState([]);

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

        // Trigger card animations
        const animatedCard = {
          userCard,
          enemyCard,
          userWins: userCardLifeAfterAttack > 0 && enemyCardLifeAfterAttack <= 0,
        };
        setAnimatedCards((prevAnimatedCards) => [...prevAnimatedCards, animatedCard]);
      }

      setUserDeckCopy(userDeckCopy);
      setEnemyDeckCopy(enemyDeckCopy);

      // Determine the winner
      let result;
      if (userIndex >= userDeckCopy.length) {
        result = 'LOST';
      } else if (enemyIndex >= enemyDeckCopy.length) {
        result = 'WIN';
      } else {
        result = 'DRAW';
      }

      // Update gold based on the result
      if (result === 'WIN') {
        let moregold = playerGoldInComponent + 3;
        updateGold(moregold);
      } else if (result === 'DRAW') {
        let moregold = playerGoldInComponent + 2;
        updateGold(moregold);
      } else {
        let moregold = playerGoldInComponent + 1;
        updateGold(moregold);
      }

      // Deduct life points if the user lost
      if (result === 'LOST') {
        let enemyCardsAlive = enemyDeckCopy.filter((card) => card.life > 0).length;
        let lifeDeduction = calculateLifeDeduction(enemyCardsAlive, playerRound);
        let newLife = playerLife - lifeDeduction;
        setPlayerLife(newLife);
        handleLife(newLife);
      }

      return result;
    };

    setWinner(battle(playerDeck, enemyDeck));
  }, [playerDeck, enemyDeck]);

  const calculateLifeDeduction = (enemyCardsAlive, round) => {
    let baseDeduction = enemyCardsAlive * 2;
    let stageDeduction = 0;

    if (round >= 2) {
      stageDeduction = 3;
    }
    if (round >= 4) {
      stageDeduction = 5;
    }
    if (round >= 6) {
      stageDeduction = 9;
    }

    return baseDeduction + stageDeduction;
  };

  return (
    <div>
      <Navbar life={playerLife} gold={playerGoldInComponent} stage={1} round={playerRound} text={"COMBAT"}></Navbar>
      <div className="d-flex p-5 justify-content-start">
        {enemyDeckCopy.map((card, index) => (
          <Cards
            key={index}
            attk={card.attack}
            name={card.name}
            hp={card.life}
            ability={card.ability}
            splashArt={card.art}
            animationClass={
              animatedCards.find((animatedCard) => animatedCard.enemyCard === card)
                ? animatedCards.find((animatedCard) => animatedCard.enemyCard === card).userWins
                  ? 'lose-animation'
                  : 'attack-animation'
                : ''
            }
          />
        ))}
      </div>
      <div className="d-flex p-5 justify-content-start">
        {userDeckCopy.map((card, index) => (
          <Cards
            key={index}
            attk={card.attack}
            name={card.name}
            hp={card.life}
            ability={card.ability}
            splashArt={card.art}
            animationClass={
              animatedCards.find((animatedCard) => animatedCard.userCard === card)
                ? animatedCards.find((animatedCard) => animatedCard.userCard === card).userWins
                  ? 'win-animation'
                  : 'attack-animation'
                : ''
            }
          />
        ))}

      </div>

      <div className={`d-flex justify-content-center result-square ${winner === 'WIN' ? 'green' : 'red'}`}>
        {winner && <h2 className='align-self-center sell-title'>{winner}</h2>}
      </div>

      <div className='d-flex justify-content-center btn-square'>
        <h2 className="align-self-center sell-title" onClick={handleshop}>Next</h2>
      </div>
    </div>
  );
};

export default Combat;