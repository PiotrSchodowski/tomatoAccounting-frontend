import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";
import Page from "./Page";
import UserContextProvider from "../context/UserContext";
import Navigation from "./Navigation";
import Footer from "./Footer";

import "../styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <UserContextProvider>
          <header>
            <Header />
          </header>
          <main>
            <aside>
              <Navigation />
            </aside>
            <section className="page">
              <Page />
            </section>
          </main>
          <footer>
            <Footer />
          </footer>
        </UserContextProvider>
      </div>
    </Router>
  );
};

export default App;
