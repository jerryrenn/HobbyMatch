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
    const { budget, activityLevel, availableTime} = req.body;
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an article writer, that generates hobbies based on user preferences' },
          { role: 'user', content: `I have a budget of ${budget} & "${availableTime} a week. I am ${activityLevel}. Please generate me a random hobby. Start your response with just the hobby as a title, wrapped in * to indicate it should be bold. In a paragraph below, give a 3 sentence introduction of the hobby. In another paragraph, write me 3 sentences on how to get started with the hobby. There should be 3 line separations, please include \n for the line separations."` },
        ],
        temperature: 0.6,
        max_tokens: 200,
      });
      const response = completion.data.choices[0].message.content;
      console.log(response);
      res.json({ result: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}
