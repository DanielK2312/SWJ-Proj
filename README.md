University of Dayton

Department of Computer Science

CPS 491 - Fall 2021

Dr. Phu Phung

## Capstone II Proposal

[![Staging Branch](https://github.com/udayton-swj/cps491s22-team5/actions/workflows/staging.yml/badge.svg?branch=sprint1)](https://github.com/udayton-swj/cps491s22-team5/actions/workflows/staging.yml)

# Project Topic

# Team members

1.  Samantha Adrian, adrians1@udayton.edu
2.  Daniel Kosmin, kosmind1@udayton.edu
3.  Gabe Hoban, hobang1@udayton.edu
4.  Samuel Miller, millers51@udayton.edu

# Company Mentors

Dr. Laura Vorachek

University of Dayton English Department

300 College Park Dayton, Ohio 45469  

# Project Management Information  
Management board (private access): [Trello Board](https://trello.com/b/tJ4jWeiA/cps-491-dr-vorachek)

Source code repository (private access): [Bitbucket](https://bitbucket.org/cps491s22-team5/cps491s22-team5swj/src/main/)

Project homepage (public): [Team 5 Webpage](https://cps491s22-team5.bitbucket.io/)

## Revision History

| Date       |   Version     |  Description |
|------------|:-------------:|-------------:|
| 28/12/2021 |  0.0          | Gain access to established code repository  |
| 10/01/2022 |  0.0          | Redesign code repository to make more readable   |
| 14/01/2022 |  1.0          | Formatted the Home page |
| 17/01/2022 |  1.1          | Created an admin page |
| 24/01/2022 |  1.2          | Added dropdown to admin page |
| 25/01/2022 |  1.3          | Move to GitHub and added information to dropdown |
| 26/01/2022 |  1.4          | Edit/ delete memeber button |
| 01/02/2022 |  1.5          | Fixed Merge Conflicts |

# Overview


![Overview Architecture](https://i.imgur.com/cAV6USh.jpg)

Figure 1. - A Sample of Overview Architecture of the proposed project.

# Project Context and Scope

This project is being created in order to:  
Recover the identities of women working as journalists at the turn of the twentieth century  
Map networks of social and professional support among female journalists  
Recover a more detailed history of the early years of the SWJ (Society of Women Journalists)  
Centralize and make more widely accessible SWJ membership lists


# High-level Requirements

1. Update Admin page to allow entries to be editable
2. Allow Users to search for members based on Post Code
3. Allow Users to view connections between members with other members
4. Allow Users to search/view Marital Status of members
5. Allow Users to search/view what clubs members were a part of
6. Update entries from the Admin Page
7. Overlay Peoples Names on a Map

# Use cases

![Use Cases](https://i.imgur.com/6mFGRUQ.png)  

### 1. Access Webpage

Actor: Normal User and Admin

#### User Story

As an Application User, I want to view the main webpage of the SWJ website to look at the information about the project

#### Acceptance Criteria

```
1. User must have link to the webstite
```

#### Brief Use Case Description

User/Actor Access the website at the link and is able to view the webpages contents and begin to use the websites features

### Use Case Diagram Access Webpage

![Use Case Access Webpage](https://i.imgur.com/QNNWZGP.png)

### 2. Search Webstite for memebers based on year of membership

Actor: Normal User and Admin

#### User Story

As an Application User, I want to search the websites database for a certain member(s) based on the year of membership

#### Acceptance Criteria

```
1. User must have access to the website
2. User must input a year range to search
```

#### Brief Use Case Description

User/Actor Query the website/database for a member(s) based on a certain year. 

### Use Case Diagram Query Name

![Use Case Query Year](https://i.imgur.com/jKLDJg7.png)

### 3. Search Webstite for memebers based name of member

Actor: Normal User and Admin

#### User Story

As an Application User, I want to search the websites database for a certain member(s) based on the name of a member

#### Acceptance Criteria

```
1. User must have access to the website
2. User must input a name or part of a name of a member to search
```

#### Brief Use Case Description

User/Actor Query the website/database for a member(s) based on a name or part of a name.  

### Use Case Diagram Query Year

![Use Case Query name](https://i.imgur.com/jKLDJg7.png)

### 4. Search Webstite for memebers based on leadership position of member

Actor: Normal User and Admin

#### User Story

As an Application User, I want to search the websites database for a certain member(s) based on their leadership position  

#### Acceptance Criteria

```
1. User must have access to the website
2. User must input leadership position to search
```

#### Brief Use Case Description

User/Actor Access the website at the link and is able to view the webpages contents and begin to use the websites features

### Use Case Diagram Query Leadership Position  

![Use Case Access Webpage](https://i.imgur.com/Swvaddz.png)

### 5. Access the Admin page 

Actor: Admin

#### User Story

As the Admin I want to access the admin page so I can edit the infomation that is on the website

#### Acceptance Criteria

```
1. User must have access to the website
2. User must input correct Username and Password
```

#### Brief Use Case Description

The Admin Wants to access the admin webpage so they can edit the information on the website

### Use Case Diagram Access Admin

![Use Case Access Admin page](https://i.imgur.com/n6FIvxz.png)


### 6. Edit the infomation of a member from the Admin page

Actor: Admin

#### User Story

As the Admin I want to edit the infomation of a member on the website  

#### Acceptance Criteria

```
1. User must have access to the website
2. User must input the name of the member they want to edit the information for
3. User must input the new information for the member
```

#### Brief Use Case Description

Admin wants to edit the information of a current member on the website. 

### Use Case Diagram Edit Member

![Use Case Edit Member](https://i.imgur.com/QiEaSwG.png)  

 
### 7. Upload A photo for a member

Actor: Admin

#### User Story

As the Admin I want to add in a photo for a member on the website. 

#### Acceptance Criteria

```
1. User must have access to the website
2. User must have logged into Admin Page
3. User must have photo to Upload
4. User must find the member to add a photo to
```

#### Brief Use Case Description

The Admin wants to add a photo to a members information section

### Use Case Diagram Add photo 

![Use Case Add photo](https://i.imgur.com/2YYLFhE.png)


### 8. Delete a member from the website

Actor: Admin

#### User Story

As the Admin I want to remove a member from the website. 

#### Acceptance Criteria

```
1. User must have access to the website
2. User must input have admin access to the website
3. User must input the information of the member they want to Delete
``` 

#### Brief Use Case Description

The Admin will be able to remove members and information from the website when they need to. 

### Use Case Remove Member

![Use Case Remove Memeber](https://i.imgur.com/JTnRejP.png)

### 9. Add a member from the website

Actor: Admin

#### User Story

As the Admin I want to add a member to the website. 

#### Acceptance Criteria

```
1. User must have access to the website
2. User must input have admin access to the website
3. User must input the information of the member they want to add
```

#### Brief Use Case Description

The Admin will be able to add members and information from the website when they need to. 

### Use Case Add Member

![Use Case Add Memeber](https://i.imgur.com/58ZCxUh.png)



# System Analysis
Our System is based around the basic operation of web development where we have an established front end that communicates 
with a backend server to relay information that is coming from the user. Then we have the backend witch communicates with 
a database and relays the quiered information from the database back to the front end to dispaly results to the user. 

# System Design

_(Start from Sprint 1, keep updating)_

## Use-Case Realization
Users are able to access the website by using the correct link. Should the have the qualification, one can also access the admin page.

## Database

## User Interface

# Implementation

_(Start from Sprint 1, keep updating. However, it is important to prepare the technology from Sprint 0)_

For each new sprint cycle, update the implementation of your system (break it down into subsections). It is helpful if you can include some code snippets to illustrate the implementation

Specify the development approach of your team, including programming languages, database, development, testing, and deployment environments.

## Site
Was able to create a website that scales with different window sizes while also having all the information needed. Includes tabs that take the user to different links in order to see Contributors and References. Includes a dropdown for years.

## Admin Page
Created a page that lists all the current information about SWJ members. Uses a dropdown in order to see all the information.

# Technology

We will be using a SCRUM style development approach. Currently it is seperated into 3 different sprints.  
The technologies we will be woking with are HTML/CSS (Frameworks), JavaScript, Node.js, MongoDB, Heroku, and Docker.  
This is an ongoing project that we will be taking over from previous students in Capstone II. We will be continuing to update the website according to Dr. Vorachek's guidance and wishes.


## Deployment

Our System will be deployed to the cloud based application platform Heroku. Which allows us to remotly run and operate our application. 


# Impacts

We have chosen these technologies since they are becoming the industry standard and have the highest growth rate compared to other technologies used in similar applications.  
These technologies have also been used so far in the projects development and are some of the most maintainable technologies we can use.

# Software Process Management

We will follow the Scrum approach, thus your team needs to identify the task in each sprint cycles, team meeting schedules, including this Fall and next Spring semester. The tenative schedule and sprint cycles for Spring 2022 are as follows.
We will be following a SCRUM style approach to managment.
![Spring 2022 Timeline](https://capstones-cs-udayton.bitbucket.io/imgs/cps491timeline.png "Spring 2022 Timeline")


Include the screenshot of the timeline from your Trello board (with tasks). You can use the Trello template available here (only with timeline): [https://trello.com/b/uIgKfjr6/cps491-s21](https://trello.com/b/uIgKfjr6/cps491-s21)

Trello Board Overview

![Spring 2022 Timeline on Trello](https://i.imgur.com/1dw0R0b.jpg)

## Scrum process

### Sprint 0

Duration: 10/01/2022-16/01/2022

#### Completed Tasks: 

1. Become Familiar With the new Code Base.
2. Refactor the Code Base to make it easier to work with
3. Upadate the homepage of the website
4. Set up Heroku Docker Pipeline for deployment
5. Convert Excel Sheets to MongoDB

#### Contributions: 

1.  Daniel Kosmin, 13 hours, contributed in Refactoring the Frontend
2.  Gabe Hoban, 13 hours, contributed in Refactoring the Backend
3.  Samantha Adrian, 11 hours, contributed in Deployment to Heroku
4.  Samuel Miller,  11 hours, contributed in Refactoring the Frontend, Readme and docker deployment. 

### Sprint 1

Duration:01/18/2022-01/25/2022

#### Completed Tasks: 

1. Added dropdown to admin page
2. Move to GitHub
3. PUT STUFF OTHERS DID THAT I'M NOT THINKING OF

#### Contributions: 

1.  Daniel Kosmin, 5 commits, y hours, contributed in xxx
2.  Gabe Hoban, 12 commits, y hours, contributed in xxx
3.  Samuel Miller, 13 commits, y hours, contributed in xxx
4.  Samantha Adrian, 10 commits, 10 hours, contributed in creating a dropdown button for the admin page and formatting the information included.

#### Sprint Retrospection:

_(Introduction to Sprint Retrospection:

_Working through the sprints is a continuous improvement process. Discussing the sprint has just completed can improve the next sprints walk through a much efficient one. Sprint retrospection is done once a sprint is finished and the team is ready to start another sprint planning meeting. This discussion can take up to 1 hour depending on the ideal team size of 6 members. 
Discussing good things happened during the sprint can improve the team's morale, good team-collaboration, appreciating someone who did a fantastic job to solve a blocker issue, work well-organized, helping someone in need. This is to improve the team's confidence and keep them motivated.
As a team, we can discuss what has gone wrong during the sprint and come-up with improvement points for the next sprints. Few points can be like, need to manage time well, need to prioritize the tasks properly and finish a task in time, incorrect design lead to multiple reviews and that wasted time during the sprint, team meetings were too long which consumed most of the effective work hours. We can mention every problem is in the sprint which is hindering the progress.
Finally, this meeting should improve your next sprint drastically and understand the team dynamics well. Mention the bullet points and discuss how to solve it.)_

| Good     |   Could have been better    |  How to improve?  |
|----------|:---------------------------:|------------------:|
|          |                             |                   |


### Sprint 2

Duration: 01/25/2022-01/31/2022

#### Completed Tasks: 

1. Continuation of Sprint 1
2. Formatted the Home and Admin page
3. Fixed Merge Conflicts
4. Edit/ delete memeber button
5. Fixed Merge Conflicts

#### Contributions: 

1.  Daniel Kosmin, 5 commits, y hours, contributed in xxx
2.  Member 2, x commits, y hours, contributed in xxx
3.  Member 3, x commits, y hours, contributed in xxx
4.  Member 4, x commits, 7 hours, contributed in xxx

#### Sprint Retrospection: 

| Good     |   Could have been better    |  How to improve?  |
|----------|:---------------------------:|------------------:|
|          |                             |                   |


### Sprint x

Duration: MM/DD/YYYY-MM/DD/YYYY

#### Completed Tasks: 

1. Task 1
2. Task 2
3. ...

#### Contributions: 

1.  Member 1, x commits, y hours, contributed in xxx
2.  Member 2, x commits, y hours, contributed in xxx
3.  Member 3, x commits, y hours, contributed in xxx
4.  Member 4, x commits, y hours, contributed in xxx

#### Sprint Retrospection: 

| Good     |   Could have been better    |  How to improve?  |
|----------|:---------------------------:|------------------:|
|          |                             |                   |


# User guide/Demo

Write as a demo with screenshots and as a guide for users to use your system.

(Start from Sprint 1, keep updating)

# Acknowledgments 

Thank you to Dr. Vorachek and Dr. Phung for supporting our work and supplying a fun and interactive project to advance our skills in web development
