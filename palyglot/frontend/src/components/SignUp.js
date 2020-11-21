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

export default function SignUp() {
    const [gender, setGender] = useState("");
    const [age, setAge] = useState(18);
    const [knownLanguages, setKnownLanguages] = useState([]);
    const [targetLanguages, setTargetLanguages] = useState([]);
    const { signup } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();

        signup(emailRef.current.value, passwordRef.current.value);
    }

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

    return (
        <>
            <Container maxWidth="sm">
                <Card>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    name="name"
                                    label="Name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="email"
                                    label="Email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="password"
                                    label="Password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    value={gender}
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Non-Binary"}>Non-Binary</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Known Languages</InputLabel>
                                <Select
                                    multiple
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
                                <InputLabel>Target Languages</InputLabel>
                                <Select
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
                    </form>
                </Card>
                <div>
                    Already have an account? Log in!
                </div>
            </Container>
        </>
    )
}