import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API }); // Make sure the key is correct!

export async function generateResponse(prompt) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',  // use stable model
      contents: [
        {
          role: "user",
          parts: [
            { text: `You are a Habit Coach. No markdowns or html tags, just plain text.\n Make the Response shorter by default. If the prompt mentioned a "detail" or "more" then process accordingly. Prompt: ${prompt}` }
          ]
        }
      ]
    });

    console.log(response.text);
    return response.text;           // 'response.text' holds the generated output
}
