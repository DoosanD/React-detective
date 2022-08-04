import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import I18n from "i18n-js";
import { LocalizationContext } from "./context/LanguageContext";
import AppStore from "./pages/AppStore";
import HomePage from "./pages/HomePage";
import HomePageAuth from "./pages/HomePageAuth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navigation from "./pages/Navigation";
import Navigation2 from "./pages/Navigation2";
import CreateProfile from "./pages/CreateProfile";
import LogoPage from "./pages/LogoPage";

import "./App.css";
import ProfilePage from "./pages/ProfilePage";
// import ProfileForm from "./pages/forms/ProfileForm";

const App = () => {
  const [locale, setLocale] = React.useState("cyr");
  var isActive = useRef(true);

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => I18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

  React.useEffect(() => {
    let language = localStorage.getItem("language");
    if (isActive.current === true) setLocale(language || "cyr");
    return () => {
      isActive.current = false;
    };
  }, []);

  let routes;

  if (localStorage.getItem("refreshToken") === null) {
    routes = (
      <>
       
        
        <Navigation />
        
        <Routes>
          
          <Route path="/" element={<HomePageAuth />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/registration" element={<SignUp />} />
          
        </Routes>
      </>
    );
  } else {
    routes = (
      <>
     
      <Navigation2 />
        <Routes>
          <Route path="/create" element={<ProfilePage/>} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </>
    );
  }

  return (
    <div>
      
      <Router>
        <LocalizationContext.Provider value={localizationContext}>
          <AppStore>
            
            <main>{routes}</main>
          </AppStore>
        </LocalizationContext.Provider>
      </Router>
     
    </div>
  );
};

export default App;
