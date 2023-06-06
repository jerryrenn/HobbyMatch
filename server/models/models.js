const { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, getDocs, where, deleteDoc, arrayUnion } = require('firebase/firestore')
const db = require('../database');

module.exports = {

  getHobbiesFromDB: async (uid) => {
    try {
      const hobbiesRef = collection(db, 'hobbies');
      const querySnapshot = await getDocs(
        query(hobbiesRef, where('uid', '==', uid))
      );
      const hobbies = [];

      querySnapshot.forEach((doc) => {
        const hobby = doc.data();
        hobbies.push(hobby);
      });

      return hobbies;
    } catch (error) {
      console.error('Error getting hobbies from models:', error);
      throw error;
    }
  },

  saveHobbyToDB: async (hobbyData) => {
    try {
      const docRef = doc(db, 'hobbies', hobbyData.uid);
      await updateDoc(docRef, { hobbies: arrayUnion(hobbyData) });
      console.log('Hobby saved successfully');
    } catch (error) {
      console.error('Error saving hobby from models:', error);
    }
  }

}