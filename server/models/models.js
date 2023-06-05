const { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, getDocs, where, deleteDoc } = require('firebase/firestore')
const db = require('../database');

module.exports = {

  getHobbiesFromDB: async () => {
    try {
      const hobbiesRef = collection(db, 'hobbies');
      const snapshot = await getDocs(hobbiesRef);
      const hobbies = [];

      snapshot.forEach((doc) => {
        const hobby = doc.data();
        hobbies.push(hobby);
      });

      return hobbies;
    } catch (error) {
      console.error('Error getting hobbies:', error);
      throw error;
    }
  }

}