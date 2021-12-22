import './App.css';
import { Route, Routes } from 'react-router-dom';
import { TopNavigation, ITopNavigationItem } from './components/navigation/TopNavigation';
import { Content } from './components/main/Content';

function App() {

  const menuItems: ITopNavigationItem[] = [
    {
      name: 'home',
      to: '/home'
    },
    {
      name: 'more home',
      to: '/more_home'
    },
    {
      name: 'derper params',
      to: '/derper/vom Feinsten'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-cover bg-main">
      <header className="bg-slate-800">
        <TopNavigation items={menuItems} />
      </header>
      <main className="mb-auto mx-auto">
        <Routes>
          <Route path="/home" element={<Content name={"Daheim"} />} />
          <Route path="/more_home" element={<Content name={"Mehr Daheim"} />} />
          <Route path="/derper/:parameter" element={<Content name={"Am Daheimsten"} />} />
        </Routes>
      </main>
      <footer className="bg-slate-800">
        <h1 className="p-8 hover:uppercase text-white text-center">
          I bims 1 footer © sgreg0r
        </h1>
      </footer>
    </div >
  );
}

export default App;
