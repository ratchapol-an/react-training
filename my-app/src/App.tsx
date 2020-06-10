import React, { useState, ChangeEvent } from "react";
import Routes from "./Routes";
import UserContext from "./contexts/UserContext";

function App() {
  const [userId, setUserId] = useState("");
  const handleUserIdChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  return (
    <div className="App">
      <UserContext.Provider value={{ userId, setUserId }}>
        <input type="text" onChange={handleUserIdChanged} />
        <Routes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
