import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Content } from "./components/main/Content";
import { Input } from "./components/main/Input";
import { FormEvent, useEffect, useState } from "react";
import {
  onDisconnect,
  onValue,
  ref,
  runTransaction,
  set,
  update,
} from "firebase/database";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TopNavigation } from "./components/navigation/TopNavigation";
import { Ranking } from "./components/main/Ranking";
import { Footer } from "./components/navigation/Footer";
import { getContent, selectContent } from "./features/app/contentSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectSortedUsers, setUsers } from "./features/app/usersSlice";
import { auth, database, signInUiConfig, tracker } from "./firebase/firebase";

function App() {
  const dispatch = useAppDispatch();
  const content = useAppSelector(selectContent);
  const users = useAppSelector(selectSortedUsers);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getContent());

    const usersRef = ref(database, "users");

    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      console.log(users);
      dispatch(setUsers(users));
    });

    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(user != null);
      setIsBooted(true);
      onOnline();
      onOffline();
    });

    return () => unregisterAuthObserver();
  }, [dispatch]);

  function onInput(event: FormEvent<HTMLInputElement>) {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    const userRef = ref(database, "users/" + user.uid);

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

    set(ref(database, "data"), {
      value: event.currentTarget.value,
      user: auth.currentUser?.displayName,
    });
  }

  function onOnline() {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    update(ref(database, "users/" + user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      isOnline: true,
    });
  }

  function onOffline() {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const userRef = ref(database, "users/" + user.uid);
    onDisconnect(userRef).update({
      isOnline: false,
    });
  }

  function navigationItems() {
    const home = {
      name: "Home",
      onClick: () => navigate("/"),
    };

    const signIn = {
      name: "Sign In",
      onClick: () => navigate("/signin"),
    };

    const logout = {
      name: "Logout",
      onClick: () => {
        auth.signOut();
        navigate("/");
      },
    };

    if (!isBooted) {
      return [];
    }

    if (!isSignedIn && location.pathname !== "/") {
      return [home];
    }

    if (!isSignedIn && location.pathname !== "/signin") {
      return [signIn];
    }

    if (isSignedIn && location.pathname !== "/") {
      return [home, logout];
    }

    return [logout];
  }

  return (
    <div className="App flex flex-row min-h-screen bg-black bg-cover bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')]">
      {isBooted && isSignedIn && (
        <div className="hidden sm:flex sticky top-0 h-screen">
          <Ranking type={"vertical"} users={users} />
        </div>
      )}
      <div className="flex flex-col w-full">
        <header className="bg-zinc-900">
          <TopNavigation items={navigationItems()} />
          {isBooted && isSignedIn && (
            <div className="flex flex-col sm:hidden">
              <Ranking type={"horizontal"} users={users} />
              <div className="h-1 w-full bg-zinc-900" />
            </div>
          )}
        </header>
        <main className="flex flex-row grow justify-center">
          <div className="flex flex-col justify-center w-full">
            <Routes>
              <Route
                path="/"
                element={<Content value={content.value} user={content.user} />}
              />
              <Route
                path="/signin"
                element={
                  <StyledFirebaseAuth
                    className="w-full mt-16"
                    uiConfig={signInUiConfig}
                    firebaseAuth={auth}
                  />
                }
              />
              <Route
                path="/*"
                element={
                  <Content value={"No no no no 🙃"} user={location.pathname} />
                }
              />
            </Routes>
            {isBooted && isSignedIn && location.pathname === "/" && (
              <Input onInput={onInput} />
            )}
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
