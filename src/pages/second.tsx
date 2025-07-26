import './second.scss';
import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import volume from '../assets/volume.svg';
import Header from '../components/Header';
import file from '../assets/file.svg';
import mic from '../assets/mic.svg';
import i18n from '../i18n';
import { GOOGLE_TTS_LANGUAGE_MAP } from '../utils/googleTTSMap';
import { isSimilarQuery, getHelpingResponse, diseaseInfo } from '../utils/helping_resp';
import { transliterateText } from '../utils/transliterateApi';

type SpeechRecognitionType = typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition;
type RecognitionInstance = InstanceType<NonNullable<SpeechRecognitionType>> | null;

interface msgListType {
  role: 'user' | 'bot' | 'file';
  content: string;
  image?: string; // URL or base64 string
}

const LANGUAGE_TO_LOCALE: Record<string, string> = {
  Hindi: 'hi-IN',
  Bengali: 'bn-IN',
  Telugu: 'te-IN',
  Marathi: 'mr-IN',
  Tamil: 'ta-IN',
  Urdu: 'ur-IN',
  Gujarati: 'gu-IN',
  Kannada: 'kn-IN',
  Odia: 'or-IN',
  Malayalam: 'ml-IN',
  Punjabi: 'pa-IN',
  Assamese: 'as-IN',
  Maithili: 'mai-IN',
  Santali: 'sat-IN',
  Kashmiri: 'ks-IN',
  Nepali: 'ne-IN',
  Konkani: 'kok-IN',
  Sindhi: 'sd-IN',
  Dogri: 'doi-IN',
  Manipuri: 'mni-IN',
  Bodo: 'brx-IN',
  Santhali: 'sat-IN',
  Kokborok: 'trp-IN',
  Tulu: 'tcy-IN',
  Khasi: 'kha-IN',
  Garo: 'grt-IN',
  Mizo: 'lus-IN',
  English: 'en-IN',
};

