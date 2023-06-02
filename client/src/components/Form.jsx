import React, { useState } from "react";
import axios from 'axios';

const Form = () => {

  const [budget, setBudget] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [response, setResponse] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const userPreferences = {
      budget,
      activityLevel,
      availableTime,
    };

    axios.post("http://localhost:3000/hobby", userPreferences).then((response) => {
      setBudget("");
      setActivityLevel("");
      setAvailableTime("");
      setResponse(response.data.result)

      console.log('is this happening')
    })
    .catch((error) => {
      console.error("Error registering attendee:", error);
    });
  };

  return (
    <div>
      <h2>Choose Hobby Preferences</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Weekly Budget:
          <select required value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Select a budget</option>
            <option value="0">$0</option>
            <option value="10">$10</option>
            <option value="25">$25</option>
            <option value="50">$50</option>
            <option value="100">$100</option>
          </select>
        </label>
        <label>
          Activity Level:
          <select required value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="">Select your activity level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Moderately Active">Moderately Active</option>
            <option value="Very Active">Very Active</option>
          </select>
        </label>

        <label>
          Available Time:
          <select required value={availableTime} onChange={(e) => setAvailableTime(e.target.value)}>
            <option value="">Select your available time</option>
            <option value="Less than 1 hour">Less than 1 hour</option>
            <option value="1-2 hours">1-2 hours</option>
            <option value="2-3 hours">2-3 hours</option>
            <option value="3-4 hours">3-4 hours</option>
            <option value="4-5 hours">4-5 hours</option>
            <option value="More than 5 hours">More than 5 hours</option>
          </select>
        </label>


        <button type="submit">Generate Hobby!</button>
      </form>

      {response && (
        <div>
          <h3>Generated Hobby:</h3>
          <p>{response}</p>
        </div>
      )}

    </div>
  );
};

export default Form;