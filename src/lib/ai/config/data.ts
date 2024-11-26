export const GREETING_TEMPLATES = {
  bridge_donor: "Welcome, donor! Let us know how we can assist you today.",
  patient: "Hello, patient! We're here to support you.",
  volunteer: "Hi, volunteer! Your efforts are greatly appreciated.",
  guest: "Welcome, guest! Feel free to ask any questions.",
  new_user: "Hello, new user! Let us guide you on how to get started.",
  inactive_user: "Welcome back! We'd love to reconnect.",
  emergency_donor: "Hi, emergency donor! Your help can save lives.",
};

export const BLOOD_BRIDGE_TEMPLATES = [
  { template_name: "donor_reminder", user_roles_mapped: ["bridge_donor"] },
  { template_name: "patient_support", user_roles_mapped: ["patient"] },
  { template_name: "volunteer_engagement", user_roles_mapped: ["volunteer"] },
  { template_name: "new_user_welcome", user_roles_mapped: ["new_user"] },
  {
    template_name: "inactive_user_reconnect",
    user_roles_mapped: ["inactive_user"],
  },
];

export const TRAINING_DATA = [
  // Blood Bridge related queries
  { text: "I want to schedule a blood donation.", agent: "blood_bridge" },
  {
    text: "How do I join the Blood Bridge program?",
    agent: "blood_bridge",
  },
  {
    text: "Can you find donors for my blood group?",
    agent: "blood_bridge",
  },
  { text: "Reschedule my blood donation date.", agent: "blood_bridge" },
  {
    text: "I need a donor for a Thalassemia patient.",
    agent: "blood_bridge",
  },
  { text: "Is there a blood camp in my area?", agent: "blood_bridge" },

  // FAQ related queries
  { text: "What is Thalassemia?", agent: "faq" },
  {
    text: "How often does a Thalassemia patient need a blood transfusion?",
    agent: "faq",
  },
  { text: "Tell me about the HPLC test for Thalassemia.", agent: "faq" },
  { text: "Why should I donate blood?", agent: "faq" },
  { text: "How can I prevent Thalassemia in children?", agent: "faq" },

  // Greeting related queries
  { text: "hi", agent: "greeting" },
  { text: "hello", agent: "greeting" },
  { text: "hey", agent: "greeting" },
  { text: "good morning", agent: "greeting" },
  { text: "good evening", agent: "greeting" },
  { text: "how are you", agent: "greeting" },
  { text: "namaste", agent: "greeting" },

  // Bouncer related queries (random/irrelevant text)
  { text: "asdf", agent: "bouncer" },
  { text: "123", agent: "bouncer" },
  { text: "test", agent: "bouncer" },
  { text: "xyz", agent: "bouncer" },
  { text: "what is the weather like", agent: "bouncer" },
  { text: "tell me a joke", agent: "bouncer" },
  { text: "who won the match", agent: "bouncer" },
];
