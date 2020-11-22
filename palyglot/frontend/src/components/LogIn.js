import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            history.push("/");
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
        <>
            <Container maxWidth="sm">
                <h1>
                    Log In
                </h1>
                {error && <h3>{error}</h3>}
                <Card>
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    required
                                    fullWidth
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
                        <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        >
                        Log In
                    </Button>
                    </form>
                </Card>
                <div>
                    Need an account? <Link to="/signup">Sign up!</Link>
                </div>
            </Container>
        </>
    )
}