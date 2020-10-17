# Palygot
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**
 
 ## Mockup
 
 [Palyglot Mockup](https://www.figma.com/file/nCONeiJk8IhWaw5rTMG6Zy/PenPals-Draft?node-id=0%3A1)

## Product Details
 
#### Q1: What are you planning to build?

 > Short (1 - 2 min' read)
 
We are planning on building a platform to connect people who want to have conversations in specific languages. The concept of “pen pals” is friends who regularly write to each other, usually to improve their literacy in a foreign language. Many of the online pen pal connection services today are very outdated and a lot of them use snail mail, meaning the amount of communications you can have with your penpal is very limited. Also, their UI’s are extremely outdated ([example 1](http://www.penpalworld.com/), [example 2](https://www.globalpenfriends.com/)), creating a worse user experience. We are planning on building a website that allows you to select languages you’re interested in and get matched with others with the same languages of interest. You can then communicate with them through our online messaging service and use our suite of language tools (accent keyboard, built in dictionary, etc.) to improve your language skills. This solves our problem by providing a more modern and faster way of communicating between your “pen pal”. Some use cases could be improving your fluency in a language, meeting new people who speak a certain language and simply just making friends.


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

Utilizing a language is the proven best way to practice and improve your skills in that given language. For language learners who want to make progress, frequent communication is a must have. However, this can be a hard commodity to come by as many people don’t have access to other language learners or even any speakers of their language of interest. Popular language learning tools like Duolingo allow for users to frequently refresh their knowledge, but most don’t include a communication aspect where you have the ability to communicate with other speakers in an everyday context. There are Penpal specific websites available, but as we said in Q1, they’re outdated in terms of the technologies they use and the way they’re designed. 

Our website would save users time in the long term by allowing them to use their language ability against others with similar interest and language capabilities in a real world setting. This is a very efficient way of language learning and would be much quicker than trying to do so without any others speaking the same language. It’s extremely difficult to learn languages if you don’t have anyone to have real conversations with, and our website eliminates that issue.

Our website will also provide a much better interface and tools to communicate in different languages. Tools such as built in dictionaries, spell checking and accent keyboards help streamline the flow of communication and provide the users with more informative data on how many mistakes they’re making and what they can do to improve. No other penpal website has a suite of tools like this.

For those who have an interest in language, Palyglot provides extensive tools to aid your language learning. For people who want to connect with people in different countries, Palyglot also provides a means of reaching out and building friendships. Palyglot puts people in touch with a whole new network of people looking for the same thing.



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

*Note: Outer bullet points are user stories and their bullet points are the acceptance criteria

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

Describe your team's working culture.

**Communications:**
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?
 
**Meetings:**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 
**Conflict Resolution:**
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?




----
### Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections. 
