import React from 'react';

import socket from './socket';
import reducer from './reducer';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: '',
    userName: '',
    users: [],
    messages: [],
  });

  const onLogin = (person) => {
    const { roomId, userName } = person;

    dispatch({
      type: 'JOINED',
      payload: {
        joined: true,
        roomId,
        userName,
      },
    });

    socket.emit('ROOM:JOIN', {
      roomId,
      userName,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const setMessages = (messages) => {
    dispatch({
      type: 'SET_MESSAGES',
      payload: messages,
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:JOINED', setUsers);
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:ADD_MESSAGE', setMessages);
  }, []);

  const onLogout = () => {
    dispatch({
      type: 'JOINED',
      payload: {
        joined: false,
        roomId: '',
        userName: '',
      },
    });
    socket.emit('ROOM:EXIT', { roomId: state.roomId });
  };

  return (
    <div className="container">
      {state.joined ? (
        <Chat
          onLogout={onLogout}
          users={state.users}
          messages={state.messages}
          userName={state.userName}
          roomId={state.roomId}
        />
      ) : (
        <JoinBlock onLogin={onLogin} />
      )}
    </div>
  );
}

export default App;
