import React from 'react';

const Cards = ({
  attk,
  name,
  hp,
  ability,
  splashArt,
  onClick,
  index,
  draggable,
  onDragStart,
}) => {
  return (
    <div
      className="big-card"
      onClick={() => onClick && onClick(index)}
      style={{
        backgroundImage: `url(${splashArt})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-between card-header">
          <div className="attk-square d-flex justify-content-center">
            <h2>{attk}</h2>
          </div>
          <h1 className="name-card d-flex align-self-center">{name}</h1>
          <div className="hp-square d-flex justify-content-center">
            <h2>{hp}</h2>
          </div>
        </div>
      </div>
      <div className="ability-text p-2">
        <p className="text-p">{ability}</p>
      </div>
    </div>
  );
};

export default Cards;