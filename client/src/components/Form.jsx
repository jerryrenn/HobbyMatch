import React, { useState } from "react";
import axios from 'axios';

const Form = () => {

  const [budget, setBudget] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [indoorOutdoor, setIndoorOutdoor] = useState("");
  const [participants, setParticipants] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const userPreferences = {
      budget,
      activityLevel,
      availableTime,
      indoorOutdoor,
      participants,
      type
    };

    axios.post("http://localhost:3000/hobby", userPreferences).then((response) => {
      // setBudget("");
      // setActivityLevel("");
      // setAvailableTime("");
      // setIndoorOutdoor("");
      // setParticipants("");
      // setType("");
      const result = response.data.result;
      console.log('this is the entire text: ', result);
      const paragraphs = result.split('\n\n');
      const title = paragraphs[0];
      const firstParagraph = paragraphs[1];
      const secondParagraph = paragraphs[2];
      console.log('should be an array split, 3: ', paragraphs);

      setResponse({ title, firstParagraph, secondParagraph });
    })
    .catch((error) => {
      console.error("Error registering attendee:", error);
    });
  };

  const handleRegenClick = (e) => {
    e.preventDefault();
    setResponse("");

    const userPreferences = {
      budget,
      activityLevel,
      availableTime,
      indoorOutdoor,
      participants,
      type
    };

    axios.post("http://localhost:3000/hobby", userPreferences).then((response) => {
      // setBudget("");
      // setActivityLevel("");
      // setAvailableTime("");
      // setIndoorOutdoor("");
      // setParticipants("");
      // setType("");
      const result = response.data.result;
      console.log('this is the entire text: ', result);
      const paragraphs = result.split('\n\n');
      const title = paragraphs[0];
      const firstParagraph = paragraphs[1];
      const secondParagraph = paragraphs[2];
      console.log('should be an array split, 3: ', paragraphs);

      setResponse({ title, firstParagraph, secondParagraph });
    })
    .catch((error) => {
      console.error("Error registering attendee:", error);
    });
  }

  return (
    <div>
      <h2>Choose Hobby Preferences</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Weekly Budget:
          <select required value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Select a budget</option>
            <option value="0">$0</option>
            <option value="50">$50</option>
            <option value="100">$100</option>
            <option value="200">$200</option>
            <option value="500">$500</option>
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
            <option value="1-5 hours">1-5 hours</option>
            <option value="5-10 hours">5-10 hours</option>
            <option value="15-20 hours">15-20 hours</option>
            <option value="20+ hours">20+ hours</option>
          </select>
        </label>

        <label>
          Indoor/Outdoor:
          <select required value={indoorOutdoor} onChange={(e) => setIndoorOutdoor(e.target.value)}>
            <option value="">Select your preference</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="indoor or outdoor">Both!</option>
          </select>
        </label>

        <label>
          Participants:
          <select required value={participants} onChange={(e) => setParticipants(e.target.value)}>
            <option value="">Select your preference</option>
            <option value="Solo">Solo</option>
            <option value="2-3">2-3</option>
            <option value="3-4">3-4</option>
            <option value="4+">4+</option>
          </select>
        </label>

        <label>
          Adventure/Relaxing:
          <select required value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select your preference</option>
            <option value="Relaxing">Relaxing</option>
            <option value="Moderate">Moderate</option>
            <option value="Adventurous">Adventurous</option>
            <option value="relaxing or adventurous">Surprise me</option>
          </select>
        </label>


        <button type="submit">Generate Hobby!</button>
      </form>

      {response && (
        <div>
        <h3>Generated Hobby:</h3>
        <strong>{response.title}</strong>
        <p>{response.firstParagraph}</p>
        <p>{response.secondParagraph}</p>
        <button onClick={handleRegenClick}>Regenerate</button>
        </div>
      )}

    </div>
  );
};

export default Form;