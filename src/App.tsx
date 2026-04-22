import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Content } from "./components/main/Content";
import { FormEvent, useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { SignIn } from "./components/main/SignIn";
import { TopNavigation } from "./components/navigation/TopNavigation";
import { Footer } from "./components/navigation/Footer";
import { getContent, selectContent } from "./features/app/contentSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { auth, database, tracker } from "./firebase/firebase";

function App() {
  const dispatch = useAppDispatch();
  const content = useAppSelector(selectContent);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch(getContent());

    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(user != null);
      setIsBooted(true);
    });

    return () => unregisterAuthObserver();
  }, [dispatch]);

  function onInput(event: FormEvent<HTMLInputElement>) {
    const user = auth.currentUser;
    if (!user) return;

    set(ref(database, "data"), {
      value: event.currentTarget.value,
      user: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
    });
  }

  function navigationItems() {
    const home = { name: "Home", onClick: () => navigate("/") };
    const signIn = { name: "Sign in", onClick: () => navigate("/signin") };
    const logout = {
      name: "Logout",
      onClick: () => {
        auth.signOut();
        navigate("/");
      },
    };

    if (!isBooted) return [];
    if (!isSignedIn && location.pathname !== "/") return [home];
    if (!isSignedIn && location.pathname !== "/signin") return [signIn];
    if (isSignedIn && location.pathname !== "/") return [home, logout];
    return [logout];
  }

  return (
    <div className="App flex flex-col min-h-screen">
      <header
        className="glass sticky top-0 z-50"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <TopNavigation items={navigationItems()} user={auth.currentUser?.displayName ?? undefined} />
      </header>

      <main className="flex flex-col flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Content
                isSignedIn={isSignedIn}
                onInput={onInput}
                value={content.value}
                user={content.user}
              />
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/*"
            element={
              <Content
                isSignedIn={false}
                value={"No no no no 🙃"}
                user={location.pathname}
              />
            }
          />
        </Routes>
      </main>

      <Footer tracker={tracker} />
    </div>
  );
}

export default App;
