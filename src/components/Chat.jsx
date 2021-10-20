import React from 'react';
import classNames from 'classnames';

import socket from '../socket';

function Chat({ onLogout, users = [], messages, userName, roomId }) {
  const [message, setMessage] = React.useState();
  const messageRef = React.useRef(null);

  const onSendMessage = () => {
    socket.emit('ROOM:ADD_MESSAGE', {
      roomId,
      userName,
      text: message,
    });
    setMessage('');
  };

  React.useEffect(() => {
    console.log(userName);
    messageRef.current.scrollTo(0, 99);
  }, [messages]);

  return (
    <>
      <div className="header">
        <span onClick={onLogout}>Выйти</span>
      </div>
      <div className="content">
        <div className="sideBar">
          <span className="titleUsers">Онлайн ({users.length}):</span>
          <ul>
            {users.map((user) => (
              <li className="items my-message">{user}</li>
            ))}
          </ul>
        </div>
        <div className="chat">
          <ul className="chat__messages" ref={messageRef}>
            {messages.map((message, index) => (
              <li
                key={index}
                className={classNames('items', { ['my-message']: message.userName === userName })}>
                <p className="chat__text">{message.text}</p>
                <div>
                  <span>{message.userName}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="form">
            <div className="bottomLine"></div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button onClick={onSendMessage}>Отправить</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
