import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// GoogleGenAI constructor automatically looks for the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({});

export async function getAIIntent(offer, lead) {
    // We use gemini-2.5-flash as a fast, capable alternative to gpt-4o-mini
    const model = "gemini-2.5-flash";

    try {
        const prompt = `
You are a lead qualification assistant. 
Given the OFFER and LEAD, classify buying intent as High, Medium, or Low.
Also, assign a numerical intent SCORE from 1 to 100, where 100 is the highest intent.
Provide a specific REASONING focusing on how the LEAD's role, company size, and stated needs align with the OFFER.

Respond *only* in JSON format with the following structure:
{
    "name": lead.name, 
    "role": lead.role, 
    "company": lead.company, 
    "intent": "High"|"Medium"|"Low", 
    "score": number, 
    "reasoning": "Detailed explanation of the lead's fit and intent."
}

Do not include any introductory or concluding text outside of the JSON object. In reasoning field only give one line

OFFER:
${JSON.stringify(offer, null, 2)}

LEAD:
${JSON.stringify(lead, null, 2)}
`;
        console.log("Sending prompt to Gemini:", prompt);

        // The generateContent method sends the request to the Gemini API
        const response = await ai.models.generateContent({
            model: model,
            contents: [
                { role: "user", parts: [{ text: prompt }] }
            ],
            config: {
                // Requesting a JSON response will help ensure the output is valid
                responseMimeType: "application/json",
            }
        });

        console.log("Gemini response:", response);

        const text = response.text.trim();
        console.log("Gemini text:", text);

        try {
            return JSON.parse(text);
        } catch (parseErr) {
            console.warn("AI response parsing failed:", parseErr.message);
            // Fallback for parsing errors
            return { intent: "Low", reasoning: "AI response parsing failed (fallback)." };
        }

    } catch (apiErr) {
        console.warn("AI API call failed:", apiErr.message);
        return { intent: "Low", reasoning: "AI request failed (fallback)." };
    }
}