import './App.css';
import { Route, Routes } from 'react-router-dom';
import { TopNavigation, ITopNavigationItem } from './components/navigation/TopNavigation';
import { Content } from './components/main/Content';
import { Input } from './components/main/Input';
import { FormEvent, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './secrets/firebaseConfig';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set } from "firebase/database";

const initialRoutes: ITopNavigationItem[] = [
  {
    name: 'Dahoam',
    to: '/dahoam'
  }
];

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const database = getDatabase();

function App() {

  const [routes] = useState(initialRoutes);
  const [value, setValue] = useState('...');

  useEffect(() => {
    const starCountRef = ref(database, 'value');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setValue(data);
    });

  }, []);

  function onInput(event: FormEvent<HTMLInputElement>) {
    set(ref(database), {
      value: event.currentTarget.value
    });
  }

  return (
    <div className="App flex flex-col h-screen">
      <header className="bg-slate-800">
        {/*<TopNavigation items={routes} />*/}
      </header>
      <main className='flex flex-col items-center h-screen'>
        <Routes>
          <Route path="/" element={<Content name={value} />} />
          <Route path="/dahoam" element={<Content name={value} />} />
          <Route path="/geheime_route/:wie_viel_geheim_parameter_id" element={<Content name={""} />} />
        </Routes>
        <Input onInput={onInput} />
      </main>
      <footer className="bg-slate-800">
        <h1 className="p-8 hover:uppercase text-white text-center">
          I bims 1 footer © sgreg0r - Nicht Design klauen!
        </h1>
      </footer>
    </div >
  );
}

export default App;
