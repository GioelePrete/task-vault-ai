// Import the necessary classes from the "openai" module.
import {Configuration, OpenAIApi} from "openai";

// Create a configuration object for the OpenAI API, including the API key.
// The API key is retrieved from the environment variable "OPENAI_API_KEY".
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of the OpenAIApi class using the configuration.
const openai = new OpenAIApi(configuration);

// Export the created OpenAI API instance for use in other parts of the application.
export default openai;
