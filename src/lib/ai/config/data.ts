// Define common patterns for each language to make maintenance easier
const BLOOD_KEYWORDS = {
  tamil: {
    blood: 'இரத்தம்',
    patterns: ['தேவை', 'அவசரம்', 'உதவி', 'தானம்', 'கொடை']
  },
  malayalam: {
    blood: 'രക്തം',
    patterns: ['വേണം', 'അത്യാവശ്യം', 'സഹായം', 'ദാനം']
  },
  kannada: {
    blood: 'ರಕ್ತ',
    patterns: ['ಬೇಕು', 'ತುರ್ತು', 'ಸಹಾಯ', 'ದಾನ']
  },
  marathi: {
    blood: 'रक्त',
    patterns: ['हवे', 'गरज', 'मदत', 'दान']
  },
  gujarati: {
    blood: 'રક્ત',
    patterns: ['જોઈએ', 'જરૂર', 'મદદ', 'દાન']
  },
  bengali: {
    blood: 'রক্ত',
    patterns: ['চাই', 'দরকার', 'সাহায্য', 'দান']
  },
  punjabi: {
    blood: 'ਖੂਨ',
    patterns: ['ਚਾਹੀਦਾ', 'ਲੋੜ', 'ਮਦਦ', 'ਦਾਨ']
  },
  odia: {
    blood: 'ରକ୍ତ',
    patterns: ['ଦରକାର', 'ଜରୁରୀ', 'ସାହାଯ୍ୟ', 'ଦାନ']
  }
};

// Define transliteration patterns for each language
const TRANSLITERATED_KEYWORDS = {
  telugu: {
    blood: ['raktam', 'raktham', 'raktham'],
    patterns: ['kavali', 'kaavali', 'avasaram', 'emergency', 'help', 'sahayam']
  },
  hindi: {
    blood: ['khoon', 'rakt', 'rakth'],
    patterns: ['chahiye', 'jarurat', 'emergency', 'madad', 'sahayata']
  },
  tamil: {
    blood: ['rathham', 'ratham', 'rattham'],
    patterns: ['venum', 'vendum', 'avasaram', 'help', 'thevai']
  },
  malayalam: {
    blood: ['raktham', 'rakthum'],
    patterns: ['venam', 'aavashyam', 'sahayam', 'help']
  },
  kannada: {
    blood: ['raktha', 'rakta'],
    patterns: ['beku', 'beku', 'sahaya', 'help', 'urgent']
  },
  marathi: {
    blood: ['rakt', 'rakth'],
    patterns: ['hava', 'have', 'pahije', 'madat', 'help']
  }
};

// Generate greeting patterns dynamically
export const GREETING_PATTERNS = [
  /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)(\s|$)/i,
  /^(നമസ്കാരം|வணக்கம்|ನಮಸ್ಕಾರ|નમસ્તે|প্রণাম|ਸਤ ਸ੍ਰੀ ਅਕਾਲ|ନମସ୍କାର)(\s|$)/i,
  /^(నమస్కారం|నమస్తే|శుభోదయం|శుభ సాయంత్రం)(\s|$)/i,
  // Add Hindi greetings
  /^(नमस्ते|नमस्कार|सुप्रभात|शुभ संध्या)(\s|$)/i,
  // Transliterated greetings
  /^(namaskaram|vanakkam|namaskar|namaste|sat sri akal)(\s|$)/i,
  /^(namaste|namasthe|vannakam|vanakam)(\s|$)/i,
];

// Blood donation related keywords
export const BLOOD_BRIDGE_PATTERNS = [
  /(blood.*(need|requir|emergency|transfusion|looking|find|register|support))/i,
  /\b(A|B|O|AB)[+-]\b/,
  /(urgent|emergency)/i,
  /(transfusion|requirement)/i,
  /(looking.*donor)/i,
  /(register.*donor)/i,
  /(find.*donor)/i,
  /(blood.*support)/i,
  
  // Generate patterns for each language
  ...Object.entries(BLOOD_KEYWORDS).flatMap(([, lang]) => 
    lang.patterns.map(pattern => 
      new RegExp(`${lang.blood}.*${pattern}`, 'i')
    )
  ),
  // Existing Telugu & Hindi patterns
  /(రక్త.*(కావాలి|అవసరం|అత్యవసరం|ఎక్కించడం|వెతుకుతున్నాం|నమోదు|సహాయం))/i,
  /(रक्त.*(चाहिए|जरूरत|आवश्यकता|इमरजेंसी|खोज|पंजीकरण|सहायता))/i,
  // Generate patterns for transliterated text
  ...Object.entries(TRANSLITERATED_KEYWORDS).flatMap(([, lang]) =>
    lang.blood.flatMap(bloodWord =>
      lang.patterns.map(pattern =>
        new RegExp(`${bloodWord}.*${pattern}`, 'i')
      )
    )
  ),
];

