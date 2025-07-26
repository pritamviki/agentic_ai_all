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
  const selectedLanguage = (location.state as any)?.language || 'Hindi';
  const recognitionLang = LANGUAGE_TO_LOCALE[selectedLanguage] || 'hi-IN';

  const [messages, setMessages] = useState<msgListType[]>();
  const [input, setInput] = useState('');
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
      const initialBotMessage = 'হ্যালো! আমি তোমার এআই সহকারী। কীভাবে তোমাকে সাহায্য করতে পারি?';
      setBotmsg(initialBotMessage);
      setMessages([{ role: 'bot', content: initialBotMessage }]);
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }
    };
    initialize();
  }, []);

  // File upload handler
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const imageUrl = ev.target?.result as string;
          const userImageMessage: msgListType = {
            role: 'user',
            content: '',
            image: imageUrl,
          };
          setMessages(prev => [...(prev || []), userImageMessage]);
          setFileImageUrl(null);
          setFileName(null);
        };
        reader.readAsDataURL(file);
      } else {
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
        setInput(prev => prev + transcript);
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

  // Chat send handler
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (input.trim() !== '') {
      const userMsg: msgListType = {
        role: 'user',
        content: input.trim(),
      };

      const botMsg: msgListType = {
        role: 'bot',
        content: botmsg || '',
      };

      setMessages(prev => [...(prev || []), userMsg, botMsg]);
      setInput('');
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
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t('instructions') + "..."}
            autoFocus
          />
          <button className="kb-chat-send" type="submit" disabled={input.trim() === '' && !fileName}>
            <svg width="28" height="28" fill="none" stroke="#388e2b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,22 22,14 6,6"/></svg>
          </button>
        </form>
      </main>
    </div>
  );
}