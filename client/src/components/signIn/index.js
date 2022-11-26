import { useState } from 'react';
import axios from 'axios';

export default function SignIn() {
  console.log('SignIn-render');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const signInHandler = () => {
    console.log(login, password, process.env.REACT_APP_API_URL, process.env);
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        login: login,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="sign-in">
      <span className="sign-in__header">Войти в панель управления</span>
      <input type="text" onChange={(e) => setLogin(e.target.value)} />
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signInHandler}>войти</button>
    </div>
  );
}
