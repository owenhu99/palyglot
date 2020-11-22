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
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 ## Deployment and Github Workflow
 
On our GitHub repo, we have master, develop and hotfix branches. Whenever someone wants to add a new feature, they create an issue, create a branch called feature/<issue-number> and commit to that branch. Later, they can open up a pull request for that branch to merge to develop. If we are actively working together, we can just look at the pull request and anybody can merge it. However, when we aren't actively communicating, we try to make sure that someone other than the person who opened the pull request reviews it and merges it. We decided to use this method because this is what was taught in class, and it keeps everything organized under issues and feature branches which we can go through at later dates.

The deployment tool we are using is Heroku. We have two Heroku projects both connected to our GitHub repo. They operate on different subdirectories (frontend and backend). Whenever we have a build ready, we have a meeting to go over it and then we merge our develop branch to master. Whenever Heroku sees changes on master, it redeploys the application, both backend and frontend. Then, we can simply go to the Heroku URL to see the application. We used Heroku because it's free to deploy apps and can connect with GitHub.

 ## Licenses 
 
We will be using the GNU General Public License v3.0. This license allows others to make improvements to the application, making our project open source. We decided to do this because we like open source software, and we would love for others to help improve our application after it is released. This license also disallows people from distributing closed source versions. We wanted to keep the development of our application transparent, and this license allows that.
