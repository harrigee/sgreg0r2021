import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TopNavigation, ITopNavigationItem } from './components/navigation/TopNavigation';
import { Content } from './components/main/Content';
import { Input } from './components/main/Input';
import { FormEvent, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './secrets/firebaseConfig';
import { getAnalytics } from "firebase/analytics";

const initialRoutes: ITopNavigationItem[] = [
  {
    name: 'Dahoam',
    to: '/dahoam'
  },
  {
    name: 'Noch Daheimer',
    to: '/mehr_dahoam'
  }
];

const app = initializeApp(firebaseConfig);
getAnalytics(app);

function App() {

  const [routes, setRoutes] = useState(initialRoutes);

  const navigate = useNavigate();

  function onInput(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    if (!value) {
      const routes = initialRoutes.slice();
      setRoutes(routes);
      navigate(`/geheime_route/`);
      return;
    }
    const routes = initialRoutes.slice();
    routes.push({
      name: value,
      to: `/geheime_route/${value}`
    });
    setRoutes(routes);
    navigate(`/geheime_route/${event.currentTarget.value}`);
  }

  return (
    <div className="App flex flex-col h-screen">
      <header className="bg-slate-800">
        <TopNavigation items={routes} />
      </header>
      <main className='flex flex-col items-center h-screen'>
        <Routes>
          <Route path="/dahoam" element={<Content name={"Daheim"} />} />
          <Route path="/mehr_dahoam" element={<Content name={"Noch Daheimer"} />} />
          <Route path="/geheime_route" element={<Content name={"Ohne Parameter mach ich keinen Meter"} />} />
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
