import "./App.css";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [login, setLogin] = useState(false);
  const [companyID, setCompanyID] = useState("");
  const [hauilerID, setHauilerID] = useState("");

  function change() {
    setLogin(true);
  }

  return (
    <div className="App">
      {login ? (
        <React.Fragment>
          <Dashboard companyID={companyID} hauilerID={hauilerID} />
        </React.Fragment>
      ) : (
        <Login
          change={change}
          companyID={companyID}
          hauilerID={hauilerID}
          setCompanyID={setCompanyID}
          setHauilerID={setHauilerID}
        />
      )}
    </div>
  );
}

export default App;
