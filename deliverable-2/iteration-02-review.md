
# Team 30 - Penpal

*This is the non-partner project Palyglot, previously known as Penpal, from team 30.*

## Iteration 02 - Review & Retrospect

 * When: November 23, 2020
 * Where: Online

## Process - Reflection


### Q1. Decisions that turned out well

#### 1. Git workflow 

We had decided early on to divide and distribute work using GitHub issues. We made issues for key features after our initial meetings and added more issues for specific problems later on. Then we created branches from the main development branch for each issue and self-assigned an issue to work on.

When we think we've finished with a feature, we make a pull request of that particular issue branch to merge into the develop branch and have one of us peer-review the code. They take a brief look at the code and decide to approve it or make changes to it.

This was a successful decision since we are able to divide the workload ahead of time and give people the freedom to make progress with their assigned feature at any time. Since we are have differing schedules, this allowed us to progress at our own pace without having to touch base with everyone every time. 

It also made it easy to track our progress and the changes made. If a feature breaks or there occurs a bug anywhere, we are able to quickly navigate to the specific part of the code base that caused the problem by going back to the corresponding pull request and looking at the commit history associated with the issue.

Examples: [instructions](https://github.com/csc301-fall-2020/team-project-30-penpals/blob/master/README.md), [issue #11](https://github.com/csc301-fall-2020/team-project-30-penpals/issues/11)  ([pull request](https://github.com/csc301-fall-2020/team-project-30-penpals/pull/31)), [issue #5](https://github.com/csc301-fall-2020/team-project-30-penpals/issues/5) ([pull request](https://github.com/csc301-fall-2020/team-project-30-penpals/pull/24))

#### 2. Team roles

The way we divided team roles was also very successful. We initially started with the basic roles assigned in deliverable 1. Then as we began to research our roles and the kind of work and knowledge required, we made some changes, for example, one of us who was in charge of the front end and helped make the UI wireframe was moved to the backend as he had very little experience with React and more experience with backend and routing.

So in the end, we had two people dedicated on the backend, one person dedicated on the front end, and two people working on both frontend and backend. This decision allowed us to get lots of code written quickly by the people with one dedicated job and the two people working on both sides were able to connect the frontend and backend smoothly as they have a better picture of the overall application. This improved abstraction on the code base and helped signficantly with coupling and compatibility. It also made debugging a lot more efficient.

> List **process-related** (i.e. team organization and how you work)
> decisions that, in retrospect, turned out to be successful.
> 
> 
>  * 2 - 4 decisions.  
>  * Ordered from most to least important.  
>  * Explain why (i.e. give a supporting argument) you consider a decision to be successful.  
> * Feel free to refer/link to process artifact(s).

### Q2. Decisions that did not turn out as well as we hoped

#### 1. Team meeting / Agile methodologies

We did not have a set meeting time to touch base and plan the work for the week. We would agree to meet online at a certain time, but they often time got cancelled or rearranged due to last-minute schedule changes to one or more of the members. This resulted in us having very sparse meeting sessions and too lenient and flexible of a work schedule.

Also, as a result of not having frequent meetings, we did not set concrete deadlines for features we are working on individually. Therefore, for a lot of key features, we were not able to optimize the workflow and had to wait for certain features to be finished by another member before we got to work on another feature that was dependent. This significantly pushed back our initial plan and combined with some miscommunication, resulted in big delays in the completion of our deployment.

Similar to the problem with regular team meeting, we lacked a rigid framework that everyone follows to ensure an optimized and clear working pipeline. We did not implement any specific agile methodology and spent very little time deciding on the overall framework that we want to follow while working remotely. For example, we did not have regular check-ups on members and their progress, and we did not have any retroactive discussion/reflection after a feature or portion of the app was completed.

#### 2. Communications

Our group members all liked to work on their own and try to implement their feature with what they considered the ideal dependancy uses and design choices. While this led us to getting lots of work done quickly, it also created miscommunication where changes would be made to previously agreed upon and implemented features without everybody becoming aware. There were multiple instances where a dependancy was changed or a class was redisigned only later for somebody to realize and mention that our code no longer works due to a change nobody realized even occured. We realize that our willingness to leave each of us to our own ends leaves some much needed planning and information out of the development process.

#### 3. CI/CD

We initially set up CI with GitHub Actions and meant to use it as an integral part of our development. However, during development, we failed to write any meaningful tests that would help with development and this resulted in a lot of revisiting of completed features to fix bugs that were not caught when the pull requests were merged.

> List **process-related** (i.e. team organization and how you work)
> decisions that, in retrospect, were not as successful as you thought
> they would be.
> 
>  * 2 - 4 decisions.  
>  * Ordered from most to least important.  
>  * Explain why (i.e. give a supporting argument) you consider a decision to be unsuccessful  
> * Feel free to refer/link to process artifact(s).


### Q3. Planned changes

#### 1. Object Abstraction

Our group has had issues properly abstracting our features which compounded any communication issues we were having. Many of our designs' usage required specific knowledge of the code's innerworkings to use and required unneccesary back and forth as one person waited for another to finish their code or asked them to change an implementation to work around their own change. Because we chose to each design our own feature instead of designing the whole thing properly as a team from the base up, we didn't abstract our design enough and had far too much confusing information and commands that did not fit with the rest of the project as a whole. We plan to improve on this moving forward by being more conscious with our abstraction and spending time more frequently to go over design together, as we will show in the following section.

#### 2. Group Meeting Timing

Our team's original plan for meeting and conversing as a group was flawed and we hope to fix the underlying issues going forward. We were meeting semi-regularly and having longer sessions, mainly going over what needed to be done in the future and possible issues and plans for the layout of the project. This was flawed in that having meetings that were not often enough caused us to lose touch with eachother's progress and turned what could be quickly solvable issues into longer running problems that people were not made aware of. Having more frequent and shorter meetings will fix these problems by giving us a space to talk over these issues as they come up and solve them as a group using our varied experience.


> List any **process-related** (i.e. team organization and how you work)
> changes you are planning to make (if there are any)
> 
>  * Ordered from most to least important.  
>  * Explain why you are making a change.


## Product - Review

### Q4. How was your product demo?
 * How did you prepare your demo?
 * What did you manage to demo to your partner?
 * Did your partner accept the features?
 * Were there change requests?
 * What did you learn from the demo from either a process or product perspective?
 * *This section will be marked very leniently so keep it brief and just make sure the points are addressed*

