import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API }); // Make sure the key is correct!

export async function generateResponse(history, habitsInfo) {
    const systemInstruction = {
        role: "user",
        parts: [{ text: `You are a Habit Coach. No markdowns or html tags, just plain text.\n Make the Response medium by default having 3 to 4 lines of text. If the prompt mentioned a "detail" or "more" then process accordingly.\nHere is some context about the user's habits:\n${habitsInfo}` }]
    };

    // Map the chat history to the format expected by the Gemini API
    const contents = history.map(turn => ({
        role: turn.role,
        parts: [{ text: turn.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',  // use stable model
      contents: [systemInstruction, ...contents]
    });

    return response.text; // 'response.text' holds the generated output
}
