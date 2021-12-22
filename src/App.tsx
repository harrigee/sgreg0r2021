import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TopNavigation, ITopNavigationItem } from './components/navigation/TopNavigation';
import { Content } from './components/main/Content';
import { Input } from './components/main/Input';

function App() {

  const navigate = useNavigate();

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
      to: '/am_daheimsten/Am Daheimsten vom Allerfeinsten'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-cover bg-main">
      <header className="bg-slate-800">
        <TopNavigation items={menuItems} />
      </header>
      <main className='flex flex-col items-center h-screen'>
        <Routes>
          <Route path="/dahoam" element={<Content name={"Daheim"} />} />
          <Route path="/mehr_dahoam" element={<Content name={"Mehr Daheim"} />} />
          <Route path="/am_daheimsten" element={<Content name={"Ohne Parameter mach ich keinen Meter"} />} />
          <Route path="/am_daheimsten/:wie_viel_daheim_parameter_id" element={<Content name={""} />} />
        </Routes>
        <Input onInput={(event) => navigate(`/am_daheimsten/${event.currentTarget.value}`)} />
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
