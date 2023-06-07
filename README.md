# HobbyMatch

Find The Perfect Hobby ⚽
Struggling to find something to do? HobbyMatch is perfect for you! Discover your passion and explore new hobbies with my interactive AI generated hobby recommender. Get personalized hobby recommendations tailored to your interests and preferences. From adventurous outdoor activities to creative indoor pursuits, our platform helps you find the perfect hobby to enrich your life. Start your journey today and unlock a world of endless possibilities!

## Table of Contents

1. [Technologies](#technologies)
2. [Visuals](#visuals)
3. [API Endpoints](#api-endpoints)
4. [Getting Started](#getting-started)
5. [Code Example](#code-example)
6. [Wins and Improvements](#wins-and-improvements)

## Technologies

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Google Firestore](https://firebase.google.com/)
- [Google Firebase Authentication](https://firebase.google.com/)

## Visuals

![storeFront Solutions Home Page](./loader.io-test.png)


## API Endpoints

The following endpoints are available for interacting with the HobbyMatch:

- `GET /hobby/:uid`: Retrieves all hobbies by user ID from a signed in user.
- `POST /saveHobby`: Saves a hobby to Google Firestore's database under a user's ID.
- `DELETE /hobby/:uid/:title`: Deletes a hobby from Google Firestore's database by title.

## Getting Started

To run HobbyMatch locally, follow these steps: 

1. Clone the repository: `git clone https://github.com/your-username/HobbyMatch.git`.
2. Install dependencies: `npm install`.
3. If you want to create your own Firebase project, rname the `.env.example` file to `.env` and update the configuration settings.
5. Start the server in development mode: `npm run server-dev`.

## Code Example

This portion of the code resides in the controllers.js file, which performs basic CRUD operations with Google Firestore.
```
    getHobbiesFromDB: async (uid) => {
    try {
      const hobbiesRef = collection(db, 'hobbies');
      const querySnapshot = await getDocs(hobbiesRef);

      const hobbies = [];
      querySnapshot.forEach((doc) => {
        const hobby = doc.data();
        if (doc.id.includes(uid)) {
          hobbies.push(hobby);
        }
      });

      return hobbies;
    } catch (error) {
      console.error('Error getting hobbies from models:', error);
      throw error;
    }
  }
```
credit @[jerryrenn](https://github.com/jerryrenn)

## Wins and Improvements

Successfully developing a full-stack application while learning Google Firestore DB and Firebase Authentication within a timebox of 3 days was a notable accomplishment. In addition, using vanilla CSS to produce a visually appealing and web accessible application without frameworks helped refine my CSS capabilities. Although the application currently lacks mobile compatibility, an area for further optimization and improvement would involve recreating the application using React Native.
