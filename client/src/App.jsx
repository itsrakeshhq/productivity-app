import React from "react";

import Home from "./Home";
import Login from "./Login";

const App = () => {
  const token = localStorage?.getItem("token");
  return <>{token ? <Home /> : <Login />}</>;
};

export default App;
