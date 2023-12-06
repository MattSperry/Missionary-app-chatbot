import { Configuration, OpenAIApi } from "openai";

let missionaryInputArr = [];
let botOutputArr = [];

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const user = req.body.user || '';
  if (user.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid input",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(user, missionaryInputArr, botOutputArr),
      temperature: 0.6,
      max_tokens: 128,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function addToConversation(input) {
  missionaryInputArr.push(input);
  console.log(missionaryInputArr);
}


function generateConversation(missionaryInputArr, botOutputArr) {
  let conversationText = '';
  for (let i = 0; i < missionaryInputArr.length; i++) {
    conversationText = conversationText + 'Missionary: ' + missionaryInputArr[i] + '\n';
    //  + '\n' + 'You: ' + botOutputArr[i] + '\n';
  }
  console.log('Loop: ' + conversationText);
  return conversationText;
}

function generatePrompt(user, missionaryInputArr, botOutputArr) {
  const previousConversation = generateConversation(missionaryInputArr, botOutputArr);
  const input =
    user[0].toUpperCase() + user.slice(1).toLowerCase();

  addToConversation(input);
  console.log('its working: ' + previousConversation);
  return `You are a therapist talking to an LDS missionary. 
  Respond with advice in harmony with the gospel of Jesus Christ or backed by science
${previousConversation}

Missionary: ${input}
You:`;
}
