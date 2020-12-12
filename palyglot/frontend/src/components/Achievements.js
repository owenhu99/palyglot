import React from "react";import "../css/Achievements.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Achievement Icons
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

const useStyles = makeStyles((theme) => ({
    unlocked: {
      padding: "3px",
      textAlign: 'center',
      border: "3px solid #ffd85f",
      boxShadow: "0 4px 6px 3px rgba(255, 216, 95, .4)",
      borderRadius: "5px",
      backgroundColor: "#ffecb3"
    },
    locked: {
        padding: "3px",
        textAlign: 'center',
        border: "3px solid grey",
        borderRadius: "5px",
        backgroundColor: "#b4b2ac"
      },
  }));

function Achievements(props) {

    const classes = useStyles();

    return (
    <div className="achievements">
            <div className="achievements_header">
                <h2>My Achievements</h2>
            </div>
            <div className="achievementsBody">
                <Grid className="achievementsBody_grid" container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={props.userDetails.bio ? classes.unlocked : classes.locked}>
                            <Grid item className="achievementsIcon">
                                <ImportContactsIcon style={{transform: "scale(1.3)"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>Open Book</Typography>
                                <Typography>Let others get to know you by writing a bio.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.locked}>
                            <Grid item className="achievementsIcon">
                                <PhotoCameraIcon style={{transform: "scale(1.3)"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>Photogenic</Typography>  
                                <Typography>Set up a Profile Picture.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={firstPal(props.userDetails.matches) ? classes.unlocked : classes.locked}>
                            <Grid item className="achievementsIcon">
                                <PersonAddIcon style={{transform: "scale(1.3)"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>First for Everything</Typography>  
                                <Typography>Match with your first Pal.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.locked}>
                            <Grid item className="achievementsIcon">
                                <GroupAddIcon style={{transform: "scale(1.3)"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>Pal-pular</Typography>
                                <Typography>Message five Pals.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.locked}>
                            <Grid item className="achievementsIcon">
                                <SupervisorAccountIcon style={{transform: "scale(1.3)"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>Language Tutor</Typography>
                                <Typography>Have a 3 day streak with someone in your known language.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.locked}>
                            <Grid item className="achievementsIcon">
                                <SupervisedUserCircleIcon style={{transform: "scale(1.3)"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>Learn Something New Every Message</Typography>
                                <Typography>Have a 3 day streak with someone in your target language.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.locked}>
                            <Grid item className="achievementsIcon">
                                <WhatshotIcon style={{transform: "scale(1.3)", color: "#ffb061"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>Building Habits</Typography>
                                <Typography>Have a 21 day streak with a Pal.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.locked}>
                            <Grid item className="achievementsIcon">
                                <WhatshotIcon style={{transform: "scale(1.3)", color: "#ff8861"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>Growing Friendship</Typography>  
                                <Typography>Have a 50 day streak with a Pal.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.locked}>
                            <Grid item className="achievementsIcon">
                                <WhatshotIcon style={{transform: "scale(1.3)", color: "#ff6161"}}/>
                            </Grid>
                            <Grid item xs>
                                <Typography style={{ fontWeight: "bold" }}>Pal for Life</Typography>  
                                <Typography>Have a 100 day streak with a Pal.</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

function firstPal(matches) {
    return Array.isArray(matches) && matches.length ? true : false;
}

export default Achievements;