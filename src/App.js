import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SMSForm from "./SMSForm";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SMSForm />
      </header>
    </div>
  );
};

export default App;
