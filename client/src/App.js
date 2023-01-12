
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './components/Chat/Page';
import socketIO from 'socket.io-client';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
const socket = socketIO.connect(process.env.REACT_APP_BASE_URL);

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login socket={socket} />}></Route>
          <Route path="/chat" element={<Page socket={socket} />}></Route>
          <Route path="/register" element={<Register socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
