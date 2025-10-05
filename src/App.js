import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { WishlistProvider } from './context/WishlistContext';
import Homepage from './Homepage';
import './App.css';
import './firebase';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <WishlistProvider>
          <div className="App">
            <Homepage />
          </div>
        </WishlistProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;

//{/* <header className="App-header">
  //<img src={logo} className="App-logo" alt="logo" />
  //<p>
    //Edit <code>src/App.js</code> and save NO.
  //</p>
  //<a
    //className="App-link"
    //href="https://reactjs.org"
    //target="_blank"
    //rel="noopener noreferrer"
  //>
    //Learn React
  //</a>
//</header> */}