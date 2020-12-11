import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import '../css/Matchmaker.css'
import NavBar from './NavBar';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { Alert, AlertTitle } from '@material-ui/lab';import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useAuth } from '../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const axios = require('axios').default;

function Matchmaker() {
  const useStyles = makeStyles((theme) => ({
    root: {
    },
    media: {
      height: 0,
      paddingTop: '40%', // 16:9
    },
    clear: {
      marginLeft: 'auto'
    },
  }));

  const classes = useStyles();
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState([]);
  const [currMatch, setCurrMatch] = useState(0);
  const [info, setInfo] = useState("");
  
  useEffect(() => {    
    currentUser.getIdToken(true).then((idToken) => {
      axios.get("http://localhost:5000/matchmaking/", {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then((response) => {
          setMatches(response.data.matches);
      });
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const dontMatchUser = () => {
    setCurrMatch(currMatch + 1);
    setInfo("");
  }

  const matchUser = (toUserId) => {
    currentUser.getIdToken(true).then((idToken) => {
      axios.post("http://localhost:5000/matchmaking/requestMatch", {
        toUser: toUserId
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then((response) => {
          setInfo("Match invite has been sehnt");
      }, (error) => {
        console.log(error);
        setInfo("Whoops, match invite could not be sent.");
      });
    }).catch((error) => {
      console.log(error);
    });

    setCurrMatch(currMatch + 1);
  }

  if (currMatch >= matches.length) {
    return (
      <div>
      <NavBar></NavBar>
      <div class="nomatches">
        <h1>No more matches left.</h1>
      </div>
    </div>
    );
  } else {
    return (
      <div className="matchmakerPage">
        <NavBar></NavBar>
        <div class="matches">
          <h1 className="title">Find a Pal</h1>
          {info && <div className="alert"><Alert severity="info">{info}</Alert></div>}
          <Card className={classes.root}>
            <div className="cardHeader">
              <Typography variant="h5" color="textPrimary" component="h5">
                {matches[currMatch].name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {matches[currMatch].gender + ", " + matches[currMatch].age}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {matches[currMatch].knownLanguages.map(function(language, i) {
                if (i == matches[currMatch].knownLanguages.length - 1) {
                  return(
                    language
                  )
                } else {
                  return(
                    language + ", "
                  )
                }
              })
              }
              </Typography>
            </div>
            <CardMedia
              className={classes.media}
              image={matches[currMatch].profilePicture}
            />
            <CardContent>
              <Typography variant="body2" color="textPrimary" component="p">
                Bio
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {matches[currMatch].bio === "" ? "This user has not set their bio." : matches[currMatch].bio}
              </Typography>
              <Typography className="interests" variant="body2" color="textPrimary" component="p">
                Interests
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {matches[currMatch].interests.map(function(interest, i) {
                    if (i == matches[currMatch].interests.length - 1) {
                      return(
                        interest
                      )
                    } else {
                      return(
                        interest + ", "
                      )
                    }
                  })
                }
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={() => matchUser(matches[currMatch].userId)} aria-label="send match">
                <CheckIcon />
              </IconButton>
              <IconButton className={classes.clear} onClick={dontMatchUser} aria-label="dont match">
                <ClearIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}
 
export default Matchmaker;