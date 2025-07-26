
const helping_resp = [
  { "resp": "You may be eligible for compensation under the government’s disaster relief fund for farmers affected by natural calamities." },
  { "resp": "Contact your local agricultural office to apply for crop loss insurance or compensation schemes." },
  { "resp": "The government often announces emergency relief packages after hurricanes—stay updated through local news or panchayat offices." },
  { "resp": "If you're registered under the PM Fasal Bima Yojana, you can file a claim for the damaged crops." },
  { "resp": "You can approach your district collector’s office or tehsildar to file a damage report and request relief." },
  { "resp": "Apply for assistance through the National Disaster Response Fund (NDRF) if your state has declared it a disaster zone." },
  { "resp": "The state government might provide seeds, fertilizers, and farming equipment at subsidized rates for affected farmers." },
  { "resp": "Emergency financial aid may be provided directly into your bank account linked with your Aadhaar and farmer ID." },
  { "resp": "Local agricultural extension officers can guide you on replanting options and government rehabilitation schemes." },
  { "resp": "You can join a farmers' group or cooperative to collectively raise concerns and seek quicker government support." },
  { "resp": "In some cases, the government provides interest-free loans or moratoriums on existing agricultural loans." },
  { "resp": "You might qualify for temporary employment under MGNREGA or other rural employment schemes during recovery." },
  { "resp": "Farmers affected by natural disasters can receive free training on alternative farming practices from government agencies." },
  { "resp": "Relief kits containing essentials like food, water, and medical supplies may be distributed to affected farming families." },
  { "resp": "If you’ve lost livestock along with crops, you may be entitled to compensation under animal husbandry relief policies." },
  { "resp": "Check the state agriculture department’s website for online portals where you can apply for crop loss compensation." },
  { "resp": "The Revenue Department typically conducts surveys after such disasters to assess damage—ensure your land is included." },
  { "resp": "District-level grievance cells can help you escalate issues if you’re not receiving timely aid." },
  { "resp": "You can also consult with local NGOs who often coordinate with the government to assist affected farmers." },
  { "resp": "Some government relief programs also provide mental health and counseling services for distressed farmers." }
]

const helping_resp_hindi = [
  { "resp": "आप प्राकृतिक आपदाओं से प्रभावित किसानों के लिए सरकार की आपदा राहत निधि के तहत मुआवज़े के पात्र हो सकते हैं।" },
  { "resp": "फसल हानि बीमा या मुआवज़ा योजनाओं के लिए आवेदन करने हेतु अपने स्थानीय कृषि कार्यालय से संपर्क करें।" },
  { "resp": "सरकार अक्सर तूफानों के बाद आपातकालीन राहत पैकेज की घोषणा करती है—स्थानीय समाचार या पंचायत कार्यालयों के माध्यम से अपडेट रहें।" },
  { "resp": "यदि आप पीएम फसल बीमा योजना के तहत पंजीकृत हैं, तो आप क्षतिग्रस्त फसलों के लिए दावा दाखिल कर सकते हैं।" },
  { "resp": "आप नुकसान की रिपोर्ट दर्ज कराने और राहत की मांग करने के लिए अपने जिला कलेक्टर कार्यालय या तहसीलदार से संपर्क कर सकते हैं।" },
  { "resp": "यदि आपके राज्य ने क्षेत्र को आपदा क्षेत्र घोषित किया है, तो आप राष्ट्रीय आपदा प्रतिक्रिया कोष (NDRF) के माध्यम से सहायता के लिए आवेदन कर सकते हैं।" },
  { "resp": "राज्य सरकार प्रभावित किसानों को बीज, उर्वरक और कृषि उपकरण रियायती दरों पर प्रदान कर सकती है।" },
  { "resp": "आपके आधार और किसान आईडी से जुड़े बैंक खाते में आपातकालीन वित्तीय सहायता सीधे भेजी जा सकती है।" },
  { "resp": "स्थानीय कृषि विस्तार अधिकारी आपको पुनः बुवाई के विकल्प और सरकारी पुनर्वास योजनाओं की जानकारी दे सकते हैं।" },
  { "resp": "आप किसानों के समूह या सहकारी समिति से जुड़कर सामूहिक रूप से अपनी समस्या उठा सकते हैं और तेजी से सरकारी सहायता प्राप्त कर सकते हैं।" },
  { "resp": "कुछ मामलों में, सरकार ब्याज मुक्त ऋण या मौजूदा कृषि ऋणों पर स्थगन की सुविधा प्रदान करती है।" },
  { "resp": "आप पुनर्वास के दौरान मनरेगा या अन्य ग्रामीण रोजगार योजनाओं के अंतर्गत अस्थायी रोजगार के पात्र हो सकते हैं।" },
  { "resp": "प्राकृतिक आपदाओं से प्रभावित किसानों को सरकार की ओर से वैकल्पिक खेती के तरीकों पर निशुल्क प्रशिक्षण मिल सकता है।" },
  { "resp": "राहत किट जिनमें भोजन, पानी और दवाइयाँ शामिल होती हैं, प्रभावित किसान परिवारों को वितरित की जा सकती हैं।" },
  { "resp": "यदि आपकी फसलों के साथ पशुधन की भी हानि हुई है, तो आप पशुपालन राहत नीति के तहत मुआवज़े के पात्र हो सकते हैं।" },
  { "resp": "फसल क्षति मुआवज़े के लिए ऑनलाइन आवेदन करने हेतु राज्य कृषि विभाग की वेबसाइट पर पोर्टल की जांच करें।" },
  { "resp": "राजस्व विभाग आमतौर पर ऐसी आपदाओं के बाद सर्वेक्षण करता है—सुनिश्चित करें कि आपकी ज़मीन भी उसमें शामिल है।" },
  { "resp": "जिला स्तर की शिकायत निवारण प्रकोष्ठ आपकी मदद कर सकती हैं यदि आपको समय पर सहायता नहीं मिल रही है।" },
  { "resp": "आप स्थानीय गैर-सरकारी संगठनों (NGOs) से भी संपर्क कर सकते हैं जो सरकार के साथ मिलकर प्रभावित किसानों की सहायता करते हैं।" },
  { "resp": "कुछ सरकारी राहत कार्यक्रम पीड़ित किसानों के लिए मानसिक स्वास्थ्य और परामर्श सेवाएं भी प्रदान करते हैं।" }
];


