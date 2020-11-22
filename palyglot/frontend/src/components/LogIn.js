import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
import '../css/LogIn.css';
import { withStyles } from '@material-ui/core/styles';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

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

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            history.push("/profile");
        } catch {
            setError("Failed to log in.");
        }

        setLoading(false);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="loginContainer">
            <Container maxWidth="sm">
                <h1 className="loginTitle">
                    Log In
                </h1>
                {error && <div className="alert"><Alert severity="warning">{error}</Alert></div>}
                <Card>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="cardItem">
                        <Grid container spacing={0}>
                            <Grid item xs={12} className="inputField">
                                <TextField 
                                    fullWidth
                                    required
                                    id="email"
                                    variant="outlined"
                                    margin="normal"
                                    name="email"
                                    label="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    required
                                    fullWidth
                                    id="password"
                                    variant="outlined"
                                    margin="normal"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                        </Grid>
                        </div>
                        <div className="cardItemButton">
                            <StyledButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                Log In
                            </StyledButton>
                        </div>
                    </form>
                </Card>
                <div className="signUpText">
                    Need an account? <Link to="/signup">Sign up!</Link>
                </div>
            </Container>
        </div>
    )
}