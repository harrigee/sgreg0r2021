import './App.css';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Content } from './components/main/Content';
import { Input } from './components/main/Input';
import { FormEvent, useEffect, useState } from 'react';
import { firebaseConfig } from './secrets/firebaseConfig';
import { getDatabase, onDisconnect, onValue, ref, runTransaction, set, update } from "firebase/database";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { TopNavigation } from './components/navigation/TopNavigation';
import { Ranking } from './components/main/Ranking';
import { Footer } from './components/navigation/Footer';

const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = firebase.auth();
const tracker = firebase.analytics(app);

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
  const [users, setUsers] = useState<{ [key: string]: { uid: string, displayName: string, isOnline: boolean, charCount: number } }>({});
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

    const user = firebase.auth().currentUser;

    if (!user) {
      return;
    }

    const userRef = ref(database, 'users/' + user.uid);

    runTransaction(userRef, (user) => {
      if (user) {
        if (user.charCount) {
          user.charCount++;
        } else {
          user.charCount = 1;
        }
      }
      return user;
    });

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
    update(ref(database, 'users/' + user.uid), {
      uid: user.uid,
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

  function userItems() {
    const userItems = Object.values(users);
    userItems.sort((item1, item2) => {
      if (!item1.charCount) {
        return 1;
      }
      if (item1.charCount <= item2.charCount) {
        return 1;
      }
      return -1;
    });
    return userItems;
  }

  return (
    <div className="App flex flex-row min-h-screen bg-black bg-cover bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')]">
      {isBooted && isSignedIn &&
        <div className="hidden sm:flex sticky top-0 h-screen">
          <Ranking type={'vertical'} items={userItems()} />
        </div>
      }
      <div className="flex flex-col w-full">
        <header className="bg-zinc-900">
          <TopNavigation items={navigationItems()} />
          {isBooted && isSignedIn &&
            <div className="flex sm:hidden">
              <Ranking type={'horizontal'} items={userItems()} />
            </div>
          }
        </header>
        <main className='flex flex-row grow'>
          <div className="flex flex-col grow">
            <Routes>
              <Route path="/" element={<Content value={data.value} user={data.user} />} />
              <Route path="/signin" element={<StyledFirebaseAuth className='w-full mt-16' uiConfig={uiConfig} firebaseAuth={auth} />} />
              <Route path="/*" element={<Content value={'No no no no 🙃'} user={location.pathname} />} />
            </Routes>
            {isBooted && isSignedIn && location.pathname === '/' &&
              <Input onInput={onInput} />
            }
          </div>
        </main>
        <footer className="w-full bottom-0 bg-zinc-900">
          <Footer tracker={tracker} />
        </footer>
      </div>
    </div>
  );
}

export default App;
