# Palygot
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What are you planning to build?

 > Short (1 - 2 min' read)
 
We are planning on building a platform to connect people who want to have conversations in specific languages. The concept of “pen pals” is friends who regularly write to each other, usually to improve their literacy in a foreign language. Many of the online pen pal connection services today are very outdated and a lot of them use snail mail, meaning the amount of communications you can have with your penpal is very limited. Also, their UI’s are extremely outdated (example 1, example 2), creating a worse user experience. We are planning on building a website that allows you to select languages you’re interested in and get matched with others with the same languages of interest. You can then communicate with them through our online messaging service and use our suite of language tools (accent keyboard, built in dictionary, etc.) to improve your language skills. This solves our problem by providing a more modern and faster way of communicating between your “pen pal”. Some use cases could be improving your fluency in a language, meeting new people who speak a certain language and simply just making friends.


#### Q2: Who are your target users?

  > Short (1 - 2 min' read max)
 * People learning new languages
    * A first year university students taking an introductory language course
    * An adult in their 30’s learning a new language as a hobby
 * An immigrant senior citizen living in the west wanting to connect with people from his home country
 * An exchange student preparing for their semester abroad by practicing their abilities in the language used in the abroad country
 * A businesswoman in her 30’s who moved to a new country and wants to meet new friends to improve her communication skills in her new language 


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

> Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate?

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

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * If you have a partner, these must be reviewed and accepted by them
 * The user stories should be written in Github and each one must have clear acceptance criteria.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)

#### Q7: What operational events will you have as a team?

Describe meetings (and other events) you are planning to have. 
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You must have at least 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * What did you discuss during the meetings?
   * What were the outcomes of each meeting?
   * You must provide meeting minutes.
   * You must have a regular meeting schedule established by the second meeting.  
  
#### Q8: What artifacts will you use to self-organize?

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?

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
