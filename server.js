import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173' // Adjust if frontend is elsewhere
}));
app.use(express.json());

const ttsClient = new TextToSpeechClient();

const GOOGLE_TTS_VOICES = {
  en: { languageCode: 'en-IN', name: 'en-IN-Wavenet-A' },
  bn: { languageCode: 'bn-IN', name: 'bn-IN-Wavenet-A' },
  hi: { languageCode: 'hi-IN', name: 'hi-IN-Wavenet-A' },
  ta: { languageCode: 'ta-IN', name: 'ta-IN-Wavenet-A' },
  as: { languageCode: 'as-IN', name: 'as-IN-Standard-A' },
  gu: { languageCode: 'gu-IN', name: 'gu-IN-Wavenet-A' },
  kn: { languageCode: 'kn-IN', name: 'kn-IN-Wavenet-A' },
  ml: { languageCode: 'ml-IN', name: 'ml-IN-Wavenet-A' },
  mr: { languageCode: 'mr-IN', name: 'mr-IN-Wavenet-A' },
  or: { languageCode: 'or-IN', name: 'or-IN-Standard-A' },
  pa: { languageCode: 'pa-IN', name: 'pa-IN-Standard-A' },
  te: { languageCode: 'te-IN', name: 'te-IN-Wavenet-A' },
  ur: { languageCode: 'ur-IN', name: 'ur-IN-Wavenet-A' },
  sd: { languageCode: 'sd-IN', name: 'sd-IN-Standard-A' },
  ne: { languageCode: 'ne-NP', name: 'ne-NP-Standard-A' },
  kok: { languageCode: 'kok-IN', name: 'kok-IN-Standard-A' },
  mai: { languageCode: 'mai-IN', name: 'mai-IN-Standard-A' },
  trp: { languageCode: 'trp-IN', name: 'trp-IN-Standard-A' },
  grt: { languageCode: 'grt-IN', name: 'grt-IN-Standard-A' },
  mni: { languageCode: 'mni-IN', name: 'mni-IN-Standard-A' },
  lus: { languageCode: 'lus-IN', name: 'lus-IN-Standard-A' },
  sat: { languageCode: 'sat-IN', name: 'sat-IN-Standard-A' },
  doi: { languageCode: 'doi-IN', name: 'doi-IN-Standard-A' },
};

app.post('/synthesize-speech', async (req, res) => {
    const { text, languageCode } = req.body;
    if (!text) return res.status(400).json({ error: 'Text content is required.' });

    const langPrefix = languageCode.split('-')[0];
    const voiceToUse = GOOGLE_TTS_VOICES[langPrefix] || GOOGLE_TTS_VOICES.en;

    const request = {
        input: { text },
        voice: {
            languageCode: voiceToUse.languageCode,
            name: voiceToUse.name,
        },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        const [response] = await ttsClient.synthesizeSpeech(request);
        const audioBase64 = response.audioContent.toString('base64');
        res.json({ audioContent: audioBase64 });
    } catch (error) {
        console.error('TTS Error:', error);
        res.status(500).json({ error: 'Failed to synthesize speech.', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`TTS backend running at http://localhost:${port}`);
});