export const diseaseInfo = {
  prediction: {
    crop_name: "Apple",
    disease_name: "Cedar Apple Rust"
  },
  confidence: 1.0000,
  cure: [
    "Apply fungicides such as myclobutanil or propiconazole early in the season.",
    "Remove infected leaves and galls from nearby juniper trees to reduce spore spread.",
    "Use systemic fungicides at 7–14 day intervals during the infection period."
  ],
  prevention: [
    "Plant resistant apple varieties (e.g., Redfree, Liberty, or Freedom).",
    "Avoid planting apple trees near eastern red cedar or juniper species.",
    "Prune apple trees regularly to improve air circulation and reduce humidity.",
    "Apply preventive fungicide sprays during early spring before symptoms appear."
  ]
};


function getRandomIndex() {
  return Math.floor(Math.random() * 20);
}

export function getHelpingResponse() {
  const index = getRandomIndex();
  return helping_resp[index].resp;
}

export function isSimilarQuery(input) {
  const keywords = [
    "lost", "crops", "hurricane", "storm", 
    "flood", "disaster", "government", "help", 
    "support", "damage", "compensation", "relief", "farmers",
    "aid", "assistance", "apply", "fund", "insurance",
    "report", "claim", "emergency", "rehabilitation",
    "agriculture", "financial", "aid", "livestock",
    "seeds", "fertilizers", "equipment", "training",
    "grants", "NGO"
  ];
  const farmerLossKeywords = [
    "farmer", "crop loss", "crop failure", "drought", "flood", "storm", "hailstorm",
    "cyclone", "pest attack", "plant disease", "yield loss", "low yield", "agriculture damage",
    "livestock death", "soil erosion", "landslide", "climate change", "natural disaster",
    "farm insurance", "crop insurance", "claim", "subsidy", "loan", "loan waiver", "compensation",
    "financial aid", "relief fund", "government scheme", "support", "help", "damage report",
    "rehabilitation", "grant", "seed loss", "fertilizer subsidy", "farmer suicide", "input cost",
    "weather failure", "equipment damage", "market loss", "harvest loss", "price crash", "debt",
    "NGO support", "farming failure", "agri loan", "irrigation failure", "crop subsidy"
  ];
  const hindiKeywords = [
    "खोया", "फसल", "तूफान", "चक्रवात", "बाढ़", "आपदा", "सरकार", "मदद",
    "समर्थन", "नुकसान", "मुआवजा", "राहत", "किसान", "सहायता", "आवेदन", "निधि",
    "बीमा", "रिपोर्ट", "दावा", "आपातकाल", "पुनर्वास", "कृषि", "वित्तीय", "पशुधन",
    "बीज", "उर्वरक", "उपकरण", "प्रशिक्षण", "अनुदान", "एनजीओ", "ऋण", "मौसम",
    "सूखा", "पैदावार", "सब्सिडी", "कीट", "जलवायु", "कर्ज़ माफी", "प्राकृतिक आपदा",
    "फसल क्षति", "बचाव", "भूमि", "बारिश", "मुआवजा फॉर्म"
  ];
  const hindiFarmerKeywords = [
    "किसान", "फसल नुकसान", "फसल बर्बादी", "सूखा", "बाढ़", "तूफान", "ओलावृष्टि", "चक्रवात",
    "कीट हमला", "फसल रोग", "उपज हानि", "कम उपज", "कृषि क्षति", "पशुधन मृत्यु", "मिट्टी कटाव",
    "भूस्खलन", "जलवायु परिवर्तन", "प्राकृतिक आपदा", "फसल बीमा", "दावा", "सब्सिडी", "ऋण",
    "कर्ज माफी", "मुआवजा", "वित्तीय सहायता", "राहत कोष", "सरकारी योजना", "सहायता", "समर्थन",
    "क्षति रिपोर्ट", "पुनर्वास", "अनुदान", "बीज नुकसान", "उर्वरक सब्सिडी", "किसान आत्महत्या",
    "इनपुट लागत", "मौसम विफलता", "उपकरण क्षति", "बाज़ार हानि", "फसल मूल्य गिरावट", "ऋण बोझ",
    "एनजीओ सहायता", "खेती में विफलता", "सिंचाई विफलता", "फसल सब्सिडी"
  ];
  const bengaliKeywords = [
    "হারানো", "ফসল", "ঘূর্ণিঝড়", "ঝড়", "বন্যা", "দুর্যোগ", "সরকার", "সহায়তা",
    "সমর্থন", "ক্ষতি", "ক্ষতিপূরণ", "ত্রাণ", "কৃষক", "সহযোগিতা", "আবেদন", "তহবিল",
    "বিমা", "প্রতিবেদন", "দাবি", "জরুরি", "পুনর্বাসন", "কৃষি", "আর্থিক", "পশুপালন",
    "বীজ", "সার", "সরঞ্জাম", "প্রশিক্ষণ", "অনুদান", "এনজিও", "ঋণ", "আবহাওয়া",
    "খরা", "উৎপাদন", "ভর্তুকি", "পোকামাকড়", "জলবায়ু", "ঋণ মওকুফ", "প্রাকৃতিক দুর্যোগ",
    "ফসল নষ্ট", "উদ্ধার", "জমি", "বৃষ্টি", "ক্ষতিপূরণ ফর্ম"
  ];
  const bengaliFarmerKeywords = [
    "কৃষক", "ফসল ক্ষতি", "ফসল নষ্ট", "খরা", "বন্যা", "ঝড়", "শিলাবৃষ্টি", "ঘূর্ণিঝড়",
    "পোকামাকড়ের আক্রমণ", "ফসল রোগ", "ফলনের ক্ষয়", "কম ফলন", "কৃষি ক্ষতি", "গবাদি পশু মৃত্যু",
    "মাটি ক্ষয়", "ভূমিধস", "জলবায়ু পরিবর্তন", "প্রাকৃতিক দুর্যোগ", "ফসল বীমা", "দাবি",
    "ভর্তুকি", "ঋণ", "ঋণ মওকুফ", "ক্ষতিপূরণ", "আর্থিক সহায়তা", "ত্রাণ তহবিল", "সরকারি প্রকল্প",
    "সহায়তা", "সমর্থন", "ক্ষতির প্রতিবেদন", "পুনর্বাসন", "অনুদান", "বীজ ক্ষতি", "সার ভর্তুকি",
    "কৃষক আত্মহত্যা", "ইনপুট খরচ", "আবহাওয়া বিপর্যয়", "যন্ত্রপাতি ক্ষতি", "বাজারে ক্ষতি",
    "মূল্য হ্রাস", "ঋণ বোঝা", "এনজিও সহায়তা", "চাষে ব্যর্থতা", "সেচ ব্যবস্থার সমস্যা", "ফসল ভর্তুকি"
  ];
  const allKeywords = [...keywords, ...farmerLossKeywords, ...hindiKeywords, ...hindiFarmerKeywords, ...bengaliKeywords, ...bengaliFarmerKeywords];


  const inputLower = input.toLowerCase();

  let matchCount = 0;
  allKeywords.forEach(word => {
    if (inputLower.includes(word)) {
      matchCount++;
    }
  });

  // If 3 or more keywords match, consider it similar
  return matchCount >= 3;
}
