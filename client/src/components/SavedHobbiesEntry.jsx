import React, { useState, useEffect } from "react";
import axios from 'axios';

const SavedHobbiesEntry = ({hobby, uid, filterHobbies}) => {

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:3000/hobby/${uid}/${hobby.title}`);
      filterHobbies(hobby.title);
    } catch (error) {
      console.error("Error deleting hobby:", error);
    }
  };

  return (
    <div className="hobbyEntry">
      <h2 className="hobbyEntryTitle">{hobby.title}</h2>
      <p className="hobbyEntryDescription">{hobby.description}</p>
      <button onClick={handleDeleteClick}>Delete Hobby</button>
    </div>
  );
};

export default SavedHobbiesEntry;
