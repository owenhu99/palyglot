# Palyglot (Team 30)

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 

Palyglot is an application that provides language learners and those just trying to meet people who speak different languages a platform to meet and communicate. Our application is trying to solve the problem that many other penpal websites have, which is very outdated designs and the use of snail mail. Many of these sites can connect you with other people who speak a certain language, but then its up to you to communicate with them. Palyglot provides an all in one platform that performs the matchmaking and gives the user a platform to practice their language skills.

## Key Features
 * Login and Signup
   - Users can create accounts, specify their details and languages they know or languages they are targetting, this affects the matchmaking service.
 * Profile Page
   - Users can edit their bio and interests to customize their profiles
 * Matchmaking
   - Users can view the profiles of potential matches (other users)
   - Users can send match requests to users
 * Chat
   - Users can text chat with other users
   - Users can have multiple chats with different users
   - Chats are kept updated and users can view previous messages

## Instructions
The user access the application by going [the URL](https://palyglot-frontend.herokuapp.com/) for the deployed application. 

They are led to the splash page, where they can choose to log in or sign up. If they choose to sign up, they enter their details such as name, email, password, gender, languages. If they choose to log in, they can simply enter their email and password. 

After login or sign up, the user is led to the profile screen. Here they can edit their bio and interests to customize their profiles by typing the in text fields and clicking the submit buttons.

Using the navigation bar at the top, the user can go to the matchmaking page and the chat page by clicking on the buttons "Find a Pal" and "My Pals" respectively.

On the matchmaking page, a user can view possible matches and their profiles and click on the users they want to match with.

On the chat page, users can select users to chat with on the left side and open up the chat screen on the right. They can send messages using the text box.
 
 ## Development requirements
You can access the app through the [Heroku link](https://palyglot-frontend.herokuapp.com/). The following are instructions to run the app locally.

You need Node.js installed on your machine. You also need npm installed. The following are packages we used:
   - Frontend:
     - @material-ui/core
     - @material-ui/icons
     - @material-ui/lab
     - @testing-library/react
     - axios
     - firebase
     - react
     - react-dom
     - react-router-dom
     - react-scripts
     - pusher-js
   - Backend:
     - bcryptjs
     - cookie-parser
     - cors
     - debug
     - express
     - jsonwebtoken
     - mongoose
     - morgan
     - pusher

Note: For specific details and version numbers, check the package.json files in the respective frontend/backend directory.

Steps to run application:
 1. Open a terminal window. Go to the backend directory.
 2. Run `npm i` and then `npm start`. This should start the backend on your local machine.
 3. Open another terminal window. Go to the frontend directory.
 4. Run `npm i` and then `npm start`. This should start the web app on your local machine.
 5. Go to http://localhost:3000/ to view the web application.
 
 ## Deployment and Github Workflow
 
On our GitHub repo, we have master, develop and hotfix branches. Whenever someone wants to add a new feature, they create an issue, create a branch called feature/<issue-number> and commit to that branch. Later, they can open up a pull request for that branch to merge to develop. If we are actively working together, we can just look at the pull request and anybody can merge it. However, when we aren't actively communicating, we try to make sure that someone other than the person who opened the pull request reviews it and merges it. We decided to use this method because this is what was taught in class, and it keeps everything organized under issues and feature branches which we can go through at later dates.

The deployment tool we are using is Heroku. We have two Heroku projects both connected to our GitHub repo. They operate on different subdirectories (frontend and backend). Whenever we have a build ready, we have a meeting to go over it and then we merge our develop branch to master. Whenever Heroku sees changes on master, it redeploys the application, both backend and frontend. Then, we can simply go to the Heroku URL to see the application. We used Heroku because it's free to deploy apps and can connect with GitHub.

 ## Licenses 
 
We will be using the GNU General Public License v3.0. This license allows others to make improvements to the application, making our project open source. We decided to do this because we like open source software, and we would love for others to help improve our application after it is released. This license also disallows people from distributing closed source versions. We wanted to keep the development of our application transparent, and this license allows that.
