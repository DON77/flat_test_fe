import React from 'react';
import Card from './Card/Card';
import logo from '../logo.svg';

const Cards = ({ cards, loading, handleFavorite, favorite, isLoggedIn }) => {
    if (loading) {
        return (
            <center>
                <img src={logo} className="App-logo" alt="logo" />
            </center>
        );
    }

    return (
        <ul className="cards">
            {cards.map(card => (
                <Card 
                    key={card.id}
                    handleFavorite={handleFavorite} 
                    data={card} 
                    isLoggedIn={isLoggedIn}
                />
            ))}
            
        </ul>
    )
}

export default Cards
