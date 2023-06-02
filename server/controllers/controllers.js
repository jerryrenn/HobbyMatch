require('dotenv').config();
const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.PAT,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = (hobby) => {
  // Generate the prompt based on the given hobby
  return `Tell me about a random hobby: ${hobby} in 3 sentences please`;
};

module.exports = {

  getHobby: async (req, res) => {

    console.log(req.body)
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that translates English to French.' },
          { role: 'user', content: `Translate the following English text to French: "${req.body.interests}"` },
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
