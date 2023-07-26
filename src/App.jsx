import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Main from "./components/Main";
import Footer from './components/Footer';
import Result from './components/result';

function App() {
  

  return (
    <div className="App " >
      <Header />
      {/* <Search /> */}
      <Main />
      <Footer />
    </div>
  );
}

export default App;
