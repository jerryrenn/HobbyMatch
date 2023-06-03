require('dotenv').config();
const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.PAT,
});

const openai = new OpenAIApi(configuration);


module.exports = {

  getHobby: async (req, res) => {
    console.log('getHobby initiated...');
    const { budget, activityLevel, availableTime, indoorOutdoor, participants, type} = req.body;

    let messages = [
      { role: 'system', content: 'You are an article writer, that generates interesting and unqiue hobbies based on user preferences' },
      { role: 'user', content: `I need you to generate a random hobby based on my preferences, it can be literally any hobby you can think of. Be creative! I have a budget of ${budget} & "${availableTime} a week. I am ${activityLevel}.  I want the recommendation to be an ${indoorOutdoor} activity. The activity should include ${participants} participants and should be ${type}. Don't be boring and recommend rock climbing or gardening, think outside the box! Start your response the hobby as a title with a colon after it. In a paragraph below, give a 4 sentence introduction of the hobby. In another paragraph, write me 4 sentences on how to get started with the hobby. There should be 3 line separations, please include \n for the line separations."` },
    ];

    try {
      if (req.body.message) {
        messages.push({ role: 'user', content: req.body.message });
      }
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.8,
        max_tokens: 200,
      });
      console.log('number of response: ', messages.length)
      const response = completion.data.choices[0].message.content;
      console.log(response);
      res.json({ result: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}
