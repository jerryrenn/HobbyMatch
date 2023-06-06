import React, { useState, useEffect } from "react";


const SavedHobbiesEntry = ({hobby}) => {

  return (
    <div className="hobbyEntry">
      <h2 className="hobbyEntryTitle">{hobby.title}</h2>
      <p className="hobbyEntryDescription">{hobby.description}</p>
    </div>
  );
};

export default SavedHobbiesEntry;
