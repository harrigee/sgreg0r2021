import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="absolute object-cover w-full h-screen" src={"https://source.unsplash.com/random/1920x1080?dark,winter,nature"} alt={"Koa Buidl no neda"} />
        <h1 className="animate-spin-slow text-9xl font-bold w-1 h-1 hover:uppercase">
          ich dreh durch
        </h1>
      </header>
    </div>
  );
}

export default App;
