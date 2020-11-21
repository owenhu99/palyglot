import React from "react";
import SignUp from "./components/SignUp"
import './css/App.css';
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <SignUp></SignUp>
    </AuthProvider>
  );
}

export default App;
