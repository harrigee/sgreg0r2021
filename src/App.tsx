import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Content } from "./components/main/Content";
import { useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { SignIn } from "./components/main/SignIn";
import { TopNavigation } from "./components/navigation/TopNavigation";
import { Footer } from "./components/navigation/Footer";
import { getContent, selectContent } from "./features/app/contentSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { auth, database, tracker } from "./firebase/firebase";
import { ShaderBackdrop } from "./components/main/ShaderBackdrop";

function App() {
  const dispatch = useAppDispatch();
  const content = useAppSelector(selectContent);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

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

  useEffect(() => {
    const fonts = (document as any).fonts;
    if (!fonts?.ready) {
      setFontsReady(true);
      return;
    }
    let cancelled = false;
    fonts.ready.then(() => {
      if (!cancelled) setFontsReady(true);
    });
    const fallback = window.setTimeout(() => {
      if (!cancelled) setFontsReady(true);
    }, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  function handleSubmit(next: string) {
    const user = auth.currentUser;
    if (!user) return;

    set(ref(database, "data"), {
      value: next,
      user: user.displayName,
      email: user.email,
      postedAt: Date.now(),
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

  const displayName = auth.currentUser?.displayName ?? undefined;

  return (
    <div className={`App${fontsReady ? " fonts-ready" : ""}`}>
      <ShaderBackdrop />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <TopNavigation
        items={navigationItems()}
        user={displayName}
        onBrandClick={() => navigate("/")}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Content
              isSignedIn={isSignedIn}
              onSubmit={handleSubmit}
              value={content.value}
              user={content.user}
              postedAt={content.postedAt}
            />
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/*"
          element={
            <Content
              isSignedIn={false}
              value={"No no no no"}
              user={location.pathname}
            />
          }
        />
      </Routes>

      <Footer tracker={tracker} />
    </div>
  );
}

export default App;
