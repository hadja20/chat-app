
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Page from './components/Chat/Page';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:5000');

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<Page socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
