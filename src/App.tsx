import { useState } from 'react';
import './App.css';
import { TopNavigation } from './components/navigation/TopNavigation';

function App() {

  const [text, setText] = useState('Daheim...');

  return (
    <div className="flex flex-col h-screen bg-cover bg-main">
      <header className="bg-slate-800">
        <TopNavigation
          onHomeClicked={() => {
            setText('Daheim...');
          }}
          onNotHomeClicked={() => {
            setText('Nicht Daheim...');
          }}
          onFarFromHomeClicked={() => {
            setText('Sehr weit weg von Daheim...');
          }}
        />
      </header>
      <main className="mb-auto mx-auto">
        <div className="flex text-white my-10">
          <h1 className="text-4xl font-bold">
            {text}
          </h1>
        </div>
      </main>
      <footer className="bg-slate-800">
        <h1 className="text-2xl p-10 hover:uppercase text-white text-center">
          I bims 1 footer
        </h1>
      </footer>
    </div >
  );
}

export default App;
