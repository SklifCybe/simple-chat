import React from 'react';

function App() {
  return (
    <div className="container">
      <div className="formEnter">
        <input type="text" placeholder="Номер комнаты" className="enterFields" />
        <input type="text" placeholder="Ваше имя" className="enterFields" />
        <button className="btnEnter">Войти</button>
      </div>
      {/* <div className="content">
        <div className="sideBar">
          <span className="titleUsers">Users(1):</span>
          <ul>
            <li className="items">Test User</li>
          </ul>
        </div>
        <div className="chat">
          <ul>
            <li className="items">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>Test User</span>
            </li>
            <li className="items">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>Test User</span>
            </li>
          </ul>
          <div className="form">
            <div className="bottomLine"></div>
            <textarea></textarea>
            <button>Send</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
