import React from 'react';

const Cards = ({ attk , name, hp, ability, splashArt}) => {
    return (
        <div className='big-card' style={{backgroundImage: `url(${splashArt})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}>
            <div className='d-flex justify-content-center'>
               
                <div className='d-flex justify-content-between card-header'>
                    <div className='attk-square d-flex justify-content-center'><h2>{attk}</h2></div>
                    <h1 className='name-card d-flex align-self-center'>{name}</h1>
                    <div className='hp-square d-flex justify-content-center'><h2>{hp}</h2></div>
                </div>
            </div>
        </div>
    );
};

export default Cards;