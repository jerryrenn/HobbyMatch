import React, { useState, useEffect } from "react";
import axios from 'axios';
import SavedHobbiesEntry from './SavedHobbiesEntry';


const SavedHobbies = ({ uid }) => {
  {/* grab prop, and then map through prop, and display in SavedHobbiesEntry */}
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    grabHobbies(uid)
  }, [])

  const grabHobbies = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:3000/hobby/${uid}`);
      console.log('what is this response.data[0].hobbies: ', response.data)
      console.log('what is this UID: ', uid)
      setHobbies(response.data[0].hobbies);
    } catch (error) {
      console.error("Error retrieving hobbies from SavedHobbies.jsx", error);
    }
  };

  return (
    <div>
      {hobbies.length === 0 ? (
        <p>Generate and Save a Hobby!</p>
      ) : (
        hobbies.map((hobby, i) => <SavedHobbiesEntry key={i} hobby={hobby} />)
      )}
    </div>

  );
};

export default SavedHobbies;