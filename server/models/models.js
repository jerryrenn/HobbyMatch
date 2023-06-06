const { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, getDocs, where, deleteDoc, arrayUnion } = require('firebase/firestore')
const db = require('../database');

module.exports = {

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
  },

  saveHobbyToDB: async (hobbyData) => {
    try {
      const docRef = doc(db, 'hobbies', hobbyData.uid);
      await setDoc(docRef, { hobbies: arrayUnion(hobbyData) }, { merge: true });
      console.log('Hobby saved successfully');
    } catch (error) {
      console.error('Error saving hobby from models:', error);
    }
  },

  deleteHobbyFromDB: async(uid, hobbyTitle) => {
    try {
      const hobbyDocRef = doc(db, "hobbies", uid);
      const hobbyDocSnap = await getDoc(hobbyDocRef);

      if (!hobbyDocSnap.exists()) {
        throw new Error("Hobby not found from models");
      }

      const hobbyData = hobbyDocSnap.data();
      const updatedHobbies = hobbyData.hobbies.filter((hobby) => !hobby.title.includes(hobbyTitle));

      await setDoc(hobbyDocRef, { hobbies: updatedHobbies });

      console.log("Hobby deleted successfully");
    } catch (error) {
      console.error("Error deleting hobby from models:", error);
      throw error;
    }
  }
}