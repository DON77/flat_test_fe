import React, {useState} from 'react';
import axios from 'axios';

import logo from '../logo.svg';
import './LoginModal.scss';

const LoginModal = ({show, close, checkIsLoggedIn}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errors: {
          email: '',
          password: '',
        }
    });
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const {  errors } = formData;

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        
        return valid;
    }


  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = formData.errors;

    switch (name) {
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoad(true);
    if(validateForm(formData.errors)) {
      const url = process.env.REACT_APP_API_URL;
      axios({
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
        url: `${url}login`,
        data: {
          email: formData.email,
          password: formData.password,
        }
      })
      .then(res => {
        checkIsLoggedIn(true);
        const { token } = res.data;
        localStorage.setItem("Token", token);
        setLoad(false);
        setError(true);
      })
      .catch(err => {
          checkIsLoggedIn(false);
          setError(true);
          setLoad(false);
        });
    }else{
      setLoad(false);
      console.error('Invalid Form');
    }
  }
    return (
        <div className="modal" style={{
            display: show && 'flex'
        }}>
            <div 
                className="modal-wrapper"
                style={{
                    transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}
            >
                <div className="modal-header">
                    <h2>Sign In</h2>
                    <span className="close-modal-btn" onClick={close}>×</span>
                </div>
                <div className="modal-body">
                    <div className='wrapper'>
                        <div className='form-wrapper'>
                        <form onSubmit={handleSubmit}>
                            {
                              error && 
                                <center>
                                  <p>
                                    something was wrong please try again
                                  </p>
                                </center>
                            }
                            <div className='email'>
                                <label htmlFor="email">Email</label>
                                <input 
                                  type='email' 
                                  name='email' 
                                  onChange={handleChange} 
                                  required
                                />
                                {errors.email.length > 0 && 
                                    <span className='error'>{errors.email}</span>
                                }
                            </div>
                            <div className='password'>
                                <label htmlFor="password">Password</label>
                                <input 
                                  type='password' 
                                  name='password' 
                                  onChange={handleChange} 
                                  required
                                />
                                {errors.password.length > 0 && 
                                    <span className='error'>{errors.password}</span>
                                }
                            </div>
                            <div className='submit'>
                                <button className="button">Sign In</button>
                            </div>
                        </form>
                        </div>
                        {
                          load &&
                            <div className="loader">
                                <img src={logo} className="App-logo" alt="logo" />
                            </div>
                        }
                    </div>
                </div>
                <div className="modal-footer">
                </div>
            </div>
        </div>
    )
}

export default LoginModal;


