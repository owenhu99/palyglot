import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../css/Matchmaker.css'
import NavBar from './NavBar';
import { useAuth } from '../contexts/AuthContext';
const axios = require('axios').default;

function Matchmaker() {
  const [matches, setMatches] = useState([]);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    axios.get("https://palyglot-backend.herokuapp.com/users/")
    .then((response) => {
        setMatches(response.data);
    });
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div class="matches">
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {matches.map((match, index) => {
            if (match.userId !== currentUser.uid) {
            return(
              <Grid item xs={12} sm={6} md={3} key={match["id"]}>
                <div onClick={() => {axios.post("https://palyglot-backend.herokuapp.com/rooms/", {participants: [match.userId, currentUser.uid]})}}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      image={match["profilePicture"]}
                      style={{height: 300}}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {match["name"]}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {match["targetLanguages"].map((language, index) => {
                          return(
                            language + " "
                          )
                        })}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {match["bio"]}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                </div>
              </Grid>
            )
          }
          })}
        </Grid>
      </div>
    </div>
  );
}
 
export default Matchmaker;