import React from 'react';
import Button from '@material-ui/core/Button';
import '../css/Splash.css';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

export default function Splash() {
    const StyledButton = withStyles({
        root: {
          background: 'linear-gradient(45deg, #f2452b 30%, #fb8264 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
        },
      })(Button);

    return (
        <>
            <h1 className="splashTitle">palyglot</h1>
            <h2 className="splashHeadline">Learn a New Language. Make Some Friends.</h2>
            <div className="splashImage">
                <img 
                    src="https://image.freepik.com/vector-gratis/gente-saltando-diseno-dia-juventud_23-2148572045.jpg"
                    alt=""/>
            </div>
            <div className="splashButtonsGroup" >
                <div className="splashButton">
                    <StyledButton component={Link} to={'/login'} variant="contained" color="white" className="splashLogIn">
                        Log In
                    </StyledButton>
                </div>
                <div className="splashButton">
                    <StyledButton component={Link} to={'/signup'} variant="contained" color="white" className="splashSignUp">
                        Sign Up
                    </StyledButton>
                </div>
            </div>
        </>
    );
}
