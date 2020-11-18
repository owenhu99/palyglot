import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './Matchmaker.css'

function Matchmaker() {
  const [matches, setMatches] = useState([{}]);
  const [targetLanguages, setTargetLanguages] = useState(new Set());
  const [ageRange, setAgeRange] = useState([18, 80]);
  const [gender, setGender] = useState("All");

  const handleAgeRangeChange = (event, newAgeRange) => {
    setAgeRange(newAgeRange);
  };

  const handleGenderChange = (event) => {
  setGender(event.target.value);
  };

  const languages = ["English", "French", "Spanish", "Portugese"]

  const sampleData = [{id: 0, name: "John", bio: "University student passionate about technology and films.", 
                      targetLanguages: ["English", "French", "Portugese"], profilePicture: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Lueg_im_SWR1_Studio.jpg"},
                      {id: 11, name: "Paul", bio: "Gamer.", 
                      targetLanguages: ["English", "Spanish"], profilePicture: "https://cdn57.androidauthority.net/wp-content/uploads/2020/07/OnePlus-Nord-Selfie-Camera-04-900x675.jpg"},
                      {id: 2, name: "Robert", bio: "Cool guy.", 
                      targetLanguages: ["Russian"], profilePicture: "https://cdn.dxomark.com/wp-content/uploads/medias/post-43415/BridgeHDR_SamsungGalaxyNote10Plus5G_DxOMark_Selfie_05-00.jpg"},
                      {id: 5, name: "Tessa", bio: "College baseball player.", 
                      targetLanguages: ["Hindi", "English"], profilePicture: "https://www.popsci.com/resizer/LKghKbdDDGF5_mAHnEmdC9RjJz4=/760x456/cloudfront-us-east-1.images.arcpublishing.com/bonnier/X5QSV64XWRGEVOOBD6PFKVEQKA.jpg"},
                      {id: 5, name: "Tessa", bio: "College baseball player.", 
                      targetLanguages: ["Hindi", "English"], profilePicture: "https://www.popsci.com/resizer/LKghKbdDDGF5_mAHnEmdC9RjJz4=/760x456/cloudfront-us-east-1.images.arcpublishing.com/bonnier/X5QSV64XWRGEVOOBD6PFKVEQKA.jpg"}]

  return (
    <div>
      <div className="ageSlider">
          <Typography id="range-slider" gutterBottom>
          Age
          </Typography>
          <Slider
          value={ageRange}
          onChange={handleAgeRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          />
      </div>
      <div className="genderSelecter">
          <Typography gutterBottom>
          Gender
          </Typography>
          <FormControl>
          <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={gender}
              onChange={handleGenderChange}
          >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Non-Binary">Non-Binary</MenuItem>
          </Select>
          </FormControl>
      </div>
      <div className="searchButton">
        <Button variant="contained">Search</Button>
      </div>
      <div>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {sampleData.map((match, index) => {
            return(
              <Grid item xs={12} sm={6} md={3} key={match["id"]}>
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
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div>
  );
}
 
export default Matchmaker;