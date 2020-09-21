import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginModal from './LoginModal/LoginModal';
import Cards from './Cards/Cards';
import Pagination from './Pagination/Pagination';

import './App.scss';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);

  const toggleModalHandler = () => {
    setShow(prev => !prev)
  }

  const handleFavorite = (id) => {
    cards.map((item, i) => {
      if(item.id === id){
        const url = process.env.REACT_APP_API_URL;
        const newIds = cards.slice();
        const checkFavorite = newIds[i].favorite ? !newIds[i].favorite : true;

        axios.post(`${url}flats/${id}/${checkFavorite ? 'favorite' : 'unfavorite'}`);

        newIds[i].favorite = checkFavorite;
        setCards(newIds);
      }
    })
  }

  const fetchPosts = async (params) => {
    setLoading(true);
    params = {...{
      'page': params,
    }, ...params};
    const url = process.env.REACT_APP_API_URL;
    await axios.get(`${url}flats`, {params})
      .then((res) => {
        if (localStorage.getItem('Token')) {
          setIsLoggedIn(true);
        }
        setCards(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };
  
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if(token) {
      setAuthToken(token);
    }
    fetchPosts();
  }, []);

  const paginate = pageNumber => {
    fetchPosts(pageNumber)
    setCurrentPage(pageNumber);
    
  };

  const checkIsLoggedIn = (props) => {
    setShow(true);
    toggleModalHandler();
    setIsLoggedIn(props);
  };

  const logOut = async () => {
    const url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('Token');
    await axios.get(`${url}logout?token=${token}`);
    localStorage.removeItem('Token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <b>
          <p>Flats For Sale</p>
        </b>
        {
          isLoggedIn ? (
            <button onClick={logOut} className="logout-btn">Logout</button>
            ) : (
            <button onClick={toggleModalHandler} className="signin-btn">Sign In</button>
          )
        }
      </header>
      <div className="container">
        <Cards 
          cards={cards} 
          loading={loading}
          handleFavorite={handleFavorite}
          isLoggedIn={isLoggedIn}
        />
        <Pagination 
          cardsPerPage={cardsPerPage} 
          totalCards={total} 
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <LoginModal
        className="modal"
        show={show}
        close={toggleModalHandler}
        checkIsLoggedIn={checkIsLoggedIn}
      />
    </div>
  );
}

export default App;