export default function SecondPage() {
  const location = useLocation();
  const { t } = useTranslation();

  // Corrected: Initialize selectedLanguage directly from location.state as a state variable
  const [selectedLanguage, setSelectedLanguage] = useState<string>((location.state as any)?.language || 'Hindi');

  // Derive recognitionLang and targetLanguageCodeForTransliteration from the state
  const recognitionLang = LANGUAGE_TO_LOCALE[selectedLanguage] || 'hi-IN';
  const targetLanguageCodeForTransliteration = recognitionLang.split('-')[0];

  const [botLoading, setBotLoading] = useState(false);
  const [messages, setMessages] = useState<msgListType[]>();
  const [rawInput, setRawInput] = useState('');
  const [displayInput, setDisplayInput] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileImageUrl, setFileImageUrl] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [botmsg, setBotmsg] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<RecognitionInstance>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const initialize = async () => {
      const savedLang = localStorage.getItem('appLanguage');
      // Transliterate the initial bot message if not English
      const initialEnglishBotMessage = 'Hello! I am your AI assistant. How can I help you?';
      let initialBotMessageForDisplay = initialEnglishBotMessage;
      if (selectedLanguage !== 'English') {
        initialBotMessageForDisplay = await transliterateText(initialEnglishBotMessage, targetLanguageCodeForTransliteration);
      }

      setBotmsg(initialBotMessageForDisplay);
      setMessages([{ role: 'bot', content: initialBotMessageForDisplay }]);
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }
    };
    initialize();
  }, [selectedLanguage, targetLanguageCodeForTransliteration]);

  // File upload handler
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  // Corrected: Mark handleFileChange as async
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        // Corrected: Mark reader.onload as async
        reader.onload = async (ev) => {
          const imageUrl = ev.target?.result as string;

          // 1. Add user image message
          const userImageMessage: msgListType = {
            role: 'user',
            content: '',
            image: imageUrl,
          };
          await setMessages(prev => [...(prev || []), userImageMessage]);

          // 2. Then add bot response (This response will also need transliteration)
          const diseaseInfoEnglishResponse: string = `Your crop name : ${diseaseInfo.prediction.crop_name},\n
                                            Disease Name : ${diseaseInfo.prediction.disease_name},
                                            Possible Cure : ${diseaseInfo.cure},
                                            Prevention : ${diseaseInfo.prevention},`;
          let initialBotMessageForDisplay = diseaseInfoEnglishResponse;
          if (selectedLanguage !== 'English') {
            initialBotMessageForDisplay = await transliterateText(diseaseInfoEnglishResponse, targetLanguageCodeForTransliteration);
          }

          await setMessages(prev => [...(prev || []), { role: 'bot', content: initialBotMessageForDisplay }]);

          // 3. Clean up
          setFileImageUrl(null);
          setFileName(null);
          fileInputRef.current!.value = ''; // optional: allow re-upload of same file
        };

        reader.readAsDataURL(file);
      } else {
        // Not an image (This response will also need transliteration)
        const errorMsgEnglish: string = "Please upload an image file.";
        let errorMsgForDisplay = errorMsgEnglish;
        if (selectedLanguage !== 'English') {
          errorMsgForDisplay = await transliterateText(errorMsgEnglish, targetLanguageCodeForTransliteration);
        }
        setMessages(prev => [...(prev || []), { role: 'bot', content: errorMsgForDisplay }]);
        setFileImageUrl(null);
      }
    }
  };


  // Mic (speech-to-text) handler
  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRawInput(prev => prev + transcript); // Set raw input from speech
        setDisplayInput(prev => prev + transcript); // Update display input as well
        setListening(false);
      };
      recognitionRef.current.onerror = () => setListening(false);
      recognitionRef.current.onend = () => setListening(false);
    }
    recognitionRef.current.lang = recognitionLang;
    setListening(true);
    recognitionRef.current.start();
  };

  // Google TTS function using access token
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const playBotSpeech = async (text: string) => {
    if (!BACKEND_API_URL) {
      alert('Backend API URL is not configured. Check your .env file.');
      return;
    }
    const languageCodeToSend = recognitionLang;
    const url = `${BACKEND_API_URL}/synthesize-speech`;

    const body = {
      text: text,
      languageCode: languageCodeToSend,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error during speech synthesis.');
      }

      const data = await response.json();
      if (data.audioContent) {
        const audio = new Audio('data:audio/mp3;base64,' + data.audioContent);
        audio.play();
      } else {
        alert('Speech synthesis failed: No audio content received from server.');
      }
    } catch (err: any) {
      alert(`Error playing speech: ${err.message}`);
      console.error('Error in playBotSpeech (frontend):', err);
    }
  };

  // New handler for input field that includes transliteration
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRawInput(value); // Always store the raw typed input

    // Only transliterate if the selected language is NOT English
    if (selectedLanguage !== 'English') {
      // Basic trigger for transliteration: on space or when input is long enough
      if (value.endsWith(' ') || value.length % 5 === 0 || value.length === 0) {
        const transliterated = await transliterateText(value, targetLanguageCodeForTransliteration);
        setDisplayInput(transliterated); // Update the display input with transliterated text
      } else {
        setDisplayInput(value); // For other characters, just display the raw input immediately
      }
    } else {
      setDisplayInput(value); // If English, just set display to raw input
    }
  };

  // Chat send handler
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (rawInput.trim() !== '') {
      const userMsg: msgListType = {
        role: 'user',
        content: displayInput.trim(), // Display the transliterated text in the chat bubble
      };
      
      setMessages(prev => [...(prev || []), userMsg]);
      setRawInput(''); // Clear raw input
      setDisplayInput(''); // Clear display input
      setBotLoading(true);

      // Determine the bot's raw English response first
      let botEnglishResponse: string;
      if(isSimilarQuery(rawInput.trim())) { // Use rawInput for query similarity check
        botEnglishResponse = getHelpingResponse();
      }
      else {
        botEnglishResponse = 'Sorry, I am not able to help you with that.';
      }

      // Transliterate the bot's response if the selected language is not English
      let botDisplayResponse = botEnglishResponse;
      if (selectedLanguage !== 'English') {
        botDisplayResponse = await transliterateText(botEnglishResponse, targetLanguageCodeForTransliteration);
      }

      const botMsg: msgListType = {
        role: 'bot',
        content: botDisplayResponse, // Use the transliterated text for display
      };

      await setTimeout(async () => {
        console.log("This runs after 3 seconds");
        setBotLoading(false);
        setMessages(prev => [...(prev || []), botMsg]);

        // Play the transliterated bot speech
        await playBotSpeech(botDisplayResponse);
      }, 3000);
    }
  };

  return (
    <div className="kb-root-two">
      <Header/>
      <main className="kb-chat-main">
        <div className='kb-chat-content'>
          {messages && messages.map((msg, idx) => (
            <div key={idx} ref={messagesEndRef} className={`kb-chat-bubble kb-chat-${msg.role}`}>
              {msg.content && <p>{msg.content}</p>}
              {msg.image && (
                <img src={msg.image} alt="chat-img" className="kb-chat-message-img" />
              )}
              {msg.role === 'bot' && !msg.image && (
                <span>
                  <img
                    src={volume}
                    className='kb-chat-img'
                    style={{ cursor: 'pointer' }}
                    onClick={() => playBotSpeech(msg.content)}
                    alt="Play speech"
                  />
                </span>
              )}
            </div>
          ))}
          {botLoading && (
            <div
              className="kb-chat-bubble kb-chat-bot"
              ref={messagesEndRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50px'
              }}>
              <img src="/loader_bot.gif" alt="..." className='loader-bot'/>
            </div>
          )}
        </div>

        <form className="kb-chat-input-bar" onSubmit={handleSend}>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
          <span className="kb-chat-icon" onClick={handleFileClick} title="Attach file">
            <img src={file} alt="Attach" className='input-icons'/>
          </span>
          <span className={`kb-chat-icon${listening ? ' kb-mic-listening' : ''}`} onClick={handleMicClick} title="Speak">
            <img src={mic} alt="Mic" className='input-icons'/>
          </span>
          <input
            className="kb-chat-input"
            type="text"
            value={displayInput}
            onChange={handleInputChange}
            placeholder={t('instructions') + "..."}
            autoFocus
          />
          <button className="kb-chat-send" type="submit" disabled={rawInput.trim() === '' && !fileName}>
            <svg width="28" height="28" fill="none" stroke="#388e2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,22 22,14 6,6"/></svg>
          </button>
        </form>
      </main>
    </div>
  );
}