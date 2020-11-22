import React from "react";
import './css/App.css';
import { AuthProvider } from './contexts/AuthContext';
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Splash from "./components/Splash";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#E33E7F'
      }
    }
  });

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
            </Switch>
          </AuthProvider>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
