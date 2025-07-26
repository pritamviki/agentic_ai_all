// src/utils/transliterateApi.ts
import axios from 'axios';


const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Transliterates text from English characters to a target Indian language script
 * using the Google Cloud Translation API. This leverages the translation capability
 * to render English input into the target language's script.
 *
 * @param text The text typed by the user in English characters.
 * @param targetLanguageCode The 2-letter ISO language code for the target Indian language (e.g., 'hi' for Hindi).
 * @returns A promise that resolves to the transliterated text, or the original text if an error occurs.
 */
export const transliterateText = async (text: string, targetLanguageCode: string): Promise<string> => {
  // Warn if API key is not set, as transliteration will not function.
  if (!API_KEY) {
    console.warn("Google Cloud Translate API Key is not set in environment variables. Transliteration will not work.");
    return text; // Return original text if API key is missing
  }

  try {
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      q: text, // The query text to be translated/transliterated
      target: targetLanguageCode, // The target language for the output script
      source: 'en' // The source language of the input (English characters)
    });

    // The API response for v2 translation contains the translated text in this path.
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Transliteration failed:', error);
    // Log the full Axios error response for more detailed debugging.
    if (axios.isAxiosError(error) && error.response) {
      console.error('Transliteration API Error Response:', error.response.data);
    }
    return text; 
  }
};
