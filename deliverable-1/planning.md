# Palygot
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**
 
 ## Mockup
 
 [Palyglot Mockup](https://www.figma.com/file/nCONeiJk8IhWaw5rTMG6Zy/PenPals-Draft?node-id=0%3A1)

## Product Details
 
#### Q1: What are you planning to build?

 > Short (1 - 2 min' read)
 
We are planning on building a platform to connect people who want to have conversations in specific languages. The concept of “Palyglot” is to create an environment for friends who regularly write to each other, usually to improve their literacy in a foreign language. Many of the online pen pal connection services today are very outdated and a lot of them use snail mail, meaning the amount of communications you can have with your penpal is very limited. Also, their UI’s are extremely outdated ([example 1](http://www.penpalworld.com/), [example 2](https://www.globalpenfriends.com/)), creating a worse user experience. We are planning on building a website that allows you to select languages you’re interested in and get matched with others with the same languages of interest. You can then communicate with them through our online messaging service and use our suite of language tools (accent keyboard, built in dictionary, etc.) to improve your language skills. This solves our problem by providing a more modern and faster way of communicating between your “pen pal”. Some use cases could be improving your fluency in a language, meeting new people who speak a certain language and simply just making friends.


#### Q2: Who are your target users?

  > Short (1 - 2 min' read max)
 * People learning new languages, such as:
    * A first year university students taking an introductory language course
    * An adult in their 30’s learning a new language as a hobby
 * An immigrant senior citizen living in the west wanting to connect with people from his home country
 * An exchange student preparing for their semester abroad by practicing their abilities in the language used in the abroad country
 * A businesswoman in her 30’s who moved to a new country and wants to meet new friends to improve her communication skills in her new language 


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

> Short (1 - 2 min' read max)

Utilizing a language is the proven best way to practice and improve your skills in that given language. For language learners who want to make progress, frequent communication is a must have. However, this can be a hard commodity to come by as many people don’t have access to other language learners or even any speakers of their language of interest. Popular language learning tools like Duolingo allow for users to frequently refresh their knowledge, but most don’t include a communication aspect where you have the ability to interface with other speakers in an everyday context. There are Penpal specific websites available, but as we said in Q1, they’re outdated in terms of the technologies they use and the way they’re designed. That's where Palyglot steps in as the modern solution to this problem.

Palyglot would save users time in the long term by allowing them to sharpen their language ability against others with similar interest and language capabilities in a realistic setting. This is a very efficient way of language learning and would be much quicker than trying to do so without the assistance of any others speaking the same language. It’s extremely difficult to learn languages if you don’t have anyone to have real conversations with, and our website eliminates that issue.

Our website will also provide a much better interface and tools to communicate in different languages than other similar services. Tools such as built in dictionaries, spell checking and accent keyboards help streamline the flow of communication and provide the users with more informative data on how many mistakes they’re making and what they can do to improve. No other penpal website has a suite of tools like this.

For those who have an interest in languages and language learning, Palyglot provides extensive tools to aid your progress. For people who want to connect with others in different countries, Palyglot also provides a means of reaching out and building new friendships. Palyglot puts people in touch with a whole new network of people looking for the same thing. Users interested in starting online friendships or learning languages will flock to Palyglot as it fills all their needs with the most up to date features available.



#### Q4: How will you build it?

> Short (1-2 min' read max)
* Our frontend will render our homepage, with authentication, then lead the user to a matchmaking component, messaging component and a profile component. The matchmaking component will communicate with the backend to retrieve new matches and to allow the user to select matches. The messaging component will communicate with the backend to retrieve matches and messages, and it will also communicate with our APIs such as the Google Translate API to run our extra features (spell checking, dictionary etc.). Lastly, the profile will also communicate with the backend to show the user their profile and allow them to edit it. For all backend requests, the backend will be retrieving data from our main server. Here is a diagram depicting the design of our system: 

![](../diagram.jpg)

* Technology Stack
  * Language: Javascript
  * Frontend: React.js
  * Backend: Node.js / Express.js
  * Database: MongoDB
  * Libraries: Mocha, Cloud Translation API Client, supertest,
  * CI/CD: Github Actions
* Our database will be deployed on MongoDB Atlas, which is a free hosting service made by MongoDB. Our frontend and backend will both be deployed on Google Cloud. We have credits for Google Cloud which we will use to host our services.
* We are planning on using the Google Translate API to handle translating text on hover, spell checking, and dictionary lookup.
* For our testing strategy, we are planning on writing unit tests to test for things like authentication (login), routing, profile creation, messaging etc. We are planning on using Mocha, which is a Javascript unit testing library. 


#### Q5: What are the user stories that make up the MVP?

Main features: Pen pal (talking to other people), learning languages.

**Note: Outer bullet points are user stories and their inner bullet points are the acceptance criteria.**

* As a student learning French, I want to meet other French speakers or learners in order to hone my French skills and increase my vocabulary.
  * Choose French as a language when matching with other users
  * Display the languages you speak so other users can match with you
  
* As someone who wants a pen pal, I want to be able to speak with others who have similar interests so that we can have fun and engaging conversations about things we both like.
  * Add interests to your profile
  * Have a matching algorithm that finds users with similar interests
  * Users should have a profile where they can introduce their interests and hobbies
  
* As a pen pal user, I want to be able to keep track of my conversations so that I can remember what I’ve been talking about with all of my pen pals.
  * A user’s conversations should be stored so that they be read by the user on demand
  * There must be a page where users can scroll through their conversations others (similar to fb messenger)
  
* As a user who values security, I want all files and links sent by others to be scanned in order to protect me from malicious users who are trying to send malware.
  * Use a third-party scanner to scan links and files for malware
  * Notify the user if one of their conversations contains a risky link
  * Warn the user on click that the link may be malicious
  * Warn the user about opening any link that was sent to them
  
* As a pen pal user, I want to be notified when someone sends me a letter so that I can read and respond to it as quickly as possible, and so that the ones who receive my messages will respond quickly as well.
  * Notify the user through email or notifications when they receive an email
  * Send reminders that the user has letters that they haven’t responded to yet
  * The notifications show which user has sent the letter and when

* As a pen pal user, I want to be able to report or block other users in order to have them punished for bad actions and so that I can stop hearing from people who are annoying me.
  * A page with rules about using the site should be shown to all new members
  * A user that is blocked should not be able to send anything to the other user or view the user’s profile
  * A user that has been reported multiple times should be banned

* As someone learning a new language, I want a quick and easy way to find a word in the language I’m learning so that I can easily insert it into my conversation and so I can expand my vocabulary.
  * User should be able to look up a word in their language and find the word in their targeted language
  * Show the definition of the new word so the user knows how to use it


## Process Details

#### Q6: What are the roles & responsibilities on the team?

* Faraz: 
  * Role: Front end, back end/database
  * Responsibilities: Matchmaking, Rewards
  * Strengths: React, Databases, Deployment
  * Weaknesses: UI/UX Design, Testing, CI/CD
* Owen:
  * Role: Back end, testing
  * Responsibilities: Authentication, unit testing, 
  * Strengths: Back end, Testing, Code review
  * Weaknesses: React, Database, Front end
* Charlie:
  * Role: Back end, testing
  * Responsibilities: matchmaking, translation API
  * Strengths: Testing, Databases, Back end
  * Weaknesses: React, Front end, CI/CD
* JJ:
  * Role: Front end, UI design
  * Responsibilities: Messaging, UI Design 
  * Strengths: React, UI Design, Back End
  * Weaknesses: Database, CI/CD, Testing
* Dom:
  * Role: Front end, back end
  * Responsibilities: Messaging, Rewards
  * Strengths: full stack web dev, Express, React
  * Weaknesses: making pretty websites, deployment, security

#### Q7: What operational events will you have as a team?

* We will have a recurring weekly meeting on Friday 5pm, online through Discord.
* During each weekly meeting, each person will go through what they have done over the week. Then we will discuss where we are in the development cycle, and what we need to be working on. We will then assign tasks for each person to do for the week.
* Later on in development, we can additionally have quick code reviews and discussion sessions every few days.
* We didn’t have a project partner. We have run the proposal by the professor as well as our TA Carson. Carson gave us some ideas, such as using the Google Translate API.

  
#### Q8: What artifacts will you use to self-organize?

* We will use Github Projects to keep track of issues with the app, features that need to be implemented, features that are being implemented and features that have been completed. 
* We will use labels in Github Projects in order to prioritize issues and features from highest to lowest.
* On Github Projects we’ll assign people to specific issues/features (we’ll do this during meetings).
* Also during meetings, we will keep a Google Doc that summarizes everything we have discussed.
* We will track progress by how many features/issues are remaining and by testing the application during meetings.


#### Q9: What are the rules regarding how your team works?

**Communications:**
* We will be using a Discord server to handle all of our communications. All team members should be attending meetings, but if you are mentioned in the Discord server for a small request/question you should provide a response within 24 hours. If it’s a bigger request, you should still mention that you’ve seen the message even if you don’t currently have time to provide a complete answer. If a member is constantly ignoring small questions (such as questions about their tasks), we will have to perform the “Non responsive team members” protocol.

**Meetings:**
* When we schedule meetings, we will have everyone RSVP on Discord. If someone misses a meeting without stating a reason, we will perform the “Non responsive team members” protocol. Every task will be put on our Github Projects board, and members will be assigned to tasks. If they do not complete their tasks, (which are visible to everyone on the board), we will perform the “Missing deadlines/incomplete work” protocol.

**Conflict Resolution:**
  * Indecisions: When we are deciding on something related to the project, we will have a vote, and that vote is final, unless new information is brought up at a later time. Since we have 5 members, there wouldn’t be any ties and majority vote would win.

  * Non responsive team members: When dealing with non-responsive team members we will attempt to contact them and understand their situation. If they don’t respond within 48 hours, we will bring the issue up with David or any of the TAs. 

  * Missing deadlines/incomplete work: If we notice that someone is behind on a certain task, as a group we will talk with them and ask if they are having difficulties and need some support on their task or if they want to be moved to a different task. If a member misses their deadlines 3 or more times, we will have to have a group discussion and possibly speak with the professors or the TAs.





----
### Highlights

* Why Palyglot?
  * Being bad at French after years of classes in school has taught us that the typical ways of teaching people a new language just don’t work. Verb tenses are cool, but we’d rather learn how to hold a conversation in a foreign language.
  * Palyglot allows users to learn a new language in an engaging way by speaking with others who know or are also learning the language. This gives you practical experience with communicating in the language that you’re learning, which we believe is a much more efficient way to learn a language than by memorizing and regurgitating your knowledge on tests.
  * Speaking with others about things you like in a language you’re learning creates a fun environment to expand your knowledge of the language and hold conversations. This plus a few other incentives in the app will encourage users to actively practice their skills in a new language and will help them become more fluent at written communication.

* Team Communication
  * Initially, we wanted to have at least 2-3 meetings per week. This allows us to stay in sync better and know how everybody is doing. The issues that come with this are that it is difficult to have everybody meet up for 1-2 hours, and having many mandatory meetings will be a burden with all of the other work that needs to be done.
  * After some reflection, we decided to have only 1 mandatory 1-2 hour meeting every week. We believe that this is all we need to understand where we are in the development process and determine what needs to be done to proceed. This means that we get to spend the rest of our time working on the project.
  * Many meetings isn't needed because most issues or questions can be answered just as easily through Discord chat. Also, many problems that arise probably won't relate to everybody's tasks (e.g. if someone is trying to fix a merge conflict, they only need to talk to the other person whose code conflicts with theirs). Therefore, instead of trying to find a time that works for everyone, members can set up mini meetings to try to find solutions to their problems.
  
* Filters for the matchmaking service
  * We discussed having different filters to give the user a selection on who they want to be matched with.
  * Alternative A: No filters, matches only based on language/interests.
  * Alternative B: Additional age filter 
  * Alternative C: Additional age and gender filters
  * Option A could be somewhat dangerous, since adults could potentially be matched with minors. We discussed making the site 18+, but we felt that was too restrictive. So, we moved onto Option B, which is to add an age filter the user can select. This eliminates minors being matched to adults (unless they specifically change the filter). However, there is also the case where a woman might not want to be matched with men (she might be intimidated by them etc.). So, we decided on going with Option C, to allow users to set the age and gender filters they want.
  
* Tech stack: 
  * Alternative A: Python Backend
  * Alternative B: Node.js Backend
  * We had a discussion on which language to build our backend with. Some of us haven't actually worked with Node.js before, so we initially considered Python for our backend. However, we saw that the APIs we wanted to use had better support on Node.js (such as Google Translate API). Also, React.js (Frontend) and Express.js (Backend) are very easy to use frameworks for web apps that are built upon Node.js. Using Node.js will allow our Frontend and Backend to be built in the same language and give us better ease of development.


