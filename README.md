<h1 align="center">🚕 Ride 🚕</h1>

<h5 align="center">  By:  <a href="https://github.com/Jared-Kunhart">Jared Kunhart</a> - <a href="https://r1de-app.herokuapp.com/"><i>Live site</i></h5>

### Table of Contents
- [Main purpose](#main)
- [Trips](#trips)
- [Reviews](#reviews)
- [Conclusion](#conclusion)

## Main

#### Key Features
- Trips
- Reviews

#### Technology used

![alt text](https://github.com/Workshape/tech-icons/blob/master/icons/git.svg)
![alt text](https://github.com/Workshape/tech-icons/blob/master/icons/heroku.svg)
![alt text](https://github.com/Workshape/tech-icons/blob/master/icons/javascript.svg)
![alt text](https://github.com/Workshape/tech-icons/blob/master/icons/nodejs.svg)
![alt text](https://github.com/Workshape/tech-icons/blob/master/icons/postgres.svg)
![alt text](https://github.com/Workshape/tech-icons/blob/master/icons/react.svg)
![alt text](https://github.com/Workshape/tech-icons/blob/master/icons/python.svg)

#### How to use this application
1. Clone this repository (https://github.com/Jared-Kunhart/Ride.git)
2. Install dependencies - pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3. Create a .env file based on the .env.example with proper settings required for the development environment
4. Setup PostgreSQL user, password and database and to make sure it matches the .env file
5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
6. pipenv shell
7. flask db upgrade
8. flask seed all
9. flask run
10. To run the React App in development, checkout the README inside the react-app directory.

## Trips
  After signing in enter your current location and where you'd like to go !
  
![image](https://user-images.githubusercontent.com/89172742/169740841-45a98094-6113-40e6-b847-fb9b5a9d21c9.png)

  After that you can cancel your ride, update your destionation or complete your ride to leave a review !
  
![image](https://user-images.githubusercontent.com/89172742/169741559-015a4930-de03-432c-84f4-32ef3e9f9938.png)


## Reviews
  Leave a review for your driver after completing a ride !

## Conclusion
  My favorite part about this project is how modular it is, I'll be working on this one for several more months adding features like autocomplete, directions service, a drivers login, a chat feature for driver/rider, moving markers and deck.gl implementation.
