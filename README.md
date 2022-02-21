# SMILE GIVERS APP (Front-End)

## COURSE INFO
ID : CSX4107 <br />
Name : Web Application Development <br />
Assignment : Final Project

----------------------------------------------------

## TEAM MEMBERS 
- SUTISAN NILRATTANAKUL (6213221) <br />
- WANITCHA SRITHONGCHUAY (6213365) 

----------------------------------------------------

## PROJECT DESCRIPTION
### STAKEHOLDERS
1. Admin/Distributor 
   > acts as the site administrators who is/are responsible for managing the requested items and donation requests. (i.e., Charity Foundation)
2. Donator/Supporter
   > can check for current needed items and choose to donate any listed items.

### ENTITIES
1. User
2. Item
3. DonationRequest

### FUNTIONALITIES
The three entities have the following CRUD operations:
> CRUD = CREATE, READ, UPDATE, DELETE <br />
> Rest API = GET, POST, PUT, PATCH, DELETE
1. **Admin/Distributor** <br />
   can..
   - add needed items (POST)
   - update items (PUT, PATCH)
   - check for donation requests (GET)
   - remove needed items after success distribution (DELETE) <br />
     > *item distribution is done outside the system*
   - remove donation requests after receiving donated items (DELETE) 
     > *donation acceptance is done outside the system*
2. **Donator/Supporter** <br />
   can..
   - check for needed items (GET)
   - request to donate items (POST)
   - update donation (PUT, PATCH)
   - cancel donation (DELETE)

----------------------------------------------------

## TECH STACK
This project uses **MERN** Stack for implementation.
> MERN = MongoDB, Express, React, Node <br />
> Front-end : React.js <br />
> Back-end : Express.js

First, please make sure you have installed the followings:
- Node.js (JavaScript Run-time) <br />
  https://nodejs.org/en/download/
  
- yarn (Package Manager)
  ```
  npm install -g yarn
  ```
  - Check yarn version
    ```
    yarn --version
    ```

How to run this App?
1. **Back-end**
   ```
    yarn dev
    ```
2. **Front-end**
   ```
    yarn start
    ```
