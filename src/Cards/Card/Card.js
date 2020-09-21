import React from 'react';
import './Card.scss';

const Card = ({handleFavorite, data, isLoggedIn}) => {
    const { id, favorite } = data;
    const { first_name, last_name, middle_name, type } = data.relationships;
    const { title, unit, rooms, area } = data.attributes;
    return (
      <li className="card">
        <div className="card-header">
          <div className="avatar">
            {
              first_name.charAt(0) + last_name.charAt(0)
            }
          </div>
          <div className="header-content">
            <p>
              {
                `${first_name} ${middle_name} ${last_name}`
              }
            </p>
            <p className="personType">Type: {type}</p>
            <p>ID: {id}</p>
          </div>
        </div>
        <div className="card-content">
          <p className="typeOfHouse">{data.type}</p>
          <p>{title}</p>
          <p>{`rooms: ${rooms}`}</p>
          <p>{`area: ${area} ${unit}`}</p>
        </div>
        <div className="card-actions">
          {isLoggedIn &&
            <button 
                className="ButtonBase-root IconButton-root" 
                type="button" 
                aria-label="add to favorites" 
                onClick={() => handleFavorite(id)}
                name="4"
            >
              <span className="IconButton-label">
                <svg className={`${favorite ? 'favorite' : 'unfavorite'} SvgIcon-root`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
                </span>
                <span className="TouchRipple-root"></span>
            </button>
          }
        </div>
      </li> 
    );
};

export default Card;
