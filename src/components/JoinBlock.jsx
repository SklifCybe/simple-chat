import React from 'react';
import axios from 'axios';

function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const enterHandler = async () => {
    if (!roomId && !userName) {
      return alert('Введите данные');
    }
    if (!roomId) {
      return alert('Введите номер комнаты');
    }
    if (!userName) {
      return alert('Введите имя пользователя');
    }

    setIsLoading(true);

    const person = {
      roomId,
      userName,
    };

    await axios.post('/rooms', {
      roomId,
    });

    onLogin(person);
  };

  return (
    <div className="formEnter">
      <input
        type="text"
        placeholder="Номер комнаты"
        className="enterFields"
        value={roomId}
        onChange={(event) => setRoomId(event.target.value)}
      />
      <input
        type="text"
        placeholder="Ваше имя"
        className="enterFields"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <button className="btnEnter" onClick={enterHandler} disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </div>
  );
}

export default JoinBlock;
