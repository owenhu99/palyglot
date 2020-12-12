import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import '../css/Matchmaker.css'
import NavBar from './NavBar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { Alert } from '@material-ui/lab';import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useAuth } from '../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const axios = require('axios').default;

function Requests() {
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
  const [requests, setRequests] = useState([]);
  const [currRequest, setCurrRequest] = useState(0);
  const [info, setInfo] = useState("");
  
  useEffect(() => {    
    currentUser.getIdToken(true).then((idToken) => {
      axios.get("https://backendcsc301.ue.r.appspot.com/matchmaking/requests", {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then((res) => {
        setRequests(res.data);
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const declineMatch = (userId) => {
    currentUser.getIdToken(true).then((idToken) => {
      axios.post("https://backendcsc301.ue.r.appspot.com/matchmaking/declineMatch", {
        sender: userId
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then((response) => {
          console.log(response);
          setInfo("response.data.msg");
      }, (error) => {
        console.log(error);
        setInfo("Whoops, match invite could not be accepted.");
      });
    }).catch((error) => {
      console.log(error);
    });

    setCurrRequest(currRequest + 1);
  }

  const acceptMatch = (userId) => {
    currentUser.getIdToken(true).then((idToken) => {
      axios.post("https://backendcsc301.ue.r.appspot.com/matchmaking/acceptMatch", {
        sender: userId
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then((response) => {
          console.log(response);
          setInfo("Match invite has been accepted, go to My Pals.");
      }, (error) => {
        console.log(error);
        setInfo("Whoops, match invite could not be accepted.");
      });
    }).catch((error) => {
      console.log(error);
    });

    setCurrRequest(currRequest + 1);
  }

  if (currRequest >= requests.length) {
    return (
      <div>
      <NavBar></NavBar>
      <div class="nomatches">
        <h1>No more incoming requests left.</h1>
      </div>
    </div>
    );
  } else {
    return (
      <div className="matchmakerPage">
        <NavBar></NavBar>
        <div class="matches">
          <h1 className="title">Incoming Requests</h1>
          {info && <div className="alert"><Alert severity="info">{info}</Alert></div>}
          <Card className={classes.root}>
            <div className="cardHeader">
              <Typography variant="h5" color="textPrimary" component="h5">
                {requests[currRequest].name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {requests[currRequest].gender + ", " + requests[currRequest].age}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {requests[currRequest].knownLanguages.map(function(language, i) {
                if (i == requests[currRequest].knownLanguages.length - 1) {
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
              image={requests[currRequest].profilePicture}
            />
            <CardContent>
              <Typography variant="body2" color="textPrimary" component="p">
                Bio
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {requests[currRequest].bio === "" ? "This user has not set their bio." : requests[currRequest].bio}
              </Typography>
              <Typography className="interests" variant="body2" color="textPrimary" component="p">
                Interests
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {requests[currRequest].interests.map(function(interest, i) {
                    if (i == requests[currRequest].interests.length - 1) {
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
              <IconButton onClick={() => acceptMatch(requests[currRequest].userId)} aria-label="send match">
                <CheckIcon />
              </IconButton>
              <IconButton className={classes.clear} onClick={() => declineMatch(requests[currRequest].userId)} aria-label="dont match">
                <ClearIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}
 
export default Requests;