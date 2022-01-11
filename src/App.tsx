import './App.css';
import 'firebase/compat/auth';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Content } from './components/main/Content';
import { Input } from './components/main/Input';
import { FormEvent, useEffect, useState } from 'react';
import { firebaseConfig } from './secrets/firebaseConfig';
import { getDatabase, onDisconnect, onValue, ref, set } from "firebase/database";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { TopNavigation } from './components/navigation/TopNavigation';
import { SideBar } from './components/navigation/SideBar';

const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = firebase.auth();

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

function App() {

  const [data, setData] = useState({
    value: '...',
    user: undefined
  });
  const [users, setUsers] = useState<{ [key: string]: { displayName: string, isOnline: boolean } }>({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const dataRef = ref(database, 'data');

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData({
        value: data.value,
        user: data.user
      });
    });

    const usersRef = ref(database, 'users');

    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      setUsers(users);
    });

    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setIsSignedIn(user != null);
      setIsBooted(true);
      onOnline();
      onOffline();
    });

    return () => unregisterAuthObserver();

  }, []);

  function onInput(event: FormEvent<HTMLInputElement>) {
    set(ref(database, 'data'), {
      value: event.currentTarget.value,
      user: firebase.auth().currentUser?.displayName
    });
  }

  function onOnline() {
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    set(ref(database, 'users/' + user.uid), {
      displayName: user.displayName,
      isOnline: true
    });
  }

  function onOffline() {
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    const userRef = ref(database, 'users/' + user.uid);
    onDisconnect(userRef).update({
      isOnline: false
    })
  }

  function navigationItems() {

    const home = {
      name: 'Home',
      onClick: () => navigate('/')
    };

    const signIn = {
      name: 'Sign In',
      onClick: () => navigate('/signin')
    };

    const logout = {
      name: 'Logout',
      onClick: () => {
        auth.signOut();
        navigate('/');
      }
    }

    if (!isBooted) {
      return [];
    }

    if (!isSignedIn && location.pathname !== '/') {
      return [home];
    }

    if (!isSignedIn && location.pathname !== '/signin') {
      return [signIn];
    }

    if (isSignedIn && location.pathname !== '/') {
      return [home, logout];
    }

    return [logout];
  }

  return (
    <div className="App flex flex-col h-screen">
      <header className="bg-slate-800">
        <TopNavigation items={navigationItems()} />
      </header>
      <main className='flex flex-col items-center h-screen'>
        <SideBar items={Object.values(users)} />
        <Routes>
          <Route path="/" element={<Content value={data.value} user={data.user} />} />
          <Route path="/signin" element={<StyledFirebaseAuth className='w-full mt-16' uiConfig={uiConfig} firebaseAuth={auth} />} />
          <Route path="/geheime_route/:wie_viel_geheim_parameter_id" element={<Content />} />
        </Routes>
        {isBooted && isSignedIn && location.pathname === '/' &&
          <Input onInput={onInput} />
        }
      </main>
      <footer className="bg-slate-800">
        <div className="p-8 hover:uppercase text-white text-center">
          I bims 1 footer © sgreg0r - Nicht Design klauen!
        </div>
      </footer>
    </div >
  );
}

export default App;
