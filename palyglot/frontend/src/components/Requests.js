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
  const [requestIds, setRequestIds] = useState([]);
  const [currRequest, setCurrRequest] = useState({name: "", gender: "", age: "", knownLanguages: [], interests: [], profilePicture: ""});
  const [currRequestId, setCurrRequestId] = useState(0);
  const [info, setInfo] = useState("");
  
  useEffect(() => {    
    currentUser.getIdToken(true).then((idToken) => {
      axios.get("http://localhost:5000/users/me", {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      }).then((response) => {
          setRequestIds(response.data.matchInvites)
      });
    }).catch((error) => {
      console.log(error);
    });
  }, []);

//   const dontMatchUser = () => {
//     setCurrMatch(currMatch + 1);
//     setInfo("");
//   }

//   const matchUser = (toUserId) => {
//     console.log("here")
//     currentUser.getIdToken(true).then((idToken) => {
//       axios.post("http://localhost:5000/matchmaking/requestMatch", {
//         toUser: toUserId
//       }, {
//         headers: {
//           'Authorization': `Bearer ${idToken}`
//         }
//       }).then((response) => {
//           console.log(response);
//           setInfo(response.data.msg);
//       }, (error) => {
//         console.log(error);
//         setInfo("Whoops, match invite could not be sent.");
//       });
//     }).catch((error) => {
//       console.log(error);
//     });

//     setCurrMatch(currMatch + 1);
//   }

  if (currRequestId >= requestIds.length) {
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
                {currRequest.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {currRequest.gender + ", " + currRequest.age}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {currRequest.knownLanguages.map(function(language, i) {
                if (i == currRequest.knownLanguages.length - 1) {
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
              image={currRequest.profilePicture}
            />
            <CardContent>
              <Typography variant="body2" color="textPrimary" component="p">
                Bio
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {currRequest.bio === "" ? "This user has not set their bio." : currRequest.bio}
              </Typography>
              <Typography className="interests" variant="body2" color="textPrimary" component="p">
                Interests
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {currRequest.interests.map(function(interest, i) {
                    if (i == currRequest.interests.length - 1) {
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
              <IconButton onClick={()=>console.log("clicked")} aria-label="send match">
                <CheckIcon />
              </IconButton>
              <IconButton className={classes.clear} onClick={()=>console.log("clicked")} aria-label="dont match">
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