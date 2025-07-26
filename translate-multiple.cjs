// const fs = require('fs');
// const path = require('path');
// const translate = require('@vitalets/google-translate-api');

// // Language name to code mapping
// const languages = {
//   Hindi: 'hi',
//   Bengali: 'bn',
//   Telugu: 'te',
//   Marathi: 'mr',
//   Tamil: 'ta',
//   Urdu: 'ur',
//   Gujarati: 'gu',
//   Kannada: 'kn',
//   Odia: 'or',
//   Malayalam: 'ml',
//   Punjabi: 'pa',
//   Assamese: 'as',
//   Maithili: 'mai',
//   Santali: 'sat',
//   Kashmiri: 'ks',
//   Nepali: 'ne',
//   Konkani: 'kok',
//   Sindhi: 'sd',
//   Dogri: 'doi',
//   Manipuri: 'mni',
//   Bodo: 'brx',
//   Santhali: 'sat',
//   Kokborok: 'trp',
//   Tulu: 'tcy',
//   Khasi: 'kha',
//   Garo: 'grt',
//   Mizo: 'lus',
//   English: 'en'
// };

// const SOURCE_LANG = 'en';
// const inputFile = path.resolve(__dirname, `src/locales/${SOURCE_LANG}/translation.json`);

// async function translateJson(obj, toLang) {
//   const result = {};
//   for (const key in obj) {
//     if (typeof obj[key] === 'object') {
//       result[key] = await translateJson(obj[key], toLang);
//     } else {
//       try {
//         const res = await translate(obj[key], { from: SOURCE_LANG, to: toLang });
//         result[key] = res.text;
//       } catch (error) {
//         console.error(`Error translating "${key}" to "${toLang}":`, error.message);
//         result[key] = obj[key]; // fallback to English
//       }
//     }
//   }
//   return result;
// }

// (async () => {
//   const enJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

//   for (const [langName, langCode] of Object.entries(languages)) {
//     console.log(`🌐 Translating to ${langName} (${langCode})...`);
//     const translated = await translateJson(enJson, langCode);
//     const outDir = path.resolve(__dirname, `src/locales/${langCode}`);
//     const outFile = path.join(outDir, 'translation.json');

//     fs.mkdirSync(outDir, { recursive: true });
//     fs.writeFileSync(outFile, JSON.stringify(translated, null, 2), 'utf8');
//     console.log(`✅ Saved: ${outFile}`);
//   }

//   console.log(`🎉 All translations complete!`);
// })();




const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x'); // ✅ this one works

// Language name to code mapping
const languages = {
  Hindi: 'hi',
  Bengali: 'bn',
  Telugu: 'te',
  Marathi: 'mr',
  Tamil: 'ta',
  Urdu: 'ur',
  Gujarati: 'gu',
  Kannada: 'kn',
  Odia: 'or',
  Malayalam: 'ml',
  Punjabi: 'pa',
  Assamese: 'as',
  Maithili: 'mai',
  Santali: 'sat',
  Kashmiri: 'ks',
  Nepali: 'ne',
  Konkani: 'kok',
  Sindhi: 'sd',
  Dogri: 'doi',
  Manipuri: 'mni',
  Bodo: 'brx',
  Santhali: 'sat',
  Kokborok: 'trp',
  Tulu: 'tcy',
  Khasi: 'kha',
  Garo: 'grt',
  Mizo: 'lus',
  English: 'en'
};

const SOURCE_LANG = 'en';
const inputFile = path.resolve(__dirname, `src/locales/${SOURCE_LANG}/translation.json`);

// 🔧 Step 1: Create default English translation if not present
if (!fs.existsSync(inputFile)) {
  console.log(`⚠️  ${inputFile} not found.`);
  console.log('📄 Creating sample translation.json...');

  const defaultTranslations = {
    title: "KrishiBandhu",
    subtitle: "This is a sample app",
    buttons: {
      login: "Login",
      signup: "Sign Up",
      submit: "Submit",
      cancel: "Cancel"
    },
    language: "Language",
    welcome: "Welcome to KrishiBandhu",
    state: "State",
    select: "Select",
    search: "Search",
    loading: "Loading...",
    error: "An error occurred",
    instructions: "Type your query here",
  };

  const inputDir = path.dirname(inputFile);
  fs.mkdirSync(inputDir, { recursive: true });
  fs.writeFileSync(inputFile, JSON.stringify(defaultTranslations, null, 2), 'utf8');

  console.log(`✅ Sample English file created at: ${inputFile}`);
}

// ✅ Step 2: Load English JSON
const enJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// 🔁 Function to translate recursively
async function translateJson(obj, toLang) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      result[key] = await translateJson(obj[key], toLang);
    } else {
      try {
        const res = await translate(obj[key], { from: SOURCE_LANG, to: toLang });
        result[key] = res.text;
      } catch (error) {
        console.error(`Error translating "${key}" to "${toLang}":`, error.message);
        result[key] = obj[key]; // fallback
      }
    }
  }
  return result;
}

// 🚀 Step 3: Translate to all languages
(async () => {
  for (const [langName, langCode] of Object.entries(languages)) {
    console.log(`🌐 Translating to ${langName} (${langCode})...`);
    const translated = await translateJson(enJson, langCode);
    const outDir = path.resolve(__dirname, `src/locales/${langCode}`);
    const outFile = path.join(outDir, 'translation.json');

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, JSON.stringify(translated, null, 2), 'utf8');
    console.log(`✅ Saved: ${outFile}`);
  }

  console.log(`🎉 All translations complete!`);
})();

