import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
import '../css/SignUp.css';
import { withStyles } from '@material-ui/core/styles';
const axios = require('axios').default;

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState(18);
    const [knownLanguages, setKnownLanguages] = useState([]);
    const [targetLanguages, setTargetLanguages] = useState([]);
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        try {
            setError("");
            setLoading(true);
            let signupresult = await signup(email, password);
            await axios.post(process.env.REACT_APP_BACKEND_URL + "users", {
                userId: signupresult.user.uid,
                name: name,
                email: email,
                gender: gender,
                age: age,
                knownLanguages: knownLanguages,
                targetLanguages: targetLanguages
              });
            history.push("/profile");
        } catch {
            setError("Failed to create an account");
        }

        setLoading(false);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleKnownLanguagesChange = (event) => {
        setKnownLanguages(event.target.value);
    };

    const handleTargetLanguagesChange = (event) => {
        setTargetLanguages(event.target.value);
    };

    const languages = ["English", "French", "Spanish",
                       "Hindi", "Russian", "Mandarin"];

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
        <div className="signupContainer">
            <Container maxWidth="sm">
                <h1 className="signUpTitle">
                    Sign Up
                </h1>
                {error && <div className="alert"><Alert severity="warning">{error}</Alert></div>}
                <Card>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="cardItem">
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <TextField 
                                    required
                                    fullWidth
                                    id="name"
                                    variant="outlined"
                                    margin="normal"
                                    name="name"
                                    label="Name"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </Grid>
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
                            <Grid item xs={12}>
                                <TextField 
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    variant="outlined"
                                    margin="normal"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div className="cardExtraPadding">
                                <InputLabel>Gender</InputLabel>
                                </div>
                                <Select
                                    required
                                    fullWidth
                                    value={gender}
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Non-Binary"}>Non-Binary</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="cardExtraExtraPadding">
                                    <InputLabel>Known Languages</InputLabel>
                                </div>
                                <Select
                                    required
                                    multiple
                                    fullWidth
                                    value={knownLanguages}
                                    onChange={handleKnownLanguagesChange}
                                    input={<Input />}
                                >
                                {languages.map((language) => (
                                    <MenuItem key={language} value={language}>
                                    {language}
                                    </MenuItem>
                                ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="cardExtraExtraPadding">
                                    <InputLabel>Target Languages</InputLabel>
                                </div>
                                <Select
                                    required
                                    fullWidth
                                    multiple
                                    value={targetLanguages}
                                    onChange={handleTargetLanguagesChange}
                                    input={<Input />}
                                >
                                {languages.map((language) => (
                                    <MenuItem key={language} value={language}>
                                    {language}
                                    </MenuItem>
                                ))}
                                </Select>
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
                                Sign Up
                            </StyledButton>
                        </div>
                    </form>
                </Card>
                <div className="logInText">
                    Already have an account? <Link to="/login">Log in!</Link>
                </div>
            </Container>
        </div>
    )
}