// Question patterns
export const QUESTION_PATTERNS = [
  /^(what|how|why|when|where|who|can|could|would|will|do|does|did|is|are|was|were)\b/i,
  /\?$/,
  /(tell me|explain|describe|difference between)/i,
  /(thalassemia|blood donation|ngo|bloodwarriors)/i,
];

export const TRAINING_DATA = [
  // Blood Bridge related queries
  { text: "I need blood urgently", agent: "blood_bridge" },
  { text: "Looking for O+ blood donor", agent: "blood_bridge" },
  { text: "Need A- blood for transfusion", agent: "blood_bridge" },
  { text: "Where can I donate blood", agent: "blood_bridge" },
  { text: "Blood required for thalassemia patient", agent: "blood_bridge" },
  { text: "Emergency blood requirement", agent: "blood_bridge" },
  { text: "Can you help me find blood donors", agent: "blood_bridge" },
  { text: "Need blood transfusion support", agent: "blood_bridge" },
  { text: "Looking for regular blood donors", agent: "blood_bridge" },
  // { text: "Want to register as blood donor", agent: "blood_bridge" },
  
  { text: "రక్తం అత్యవసరం", agent: "blood_bridge" }, // Telugu: Need blood urgently
  { text: "O+ రక్తదాత కావాలి", agent: "blood_bridge" }, // Telugu: Need O+ donor
  { text: "रक्त की तत्काल आवश्यकता", agent: "blood_bridge" }, // Hindi: Need blood urgently
  { text: "O+ रक्तदाता की तलाश", agent: "blood_bridge" },

  // FAQ related queries
  { text: "What is Thalassemia?", agent: "faq" },
  {
    text: "How often does a Thalassemia patient need a blood transfusion?",
    agent: "faq",
  },
  { text: "తలసీమియా అంటే ఏమిటి?", agent: "faq" }, // Telugu
  { text: "थैलेसीमिया क्या है?", agent: "faq" }, // Hindi

  // Blood Donation Process
  { text: "How does blood donation work?", agent: "faq" },
  { text: "రక్తదాన ప్రక్రియ ఎలా ఉంటుంది?", agent: "faq" }, // Telugu
  { text: "रक्तदान कैसे किया जाता है?", agent: "faq" }, // Hindi
  { text: "Tell me about the HPLC test for Thalassemia.", agent: "faq" },
  { text: "Why should I donate blood?", agent: "faq" },
  { text: "How can I prevent Thalassemia in children?", agent: "faq" },
  { text: "What is Blood Warriors?", agent: "faq" },
  { text: "బ్లడ్ వారియర్స్ అంటే ఏమిటి?", agent: "faq" }, // Telugu
  { text: "ब्लड वॉरियर्स क्या है?", agent: "faq" }, // Hindi

  // ... add about 15-20 more core FAQs with multilingual support
  { text: "मुझे रक्त दान की आवश्यकता है।", agent: "blood_bridge" },
  { text: "क्या आप रक्तदाता की जानकारी दे सकते हैं?", agent: "blood_bridge" },
  { text: "मुझे रक्तदाता चाहिए।", agent: "blood_bridge" },
  { text: "रक्त की मदद चाहिए।", agent: "blood_bridge" },
  { text: "रक्तदानकर्ता की जानकारी दें।", agent: "blood_bridge" },
  { text: "रक्तदाताओं की सूची चाहिए।", agent: "blood_bridge" },
  { text: "माझ्या कडून रक्तदान मिळवण्यासाठी कोणीतरी शोधा.", agent: "blood_bridge" },
  { text: "माझ्या रुग्णाला रक्ताची गरज आहे.", agent: "blood_bridge" },
  { text: "रक्तदानासाठी मला मदत मिळेल का?", agent: "blood_bridge" },
  { text: "माझ्या रुग्णालयासाठी रक्त मिळेल का?", agent: "blood_bridge" },
  { text: "రక్తదాత యొక్క వివరాలు అందించండి.", agent: "blood_bridge" },
  { text: "రక్తం అవసరం.", agent: "blood_bridge" },
  { text: "మీరు రక్తదానం చేయగలరా?", agent: "blood_bridge" },
  { text: "రక్త దాతలకు సహాయం కావాలి.", agent: "blood_bridge" },
  {
    text: "நான் ஒருவருக்காக இரத்த தானம் தேவை.",
    agent: "blood_bridge",
  },
  {
    text: "நீங்கள் இரத்த தானம் செய்யவா?",
    agent: "blood_bridge",
  },
  {
    text: "எவரேனும் இரத்ததானம் செய்ய முடிந்தால் தயவு செய்து உதவவும்.",
    agent: "blood_bridge",
  },
  {
    text: "இரத்ததானம் தேவைப்படுகிறது.",
    agent: "blood_bridge",
  },
  {
    text: "ನಾನು ರಕ್ತದಾತರಿಗೆ ಸಂಪರ್ಕ ಬೇಕು.",
    agent: "blood_bridge",
  },
  {
    text: "ನಾವು ರಕ್ತದಾನ ಮಾಡಬೇಕಾಗುತ್ತದೆ.",
    agent: "blood_bridge",
  },
  {
    text: "ನಮಗೆ ತುರ್ತು ರಕ್ತದಾನ ಅಗತ್ಯವಿದೆ.",
    agent: "blood_bridge",
  },
  {
    text: "ರೋಗಿಗೆ ರಕ್ತದಾನ ಸಹಾಯ ಬೇಕು.",
    agent: "blood_bridge",
  },
  {
    text: "I need a blood donor.",
    agent: "blood_bridge",
  },
  {
    text: "Can you help me find a blood donor?",
    agent: "blood_bridge",
  },
  {
    text: "Urgent help needed for blood donation.",
    agent: "blood_bridge",
  },
  {
    text: "Provide details of available blood donors.",
    agent: "blood_bridge",
  },

  { text: "bye", agent: "faq" },
  { text: "thank you", agent: "faq" },
  { text: "thank you for your help", agent: "faq" },
  { text: "thank you for your assistance", agent: "faq" },
  { text: "nice to meet you", agent: "faq" },
  { text: "see you later", agent: "faq" },
  { text: "goodbye", agent: "faq" },

  // Greeting related queries
  { text: "hi", agent: "greeting" },
  { text: "hello", agent: "greeting" },
  { text: "hey", agent: "greeting" },
  { text: "good morning", agent: "greeting" },
  { text: "good evening", agent: "greeting" },
  { text: "how are you", agent: "greeting" },
  { text: "namaste", agent: "greeting" },
  { text: "what's up", agent: "greeting" },
  { text: "howdy", agent: "greeting" },
  { text: "hi there", agent: "greeting" },
  { text: "good afternoon", agent: "greeting" },
  { text: "greetings", agent: "greeting" },

  //Bouncer related queries (random/irrelevant text)
  { text: "asdf", agent: "bouncer" },
  { text: "123", agent: "bouncer" },
  { text: "test", agent: "bouncer" },
  { text: "xyz", agent: "bouncer" },
  // { text: "what is the weather like", agent: "bouncer" },
  // { text: "tell me a joke", agent: "bouncer" },
  // { text: "who won the match", agent: "bouncer" },
  // { text: "how to bake a cake", agent: "bouncer" },
  // { text: "what's the capital of France", agent: "bouncer" },
  // { text: "sing me a song", agent: "bouncer" },

  // Add transliterated examples
  { text: "Raktham kavali urgent ga", agent: "blood_bridge" }, // Telugu
  { text: "O+ blood donor ni vetukutunnam", agent: "blood_bridge" }, // Telugu
  { text: "Khoon ki zarurat hai", agent: "blood_bridge" }, // Hindi
  { text: "Rakt ki emergency hai", agent: "blood_bridge" }, // Hindi
  { text: "Ratham venum urgent", agent: "blood_bridge" }, // Tamil
  { text: "Raktham venam emergency aanu", agent: "blood_bridge" }, // Malayalam
  { text: "Raktha beku urgent", agent: "blood_bridge" }, // Kannada
  { text: "Rakt pahije urgent", agent: "blood_bridge" }, // Marathi

  // Add transliterated greetings
  { text: "Namaskaram", agent: "greeting" },
  { text: "Vanakkam", agent: "greeting" },
  { text: "Namasthe", agent: "greeting" },
  
  // Add transliterated FAQs
  { text: "Thalassemia ante enti", agent: "faq" }, // Telugu
  { text: "Blood donation ela cheyali", agent: "faq" }, // Telugu
  { text: "Thalassemia kya hai", agent: "faq" }, // Hindi
  { text: "Rakt daan kaise kare", agent: "faq" }, // Hindi
];
