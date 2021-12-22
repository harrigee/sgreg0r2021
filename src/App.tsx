import './App.css';
import { Route, Routes } from 'react-router-dom';
import { TopNavigation, ITopNavigationItem } from './components/navigation/TopNavigation';
import { Content } from './components/main/Content';

function App() {

  const menuItems: ITopNavigationItem[] = [
    {
      name: 'Dahoam',
      to: '/dahoam'
    },
    {
      name: 'Noch Daheimer',
      to: '/mehr_dahoam'
    },
    {
      name: 'Am Daheimsten',
      to: '/am_daheimsten/vom Allerfeinsten'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-cover bg-main">
      <header className="bg-slate-800">
        <TopNavigation items={menuItems} />
      </header>
      <main className='flex place-items-start justify-center h-screen'>
        <Routes>
          <Route path="/dahoam" element={<Content name={"Daheim"} />} />
          <Route path="/mehr_dahoam" element={<Content name={"Mehr Daheim"} />} />
          <Route path="/am_daheimsten/:wie_viel_daheim_parameter_id" element={<Content name={"Am Daheimsten"} />} />
        </Routes>
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
