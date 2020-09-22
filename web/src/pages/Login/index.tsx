import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom'

import TwitterLogo from '../../assets/twitter.svg';
import './styles.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');

  const handleInputChange = useCallback((event): void => {
    setUsername(event.target.value)
  }, []);

  const handleSubmit = useCallback((event): void => {
    event.preventDefault();

    if (!username.length) return;

    localStorage.setItem('@Twitter:username', username);
    history.push('/timeline');
  }, [username, history]);

  
  return (
    <div className='login-wrapper'>
        <img src={TwitterLogo} alt="GoTwitter" />
        <form onSubmit={handleSubmit}>
            <input
                value={username}
                onChange={handleInputChange}
                placeholder="Nome de usuário"
            />
            <button type="submit">Entrar</button>
        </form>
    </div>
);
}

export default Login;