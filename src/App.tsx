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
import { BsGithub, BsLinkedin, BsTwitch, BsInstagram, BsMailbox2 } from 'react-icons/bs';

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
  const [users, setUsers] = useState<{ [key: string]: { uid: string, displayName: string, isOnline: boolean } }>({});
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
    userItems.sort((item) => {
      if (item.isOnline) {
        return -1;
      }
      return 1;
    });
    return userItems;
  }

  return (
    <div className="App flex flex-row min-h-screen bg-black bg-cover bg-[url('https://source.unsplash.com/1920x1080/?black')]">
      {isBooted && isSignedIn &&
        <div className="flex max-h-screen">
          <SideBar items={userItems()} />
        </div>
      }
      <div className="flex flex-col w-full">
        <header className="bg-zinc-900">
          <TopNavigation items={navigationItems()} />
        </header>
        <main className='flex flex-row grow'>
          <div className="flex flex-col grow">
            <Routes>
              <Route path="/" element={<Content value={data.value} user={data.user} />} />
              <Route path="/signin" element={<StyledFirebaseAuth className='w-full mt-16' uiConfig={uiConfig} firebaseAuth={auth} />} />
              <Route path="/geheime_route/:wie_viel_geheim_parameter_id" element={<Content />} />
            </Routes>
            {isBooted && isSignedIn && location.pathname === '/' &&
              <Input onInput={onInput} />
            }
          </div>
        </main>
        <footer className="w-full bottom-0 bg-zinc-900">
          <div className="flex flex-col place-items-center">
            <div className=" text-white text-center flex flex-row mt-8 mb-4">
              <div className='mr-2'>
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/harrigee'>
                  <BsGithub size={32} />
                </a>
              </div>
              <div className='mx-2'>
                <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/stefan-gregor/'>
                  <BsLinkedin size={32} />
                </a>
              </div>
              <div className='mx-2'>
                <a target="_blank" rel="noopener noreferrer" href='https://www.twitch.tv/sgreg0r'>
                  <BsTwitch size={32} />
                </a>
              </div>
              <div className='mx-2'>
                <a target="_blank" rel="noopener noreferrer" href='http://instagram.com/sgreg0r/'>
                  <BsInstagram size={32} />
                </a>
              </div>
              <div className='mx-2'>
                <a target="_blank" rel="noopener noreferrer" href='mailto:rogfan@icloud.com'>
                  <BsMailbox2 size={32} />
                </a>
              </div>
            </div>
            <div className="flex text-white mb-4">
              Stefan Gregor 2022
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
