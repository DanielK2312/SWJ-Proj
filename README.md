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

Source code repository (private access): [Github](https://github.com/udayton-swj)

Project homepage (public): [Team 5 Webpage](https://cps491s22-team5.bitbucket.io/)

## Revision History

| Date       |   Version     |  Description |
|------------|:-------------:|-------------:|
| 28/12/2021 |  0.0          | Gain access to established code repository  |
| 10/01/2022 |  0.0          | Redesign code repository to make more readable   |
| 17/01/2022 |  1.0          | Deploy Code base to Heroku.   |
| 24/01/2022 |  1.1          | Design Homepage to Clients Specifications   |
| 31/01/2022 |  1.2          | Implement base Admin page   |
| 07/01/2022 |  1.3          | Add additional features to homepage and admin page   |

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
1. User must have access to the websit
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

## Database   

We are using MongoDB to store our data that is converted from an Excelsheet.  
Then we are using APIs and javascript to access the information stored in the Database before displaying it to the users.  


## User Interface
![Homepage](https://i.imgur.com/F20aLGR.jpg)

For the UI we are using CSS and HTML to style the webpage and recieve user input.  
# Implementation

For our implementation our team is using HTML, Javascript, and CSS to develop our project.   
Tools we are using include: Heroku for Deployment, Github for code managment, and MongoDB for the Database.
We are using a Scrum style development approach were we meet daily to discuss what needs to be done, what progress has been made since the previous meeting, and what we have planned for the next 24 hours.   
To help with our Scrum development we are utilizing Trello to stay organized and keep track of what tasks need to be done and by who.   

For the frontend of our project we are utilizing HTML and Javacript to get input fromt the user and to display differnt items when requested. 

For the backend of our project we are using Javascript to query our database to retrieve infomration when requested by the frontend. 

For testing of our application we are using a CICD Pipeline to push our changes to a staging application hosted on Heroku Servers. Here we can view what we are doing and the implementation so far in the project before pushing final changes to the public website.   


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


Trello Board Overview
(Update here) 
![Spring 2022 Timeline on Trello](https://i.imgur.com/G1M94t0.png)
Our Team has Opted for longer sprint to allow ample time for trickier tasks that will need more time to complete.  
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

Duration: 17/01/2022-01/03/2022

#### Completed Tasks: 

1. Redesign Homepage Astetic 
2. Add Seperated Homepage Content
3. Add Admin Page
4. Link Database to Admin Page
5. Add Functionality to Admin Page

#### Contributions: 

1.  Daniel Kosmin,   ~20 commits, ~35 hours, contributed in Frontend development with the main homepage
2.  Samuel Miller,   ~13 commits, ~25 hours, contributed in Adding Functionality to the Admin Page and developing the Admin Page
3.  Samantha Adrian, ~14 commits, ~25 hours, contributed in Adding Functionality to the Admin Page and developing the Admin Page
4.  Gabriel Hoban,   ~20 commits, ~35 hours, contributed in Developing the Admin Page and Managing the Database

#### Sprint Retrospection:

| Good                                                         |                                           Could have been better                                           |                                                           How to improve? |
| ------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------: |
| We were able to meet/exceed the client sexpectations on what she wanted done.     | There was idile time when waiting for other parts of the project to be finished.                           |      Make sure during meetings we are asking for help with struggle areas.|
| Everyones efforts were visable on the project.                                    | Some miss-coumunication with ideas about direction of project.                                               |       Add more detail to the trello board to lessen confusion.            |
|                |                                                                                                            |                                                                           |



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

## For Regular Members: 
Begin by Accesses the website at https://swj-capstone.herokuapp.com/  
![Homepage](https://i.imgur.com/zUQFVeD.jpg)

After accessing the homepage feel free to explore around and discover the History of the Society of Womens Journalists, by searching for names, leadership positions and year!  

You can also check out the Contributions for the project by clicking on the contriutor tab!
![Contributions](https://i.imgur.com/Siu9YdU.png)

The References for the Project are also available in the References tab!
![References](https://i.imgur.com/azOW4lL.png)


## For Admin Members: 

Begin by Accessing the Admin Page at https://swj-capstone.herokuapp.com/admin/pages/login.html  
![Admin login](https://i.imgur.com/wclGkfj.png)
After you have logged in you will be redirected to the Admin Homepage  
![Admin Homepage](https://i.imgur.com/NgcYTIx.png)
At the Admin Homepage you can view the database of members and add new members. 
![Admin Tables](https://i.imgur.com/5eBzPbT.png)
Create Member(Below)
![Admin Add Member](https://i.imgur.com/oxOtbZq.png)

(Start from Sprint 1, keep updating)

# Acknowledgments 

Thank you to Dr. Vorachek and Dr. Phung for supporting our work and supplying a fun and interactive project to advance our skills in web development
