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
  { text: "Schedule a Donation", agent: "blood_bridge" },
  { text: "Change Transfusion Date", agent: "blood_bridge" },

  // FAQ related queries
  { text: "What is Thalassemia?", agent: "faq" },
  {
    text: "How often does a Thalassemia patient need a blood transfusion?",
    agent: "faq",
  },
  { text: "Tell me about the HPLC test for Thalassemia.", agent: "faq" },
  { text: "Why should I donate blood?", agent: "faq" },
  { text: "How can I prevent Thalassemia in children?", agent: "faq" },
  { text: "What is Blood Warriors?", agent: "faq" },
  { text: "How can I contact Blood Warriors?", agent: "faq" },
  { text: "How do I stay updated with Blood Warriors?", agent: "faq" },
  { text: "What is the mission of Blood Warriors?", agent: "faq" },
  { text: "How do I register as a donor with Blood Warriors?", agent: "faq" },
  { text: "Where can I find Blood Warriors' social media?", agent: "faq" },
  { text: "What initiatives does Blood Warriors run?", agent: "faq" },
  { text: "What is the Blood Warriors website?", agent: "faq" },
  { text: "How can I volunteer with Blood Warriors?", agent: "faq" },
  { text: "Does Blood Warriors conduct awareness campaigns?", agent: "faq" },
  { text: "What is the process for blood donation?", agent: "faq" },
  { text: "Who can donate blood for Thalassemia patients?", agent: "faq" },
  { text: "How does Blood Warriors help Thalassemia patients?", agent: "faq" },
  { text: "What are the benefits of HPLC testing?", agent: "faq" },
  { text: "What is the cost of treating Thalassemia in India?", agent: "faq" },
  { text: "Does Blood Warriors provide financial support?", agent: "faq" },
  { text: "What is Thalassemia?", agent: "faq" },
  { text: "What are the popular Thalassemia treatment methods?", agent: "faq" },
  { text: "What are the forms of Thalassemia?", agent: "faq" },
  { text: "What are the different types of Thalassemia?", agent: "faq" },
  { text: "Who is at risk of Thalassemia?", agent: "faq" },
  { text: "Who carries Thalassemia?", agent: "faq" },
  { text: "What is Thalassemia Minor?", agent: "faq" },
  { text: "What is Thalassemia Major?", agent: "faq" },
  { text: "What are the effects of Thalassemia?", agent: "faq" },
  { text: "How do you inherit Thalassemia?", agent: "faq" },
  { text: "Do you carry Thalassemia?", agent: "faq" },
  { text: "How can we prevent Thalassemia?", agent: "faq" },
  { text: "Which doctors treat thalassemia?", agent: "faq" },
  {
    text: "When is the best time to have a thalassemia test if I am a carrier?",
    agent: "faq",
  },
  {
    text: "My child has beta thalassemia major, can it be cured?",
    agent: "faq",
  },
  {
    text: "What is the success rate for using Bone Marrow Transplantation (BMT) to cure thalassemia?",
    agent: "faq",
  },
  { text: "How does the blood donation process work?", agent: "faq" },
  { text: "Will it hurt when you insert the needle?", agent: "faq" },
  { text: "How long does a blood donation take?", agent: "faq" },
  { text: "Is it safe to give blood?", agent: "faq" },
  { text: "Are there age limits for blood donors?", agent: "faq" },
  { text: "I'm taking medications. Can I still donate blood?", agent: "faq" },
  { text: "How much blood do I have in my body?", agent: "faq" },
  { text: "What are red cells, platelets and plasma?", agent: "faq" },
  { text: "What are the health benefits of blood donation?", agent: "faq" },
  {
    text: "At what range of hemoglobin level, transfusion is required?",
    agent: "faq",
  },
  { text: "What is the range of haemoglobin?", agent: "faq" },
  {
    text: "What is the range of haemoglobin available in thalassemia major patients?",
    agent: "faq",
  },
  { text: "How many days can the blood be stored?", agent: "faq" },
  {
    text: "What should be the gap between two successive blood donations?",
    agent: "faq",
  },
  {
    text: "How often do thalassemia patients need blood transfusion?",
    agent: "faq",
  },
  {
    text: "How much quantity of whole blood is present in 1 unit bag?",
    agent: "faq",
  },
  { text: "What is blood donation?", agent: "faq" },
  { text: "Why is blood donation important?", agent: "faq" },
  { text: "What is the process of blood donation in India?", agent: "faq" },
  { text: "Who can donate blood in India?", agent: "faq" },
  { text: "How often can someone donate blood in India?", agent: "faq" },
  { text: "What are the different types of blood donation?", agent: "faq" },
  { text: "What is the most common type of blood donation?", agent: "faq" },
  { text: "What is plasma donation?", agent: "faq" },
  { text: "What is platelet donation?", agent: "faq" },
  { text: "How long does a blood donation take?", agent: "faq" },
  { text: "What are the benefits of donating blood?", agent: "faq" },
  { text: "What are the risks of donating blood?", agent: "faq" },
  { text: "How is donated blood used?", agent: "faq" },
  { text: "How is donated blood tested?", agent: "faq" },
  { text: "How can people prepare for blood donation?", agent: "faq" },
  { text: "How can people find blood donation centers?", agent: "faq" },
  { text: "How can people become regular blood donors?", agent: "faq" },
  { text: "Can people with tattoos donate blood?", agent: "faq" },
  { text: "Can people with medical conditions donate blood?", agent: "faq" },
  { text: "How does blood donation affect the body?", agent: "faq" },
  { text: "How is blood donation related to health?", agent: "faq" },
  { text: "What is the history of blood donation?", agent: "faq" },
  { text: "What is the current status of blood donation?", agent: "faq" },
  {
    text: "What are the reasons for the shortage of blood supply?",
    agent: "faq",
  },
  {
    text: "What is the government doing to address the shortage of blood supply?",
    agent: "faq",
  },
  {
    text: "How has the COVID-19 pandemic affected blood donation?",
    agent: "faq",
  },
  {
    text: "Is it safe to donate blood during the COVID-19 pandemic?",
    agent: "faq",
  },
  {
    text: "Can people who have received the COVID-19 vaccine donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation drives be made more accessible?",
    agent: "faq",
  },
  {
    text: "Can people who have traveled to certain countries donate blood?",
    agent: "faq",
  },
  { text: "How can blood donation be made more inclusive?", agent: "faq" },
  { text: "Can people who have had COVID-19 donate blood?", agent: "faq" },
  { text: "How does blood donation impact the economy?", agent: "faq" },
  {
    text: "How can the blood donation process be made more efficient?",
    agent: "faq",
  },
  {
    text: "Can people who have received blood transfusions donate blood?",
    agent: "faq",
  },
  {
    text: "How can social media be used to promote blood donation?",
    agent: "faq",
  },
  {
    text: "Can people who have recently given birth donate blood?",
    agent: "faq",
  },
  { text: "How can workplaces encourage blood donation?", agent: "faq" },
  { text: "Can people who are taking medications donate blood?", agent: "faq" },
  {
    text: "How can blood donation be made more accessible to people with disabilities?",
    agent: "faq",
  },
  { text: "Can people who have had cancer donate blood?", agent: "faq" },
  {
    text: "How can schools and colleges promote blood donation?",
    agent: "faq",
  },
  { text: "Can people with tattoos or piercings donate blood?", agent: "faq" },
  {
    text: "How can the Indian government improve blood donation policies and regulations?",
    agent: "faq",
  },
  { text: "Can people who have had surgery donate blood?", agent: "faq" },
  {
    text: "How can religious and cultural beliefs be addressed in blood donation campaigns?",
    agent: "faq",
  },
  {
    text: "Can people who have high blood pressure donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation be made more convenient for donors?",
    agent: "faq",
  },
  { text: "Can people with diabetes donate blood?", agent: "faq" },
  {
    text: "How can blood donation centers improve donor satisfaction?",
    agent: "faq",
  },
  { text: "Can people who have had hepatitis donate blood?", agent: "faq" },
  {
    text: "How can celebrities and public figures help promote blood donation?",
    agent: "faq",
  },
  {
    text: "Can people who have had a heart attack donate blood?",
    agent: "faq",
  },
  {
    text: "How can donor confidentiality be ensured in blood donation programs?",
    agent: "faq",
  },
  { text: "Can people who are underweight donate blood?", agent: "faq" },
  {
    text: "How can blood donation programs be made more sustainable?",
    agent: "faq",
  },
  {
    text: "Can people who have had a transfusion in the past donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure safety and hygiene during the donation process?",
    agent: "faq",
  },
  { text: "Can people with a history of drug use donate blood?", agent: "faq" },
  {
    text: "How can blood donation centers encourage regular donors to make multiple donations?",
    agent: "faq",
  },
  {
    text: "Can people with a history of sexually transmitted diseases (STDs) donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation programs address the needs of marginalized communities?",
    agent: "faq",
  },
  { text: "Can people with a history of cancer donate blood?", agent: "faq" },
  {
    text: "How can social media be used to promote blood donation?",
    agent: "faq",
  },
  {
    text: "Can people with a history of mental illness donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers accommodate donors with disabilities?",
    agent: "faq",
  },
  { text: "Can people who have had a stroke donate blood?", agent: "faq" },
  {
    text: "How can blood donation centers address language barriers among donors?",
    agent: "faq",
  },
  {
    text: "Can people with a history of heart disease donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure equitable access to blood products?",
    agent: "faq",
  },
  {
    text: "Can people who have received a vaccine recently donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation programs address the needs of rural communities?",
    agent: "faq",
  },
  {
    text: "Can people with a history of allergies donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure donor comfort during the donation process?",
    agent: "faq",
  },
  {
    text: "Can people who have received a blood transfusion in the past donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation programs address the cultural beliefs and practices that may discourage donation?",
    agent: "faq",
  },
  {
    text: "Can people who have received a tattoo or piercing in the past donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure donor privacy and confidentiality?",
    agent: "faq",
  },
  {
    text: "Can people with a history of high blood pressure donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure the safety and quality of donated blood products?",
    agent: "faq",
  },
  {
    text: "Can people with a history of liver disease donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation programs address the needs of people from different age groups?",
    agent: "faq",
  },
  {
    text: "Can people with a history of hepatitis B or C donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure the safety and well-being of donors during and after donation?",
    agent: "faq",
  },
  {
    text: "Can people with a history of kidney disease donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation programs address the needs of the LGBTQ+ community?",
    agent: "faq",
  },
  {
    text: "Can people with a history of tuberculosis donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure adequate staffing and volunteer support?",
    agent: "faq",
  },
  { text: "Can people with a history of malaria donate blood?", agent: "faq" },
  {
    text: "How can blood donation programs address the needsof people with disabilities?",
    agent: "faq",
  },
  { text: "Can people with a history of cancer donate blood?", agent: "faq" },
  {
    text: "How can blood donation centers ensure the efficient and timely processing of donated blood products?",
    agent: "faq",
  },
  {
    text: "Can people with a history of heart disease donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation programs address the needs of rural and remote communities?",
    agent: "faq",
  },
  {
    text: "Can people with a history of autoimmune disorders donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure the equitable distribution of donated blood products?",
    agent: "faq",
  },
  {
    text: "Can people with a history of sexually transmitted infections donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation programs address the needs of marginalized and underserved communities?",
    agent: "faq",
  },
  {
    text: "Can people with a history of substance abuse donate blood?",
    agent: "faq",
  },
  {
    text: "How can blood donation centers ensure transparency and accountability in their operations?",
    agent: "faq",
  },
  { text: "How common is Thalassemia?", agent: "faq" },
  { text: "What causes Thalassemia?", agent: "faq" },
  { text: "Is Thalassemia inherited?", agent: "faq" },
  { text: "Can Thalassemia be cured?", agent: "faq" },
  { text: "What are the symptoms of Thalassemia?", agent: "faq" },
  { text: "How is Thalassemia diagnosed?", agent: "faq" },
  {
    text: "What is the difference between Thalassemia major and Thalassemia minor?",
    agent: "faq",
  },
  { text: "How is Thalassemia treated?", agent: "faq" },
  { text: "What is the cost of treatment for Thalassemia?", agent: "faq" },
  {
    text: "What is the life expectancy of a person with Thalassemia?",
    agent: "faq",
  },
  {
    text: "What is the prevalence of Thalassemia in different regions of India?",
    agent: "faq",
  },
  { text: "What is the genetic basis of Thalassemia?", agent: "faq" },
  { text: "How is Thalassemia managed in rural areas of India?", agent: "faq" },
  { text: "What are the challenges of managing Thalassemia?", agent: "faq" },
  {
    text: "How can genetic counseling help families affected by Thalassemia?",
    agent: "faq",
  },
  { text: "How can Thalassemia be prevented?", agent: "faq" },
  {
    text: "What is the role of prenatal diagnosis in preventing Thalassemia?",
    agent: "faq",
  },
  {
    text: "What are the ethical considerations around prenatal diagnosis for Thalassemia?",
    agent: "faq",
  },
  { text: "What are the current research areas in Thalassemia?", agent: "faq" },
  {
    text: "What are the challenges in conducting Thalassemia research?",
    agent: "faq",
  },
  {
    text: "How can community engagement improve Thalassemia research?",
    agent: "faq",
  },
  {
    text: "What is the role of advocacy organizations in Thalassemia research?",
    agent: "faq",
  },
  { text: "What is the impact of Thalassemia on the economy?", agent: "faq" },
  {
    text: "How can public health initiatives help address the burden of Thalassemia?",
    agent: "faq",
  },
  { text: "What is the impact of Thalassemia on mental health?", agent: "faq" },
  {
    text: "How can mental health services be integrated into Thalassemia care?",
    agent: "faq",
  },
  {
    text: "How can technology be used to improve Thalassemia care?",
    agent: "faq",
  },
  { text: "What is the impact of Thalassemia on education?", agent: "faq" },
  {
    text: "How can schools and educational institutions support students with Thalassemia?",
    agent: "faq",
  },
  {
    text: "How can Blood Bridge by Blood Warriors help families affected by Thalassemia?",
    agent: "faq",
  },
  {
    text: "What are the legal considerations around Thalassemia?",
    agent: "faq",
  },
  {
    text: "How can policy change help address the burden of Thalassemia?",
    agent: "faq",
  },
  { text: "What is the impact of Thalassemia on gender?", agent: "faq" },
  {
    text: "How can gender-sensitive policies and interventions help address Thalassemia?",
    agent: "faq",
  },
  {
    text: "What is the role of international partnerships in Thalassemia research and treatment?",
    agent: "faq",
  },
  {
    text: "What is the role of the government in addressing Thalassemia?",
    agent: "faq",
  },
  {
    text: "What are the potential future directions for Thalassemia research?",
    agent: "faq",
  },
  {
    text: "How can Thalassemia research contribute to the global understanding of the condition?",
    agent: "faq",
  },
  {
    text: "What is the impact of Thalassemia on child development?",
    agent: "faq",
  },
  {
    text: "How can early intervention and support help promote healthy child development for children with Thalassemia?",
    agent: "faq",
  },
  {
    text: "What is the impact of Thalassemia on the healthcare system?",
    agent: "faq",
  },
  {
    text: "How can the healthcare system be strengthened to better address Thalassemia?",
    agent: "faq",
  },
  {
    text: "How can efforts to address Thalassemia also address broader social and economic inequalities?",
    agent: "faq",
  },
  { text: "What is the impact of Thalassemia on mental health?", agent: "faq" },
  {
    text: "How can mental health support be integrated into Thalassemia care?",
    agent: "faq",
  },
  {
    text: "What is the role of community engagement in addressing Thalassemia?",
    agent: "faq",
  },
  {
    text: "How can technology be leveraged to improve Thalassemia care and research?",
    agent: "faq",
  },
  {
    text: "What is the impact of Thalassemia on reproductive health?",
    agent: "faq",
  },
  {
    text: "How can reproductive health services be integrated into Thalassemia care?",
    agent: "faq",
  },
  {
    text: "What is the impact of Thalassemia on the education and career opportunities of people?",
    agent: "faq",
  },
  {
    text: "How can education and career support be integrated into Thalassemia care?",
    agent: "faq",
  },
  {
    text: "What is the impact of Thalassemia on the social lives of people?",
    agent: "faq",
  },
  {
    text: "How can social support be integrated into Thalassemia care?",
    agent: "faq",
  },
  {
    text: "What is the impact of Thalassemia on the cultural beliefs and practices of people?",
    agent: "faq",
  },
  {
    text: "How can cultural sensitivity be integrated into Thalassemia care?",
    agent: "faq",
  },
  {
    text: "How can financial support be integrated into Thalassemia care?",
    agent: "faq",
  },
  {
    text: "What is the role of government in addressing Thalassemia?",
    agent: "faq",
  },
  {
    text: "What are some examples of government initiatives to address Thalassemia?",
    agent: "faq",
  },
  {
    text: "How can advocacy and policy efforts support Thalassemia care and research?",
    agent: "faq",
  },
  {
    text: "What is the role of non-governmental organizations (NGOs) in addressing Thalassemia?",
    agent: "faq",
  },
  {
    text: "What are some examples of NGOs working on Thalassemia?",
    agent: "faq",
  },
  {
    text: "How can collaborations and partnerships support Thalassemia care and research?",
    agent: "faq",
  },
  {
    text: "What are some examples of collaborations and partnerships working on Thalassemia?",
    agent: "faq",
  },
  {
    text: "How can education and awareness campaigns support Thalassemia care and research?",
    agent: "faq",
  },
  {
    text: "What are some examples of education and awareness campaigns on Thalassemia?",
    agent: "faq",
  },
  { text: "తలసేమియా అంటే ఏమిటి?", agent: "faq" },
  { text: "ప్రముఖ తలసేమియా చికిత్స పద్ధతులు ఏమిటి?", agent: "faq" },
  { text: "తలసేమియా యొక్క రూపాలు ఏమిటి?", agent: "faq" },
  { text: "తలసేమియా యొక్క వివిధ రకాలు ఏమిటి?", agent: "faq" },
  { text: "తలసేమియా వచ్చే ప్రమాదం ఎవరికి ఉంది?", agent: "faq" },
  { text: "తలసేమియాను ఎవరు కలిగి ఉంటారు?", agent: "faq" },
  { text: "తలసేమియా మైనర్ అంటే ఏమిటి?", agent: "faq" },
  { text: "తలసేమియా మేజర్ అంటే ఏమిటి?", agent: "faq" },
  { text: "తలసేమియా యొక్క ప్రభావాలు ఏమిటి?", agent: "faq" },
  { text: "మీకు తలసేమియా ఎలా సంక్రమిస్తుంది?", agent: "faq" },
  { text: "మీరు తలసేమియాను కలిగి ఉన్నారా?", agent: "faq" },
  { text: "తలసేమియాను మనం ఎలా నివారించవచ్చు?", agent: "faq" },
  { text: "తలసేమియాకు ఏ వైద్యులు చికిత్స చేస్తారు?", agent: "faq" },
  {
    text: "నేను క్యారియర్ అయితే తలసేమియా పరీక్ష చేయించుకోవడానికి ఉత్తమ సమయం ఎప్పుడు?",
    agent: "faq",
  },
  {
    text: "నా బిడ్డకు బీటా తలసేమియా మేజర్ ఉంది, దానిని నయం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "తలసేమియాను నయం చేయడానికి బోన్ మ్యారో ట్రాన్స్‌ప్లాంటేషన్ (BMT)ని ఉపయోగించడంలో విజయం రేటు ఎంత?",
    agent: "faq",
  },
  { text: "రక్తదాన ప్రక్రియ ఎలా పనిచేస్తుంది?", agent: "faq" },
  { text: "మీరు సూదిని చొప్పించినప్పుడు నొప్పి ఉంటుందా?", agent: "faq" },
  { text: "రక్తదానం చేయడానికి ఎంత సమయం పడుతుంది?", agent: "faq" },
  { text: "రక్తం ఇవ్వడం సురక్షితమేనా?", agent: "faq" },
  { text: "రక్తదాతలకు వయో పరిమితులు ఉన్నాయా?", agent: "faq" },
  {
    text: "నేను మందులు వాడుతున్నాను. నేను ఇప్పటికీ రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  { text: "నా శరీరంలో ఎంత రక్తం ఉంది?", agent: "faq" },
  {
    text: "ఎర్ర కణాలు, ప్లేట్‌లెట్స్ మరియు ప్లాస్మా అంటే ఏమిటి?",
    agent: "faq",
  },
  { text: "రక్తదానం వల్ల కలిగే ఆరోగ్య ప్రయోజనాలు ఏమిటి?", agent: "faq" },
  { text: "హిమోగ్లోబిన్ స్థాయి ఏ స్థాయిలో, రక్తమార్పిడి అవసరం?", agent: "faq" },
  { text: "హిమోగ్లోబిన్ పరిధి ఎంత?", agent: "faq" },
  {
    text: "తలసేమియా ప్రధాన రోగులలో హిమోగ్లోబిన్ యొక్క పరిధి ఎంత?",
    agent: "faq",
  },
  { text: "రక్తాన్ని ఎన్ని రోజులు నిల్వ ఉంచవచ్చు?", agent: "faq" },
  { text: "రెండు వరుస రక్తదానాల మధ్య అంతరం ఎంత ఉండాలి?", agent: "faq" },
  { text: "తలసేమియా రోగులకు ఎంత తరచుగా రక్తమార్పిడి అవసరం?", agent: "faq" },
  {
    text: "1 యూనిట్ బ్యాగ్‌లో మొత్తం రక్తం ఎంత పరిమాణంలో ఉంటుంది?",
    agent: "faq",
  },
  { text: "రక్తదానం అంటే ఏమిటి?", agent: "faq" },
  { text: "రక్తదానం ఎందుకు ముఖ్యం?", agent: "faq" },
  { text: "భారతదేశంలో రక్తదానం ప్రక్రియ ఏమిటి?", agent: "faq" },
  { text: "భారతదేశంలో ఎవరు రక్తదానం చేయవచ్చు?", agent: "faq" },
  { text: "భారతదేశంలో ఎవరైనా ఎంత తరచుగా రక్తదానం చేయవచ్చు?", agent: "faq" },
  { text: "వివిధ రకాల రక్తదానం ఏమిటి?", agent: "faq" },
  { text: "రక్తదానం యొక్క అత్యంత సాధారణ రకం ఏమిటి?", agent: "faq" },
  { text: "ప్లాస్మా దానం అంటే ఏమిటి?", agent: "faq" },
  { text: "ప్లేట్‌లెట్ దానం అంటే ఏమిటి?", agent: "faq" },
  { text: "రక్తదానం చేయడానికి ఎంత సమయం పడుతుంది?", agent: "faq" },
  { text: "రక్తదానం చేయడం వల్ల కలిగే ప్రయోజనాలు ఏమిటి?", agent: "faq" },
  { text: "రక్తదానం చేయడం వల్ల కలిగే నష్టాలు ఏమిటి?", agent: "faq" },
  { text: "దానం చేసిన రక్తం ఎలా ఉపయోగించబడుతుంది?", agent: "faq" },
  { text: "దానం చేసిన రక్తాన్ని ఎలా పరీక్షిస్తారు?", agent: "faq" },
  { text: "రక్తదానం కోసం ప్రజలు ఎలా సిద్ధం చేసుకోవచ్చు?", agent: "faq" },
  { text: "ప్రజలు రక్తదాన కేంద్రాలను ఎలా కనుగొనగలరు?", agent: "faq" },
  { text: "ప్రజలు సాధారణ రక్తదాతలుగా ఎలా మారగలరు?", agent: "faq" },
  { text: "పచ్చబొట్లు ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  { text: "అనారోగ్య సమస్యలు ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  { text: "రక్తదానం శరీరాన్ని ఎలా ప్రభావితం చేస్తుంది?", agent: "faq" },
  { text: "రక్తదానం ఆరోగ్యానికి ఎలా సంబంధం కలిగి ఉంటుంది?", agent: "faq" },
  { text: "రక్తదానం చరిత్ర ఏమిటి?", agent: "faq" },
  { text: "రక్తదానం యొక్క ప్రస్తుత స్థితి ఏమిటి?", agent: "faq" },
  { text: "రక్త సరఫరా కొరతకు కారణాలు ఏమిటి?", agent: "faq" },
  { text: "రక్త సరఫరా కొరత తీర్చేందుకు ప్రభుత్వం ఏం చేస్తోంది?", agent: "faq" },
  { text: "COVID-19 మహమ్మారి రక్తదానంపై ఎలా ప్రభావం చూపింది?", agent: "faq" },
  {
    text: "COVID-19 మహమ్మారి సమయంలో రక్తదానం చేయడం సురక్షితమేనా?",
    agent: "faq",
  },
  {
    text: "COVID-19 వ్యాక్సిన్ తీసుకున్న వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన డ్రైవ్‌లను మరింత అందుబాటులోకి తీసుకురావడం ఎలా?",
    agent: "faq",
  },
  { text: "కొన్ని దేశాలకు వెళ్లిన వారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  { text: "రక్తదానాన్ని మరింత కలుపుకొని ఎలా చేయవచ్చు?", agent: "faq" },
  { text: "COVID-19 ఉన్న వ్యక్తులు రక్తదానం చేయవచ్చా?", agent: "faq" },
  { text: "రక్తదానం ఆర్థిక వ్యవస్థపై ఎలా ప్రభావం చూపుతుంది?", agent: "faq" },
  { text: "రక్తదాన ప్రక్రియను మరింత సమర్థవంతంగా ఎలా చేయవచ్చు?", agent: "faq" },
  {
    text: "రక్తమార్పిడి చేయించుకున్న వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదానాన్ని ప్రోత్సహించడానికి సోషల్ మీడియాను ఎలా ఉపయోగించవచ్చు?",
    agent: "faq",
  },
  { text: "ఇటీవల ప్రసవించిన వారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  { text: "కార్యాలయాలు రక్తదానాన్ని ఎలా ప్రోత్సహిస్తాయి?", agent: "faq" },
  { text: "మందులు వాడుతున్న వారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  { text: "వికలాంగులకు రక్తదానం ఎలా అందుబాటులోకి వస్తుంది?", agent: "faq" },
  { text: "క్యాన్సర్ ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "పాఠశాలలు మరియు కళాశాలలు రక్తదానాన్ని ఎలా ప్రోత్సహిస్తాయి?",
    agent: "faq",
  },
  { text: "పచ్చబొట్లు లేదా కుట్లు ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "భారత ప్రభుత్వం రక్తదాన విధానాలు మరియు నిబంధనలను ఎలా మెరుగుపరుస్తుంది?",
    agent: "faq",
  },
  { text: "శస్త్రచికిత్స చేయించుకున్న వారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన ప్రచారాలలో మతపరమైన మరియు సాంస్కృతిక విశ్వాసాలను ఎలా పరిష్కరించవచ్చు?",
    agent: "faq",
  },
  { text: "అధిక రక్తపోటు ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  { text: "రక్తదానం ఎలా దాతలకు మరింత సౌకర్యవంతంగా ఉంటుంది?", agent: "faq" },
  { text: "మధుమేహం ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కేంద్రాలు దాతల సంతృప్తిని ఎలా మెరుగుపరుస్తాయి?",
    agent: "faq",
  },
  { text: "హెపటైటిస్ ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదానాన్ని ప్రోత్సహించడంలో ప్రముఖులు మరియు ప్రజాప్రతినిధులు ఎలా సహాయపడగలరు?",
    agent: "faq",
  },
  { text: "గుండెపోటు వచ్చిన వారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కార్యక్రమాలలో దాత గోప్యతను ఎలా నిర్ధారిస్తారు?",
    agent: "faq",
  },
  { text: "తక్కువ బరువు ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  { text: "రక్తదాన కార్యక్రమాలను మరింత స్థిరంగా ఎలా చేయవచ్చు?", agent: "faq" },
  {
    text: "గతంలో రక్తమార్పిడి చేయించుకున్న వారు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన ప్రక్రియ సమయంలో రక్తదాన కేంద్రాలు భద్రత మరియు పరిశుభ్రతను ఎలా నిర్ధారిస్తాయి?",
    agent: "faq",
  },
  {
    text: "మాదకద్రవ్యాల చరిత్ర కలిగిన వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన కేంద్రాలు సాధారణ దాతలను బహుళ విరాళాలు చేసేలా ఎలా ప్రోత్సహిస్తాయి?",
    agent: "faq",
  },
  {
    text: "లైంగికంగా సంక్రమించే వ్యాధుల (STDలు) చరిత్ర కలిగిన వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన కార్యక్రమాలు అట్టడుగు వర్గాల అవసరాలను ఎలా తీర్చగలవు?",
    agent: "faq",
  },
  { text: "క్యాన్సర్ చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదానాన్ని ప్రోత్సహించడానికి సోషల్ మీడియాను ఎలా ఉపయోగించవచ్చు?",
    agent: "faq",
  },
  { text: "మానసిక వ్యాధి చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కేంద్రాలు వైకల్యం ఉన్న దాతలకు ఎలా వసతి కల్పిస్తాయి?",
    agent: "faq",
  },
  { text: "పక్షవాతం వచ్చిన వారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కేంద్రాలు దాతలలో భాషాపరమైన అడ్డంకులను ఎలా పరిష్కరించగలవు?",
    agent: "faq",
  },
  { text: "గుండె జబ్బుల చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కేంద్రాలు రక్త ఉత్పత్తులకు సమానమైన ప్రాప్యతను ఎలా నిర్ధారిస్తాయి?",
    agent: "faq",
  },
  { text: "ఇటీవల టీకా తీసుకున్న వ్యక్తులు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కార్యక్రమాలు గ్రామీణ వర్గాల అవసరాలను ఎలా తీర్చగలవు?",
    agent: "faq",
  },
  { text: "అలెర్జీ చరిత్ర ఉన్న వ్యక్తులు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన ప్రక్రియ సమయంలో రక్తదాన కేంద్రాలు దాత సౌకర్యాన్ని ఎలా అందిస్తాయి?",
    agent: "faq",
  },
  { text: "గతంలో రక్తం ఎక్కించిన వారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కార్యక్రమాలు విరాళాన్ని నిరుత్సాహపరిచే సాంస్కృతిక విశ్వాసాలు మరియు అభ్యాసాలను ఎలా పరిష్కరించగలవు?",
    agent: "faq",
  },
  {
    text: "గతంలో టాటూ లేదా కుట్లు వేయించుకున్న వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన కేంద్రాలు దాత గోప్యత మరియు గోప్యతను ఎలా నిర్ధారిస్తాయి?",
    agent: "faq",
  },
  { text: "అధిక రక్తపోటు చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కేంద్రాలు దానం చేసిన రక్త ఉత్పత్తుల భద్రత మరియు నాణ్యతను ఎలా నిర్ధారిస్తాయి?",
    agent: "faq",
  },
  { text: "కాలేయ వ్యాధి చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కార్యక్రమాలు వివిధ వయసుల వ్యక్తుల అవసరాలను ఎలా తీర్చగలవు?",
    agent: "faq",
  },
  {
    text: "హెపటైటిస్ బి లేదా సి చరిత్ర ఉన్న వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన కేంద్రాలు విరాళం సమయంలో మరియు తర్వాత దాతల భద్రత మరియు శ్రేయస్సును ఎలా నిర్ధారిస్తాయి?",
    agent: "faq",
  },
  { text: "కిడ్నీ వ్యాధి చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కార్యక్రమాలు LGBTQ+ సంఘం అవసరాలను ఎలా తీర్చగలవు?",
    agent: "faq",
  },
  { text: "క్షయ వ్యాధి చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కేంద్రాలు తగిన సిబ్బందిని మరియు స్వచ్ఛంద సహాయాన్ని ఎలా అందించగలవు?",
    agent: "faq",
  },
  { text: "మలేరియా చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కార్యక్రమాలు వికలాంగుల అవసరాలను ఎలా తీర్చగలవు?",
    agent: "faq",
  },
  { text: "క్యాన్సర్ చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కేంద్రాలు దానం చేసిన రక్త ఉత్పత్తులను సమర్థవంతంగా మరియు సకాలంలో ఎలా ప్రాసెస్ చేయగలవు?",
    agent: "faq",
  },
  { text: "గుండె జబ్బుల చరిత్ర ఉన్నవారు రక్తదానం చేయవచ్చా?", agent: "faq" },
  {
    text: "రక్తదాన కార్యక్రమాలు గ్రామీణ మరియు మారుమూల వర్గాల అవసరాలను ఎలా తీర్చగలవు?",
    agent: "faq",
  },
  {
    text: "స్వయం ప్రతిరక్షక రుగ్మతల చరిత్ర కలిగిన వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన కేంద్రాలు దానం చేసిన రక్త ఉత్పత్తుల సమాన పంపిణీని ఎలా నిర్ధారిస్తాయి?",
    agent: "faq",
  },
  {
    text: "లైంగికంగా సంక్రమించే అంటువ్యాధుల చరిత్ర ఉన్న వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన కార్యక్రమాలు అట్టడుగున ఉన్న మరియు వెనుకబడిన వర్గాల అవసరాలను ఎలా తీర్చగలవు?",
    agent: "faq",
  },
  {
    text: "మాదక ద్రవ్యాల దుర్వినియోగ చరిత్ర కలిగిన వ్యక్తులు రక్తదానం చేయవచ్చా?",
    agent: "faq",
  },
  {
    text: "రక్తదాన కేంద్రాలు తమ కార్యకలాపాలలో పారదర్శకత మరియు జవాబుదారీతనాన్ని ఎలా నిర్ధారిస్తాయి?",
    agent: "faq",
  },
  { text: "తలసేమియా ఎంత సాధారణం?", agent: "faq" },
  { text: "తలసేమియాకు కారణమేమిటి?", agent: "faq" },
  { text: "తలసేమియా వారసత్వంగా వస్తుందా?", agent: "faq" },
  { text: "తలసేమియా నయం చేయగలదా?", agent: "faq" },
  { text: "తలసేమియా లక్షణాలు ఏమిటి?", agent: "faq" },
  { text: "తలసేమియా ఎలా నిర్ధారణ అవుతుంది?", agent: "faq" },
  {
    text: "తలసేమియా మేజర్ మరియు తలసేమియా మైనర్ మధ్య తేడా ఏమిటి?",
    agent: "faq",
  },
  { text: "తలసేమియా ఎలా చికిత్స పొందుతుంది?", agent: "faq" },
  { text: "తలసేమియా చికిత్సకు అయ్యే ఖర్చు ఎంత?", agent: "faq" },
  { text: "తలసేమియా ఉన్న వ్యక్తి జీవితకాలం ఎంత?", agent: "faq" },
  {
    text: "భారతదేశంలోని వివిధ ప్రాంతాలలో తలసేమియా యొక్క ప్రాబల్యం ఏమిటి?",
    agent: "faq",
  },
  { text: "తలసేమియా యొక్క జన్యుపరమైన ఆధారం ఏమిటి?", agent: "faq" },
  {
    text: "భారతదేశంలోని గ్రామీణ ప్రాంతాల్లో తలసేమియా ఎలా నిర్వహించబడుతుంది?",
    agent: "faq",
  },
  { text: "తలసేమియా నిర్వహణలో ఎదురయ్యే సవాళ్లు ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియా బారిన పడిన కుటుంబాలకు జన్యుపరమైన సలహాలు ఎలా సహాయపడతాయి?",
    agent: "faq",
  },
  { text: "తలసేమియాను ఎలా నివారించవచ్చు?", agent: "faq" },
  {
    text: "తలసేమియాను నివారించడంలో ప్రినేటల్ డయాగ్నసిస్ పాత్ర ఏమిటి?",
    agent: "faq",
  },
  {
    text: "తలసేమియా కోసం ప్రినేటల్ డయాగ్నసిస్ గురించి నైతిక పరిగణనలు ఏమిటి?",
    agent: "faq",
  },
  { text: "తలసేమియాలో ప్రస్తుత పరిశోధనా ప్రాంతాలు ఏమిటి?", agent: "faq" },
  { text: "తలసేమియా పరిశోధన నిర్వహించడంలో సవాళ్లు ఏమిటి?", agent: "faq" },
  {
    text: "సమాజ నిశ్చితార్థం తలసేమియా పరిశోధనను ఎలా మెరుగుపరుస్తుంది?",
    agent: "faq",
  },
  { text: "తలసేమియా పరిశోధనలో న్యాయవాద సంస్థల పాత్ర ఏమిటి?", agent: "faq" },
  { text: "ఆర్థిక వ్యవస్థపై తలసేమియా ప్రభావం ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియా భారాన్ని పరిష్కరించడంలో ప్రజారోగ్య కార్యక్రమాలు ఎలా సహాయపడతాయి?",
    agent: "faq",
  },
  { text: "మానసిక ఆరోగ్యంపై తలసేమియా యొక్క ప్రభావము ఏమిటి?", agent: "faq" },
  {
    text: "మానసిక ఆరోగ్య సేవలను తలసేమియా సంరక్షణలో ఎలా విలీనం చేయవచ్చు?",
    agent: "faq",
  },
  {
    text: "తలసేమియా సంరక్షణను మెరుగుపరచడానికి సాంకేతికతను ఎలా ఉపయోగించవచ్చు?",
    agent: "faq",
  },
  { text: "విద్యపై తలసేమియా ప్రభావం ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియా ఉన్న విద్యార్థులకు పాఠశాలలు మరియు విద్యాసంస్థలు ఎలా మద్దతు ఇస్తాయి?",
    agent: "faq",
  },
  {
    text: "తలసేమియా బారిన పడిన కుటుంబాలకు బ్లడ్ వారియర్స్ బ్లడ్ బ్రిడ్జ్ ఎలా సహాయం చేస్తుంది?",
    agent: "faq",
  },
  { text: "తలసేమియా గురించి చట్టపరమైన పరిగణనలు ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియా భారాన్ని పరిష్కరించడంలో పాలసీ మార్పు ఎలా సహాయపడుతుంది?",
    agent: "faq",
  },
  { text: "లింగంపై Thalassemia యొక్క ప్రభావము ఏమిటి?", agent: "faq" },
  {
    text: "లింగ-సెన్సిటివ్ విధానాలు మరియు జోక్యాలు తలసేమియాను ఎలా పరిష్కరించడంలో సహాయపడతాయి?",
    agent: "faq",
  },
  {
    text: "తలసేమియా పరిశోధన మరియు చికిత్సలో అంతర్జాతీయ భాగస్వామ్యాల పాత్ర ఏమిటి?",
    agent: "faq",
  },
  { text: "తలసేమియాను పరిష్కరించడంలో ప్రభుత్వ పాత్ర ఏమిటి?", agent: "faq" },
  { text: "తలసేమియా పరిశోధన కోసం భవిష్యత్ దిశలు ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియా పరిశోధన పరిస్థితిపై ప్రపంచ అవగాహనకు ఎలా దోహదపడుతుంది?",
    agent: "faq",
  },
  { text: "పిల్లల అభివృద్ధిపై తలసేమియా ప్రభావం ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియా ఉన్న పిల్లలకు ఆరోగ్యకరమైన పిల్లల అభివృద్ధిని ప్రోత్సహించడంలో ముందస్తు జోక్యం మరియు మద్దతు ఎలా సహాయపడుతుంది?",
    agent: "faq",
  },
  {
    text: "ఆరోగ్య సంరక్షణ వ్యవస్థపై తలసేమియా యొక్క ప్రభావము ఏమిటి?",
    agent: "faq",
  },
  {
    text: "తలసేమియాను మెరుగ్గా పరిష్కరించేందుకు ఆరోగ్య సంరక్షణ వ్యవస్థను ఎలా బలోపేతం చేయవచ్చు?",
    agent: "faq",
  },
  {
    text: "తలసేమియాను పరిష్కరించే ప్రయత్నాలు విస్తృత సామాజిక మరియు ఆర్థిక అసమానతలను కూడా ఎలా పరిష్కరించగలవు?",
    agent: "faq",
  },
  { text: "మానసిక ఆరోగ్యంపై తలసేమియా యొక్క ప్రభావము ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియా సంరక్షణలో మానసిక ఆరోగ్య సహాయాన్ని ఎలా విలీనం చేయవచ్చు?",
    agent: "faq",
  },
  {
    text: "తలసేమియాను పరిష్కరించడంలో కమ్యూనిటీ ఎంగేజ్‌మెంట్ పాత్ర ఏమిటి?",
    agent: "faq",
  },
  {
    text: "తలసేమియా సంరక్షణ మరియు పరిశోధనలను మెరుగుపరచడానికి సాంకేతికతను ఎలా ఉపయోగించుకోవచ్చు?",
    agent: "faq",
  },
  {
    text: "పునరుత్పత్తి ఆరోగ్యంపై తలసేమియా యొక్క ప్రభావము ఏమిటి?",
    agent: "faq",
  },
  {
    text: "పునరుత్పత్తి ఆరోగ్య సేవలను తలసేమియా సంరక్షణలో ఎలా విలీనం చేయవచ్చు?",
    agent: "faq",
  },
  {
    text: "ప్రజల విద్య మరియు వృత్తి అవకాశాలపై తలసేమియా ప్రభావం ఏమిటి?",
    agent: "faq",
  },
  {
    text: "విద్య మరియు కెరీర్ సపోర్టును తలసేమియా కేర్‌లో ఎలా విలీనం చేయవచ్చు?",
    agent: "faq",
  },
  { text: "ప్రజల సామాజిక జీవితాలపై తలసేమియా ప్రభావం ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియా సంరక్షణలో సామాజిక మద్దతును ఎలా విలీనం చేయవచ్చు?",
    agent: "faq",
  },
  {
    text: "ప్రజల సాంస్కృతిక విశ్వాసాలు మరియు ఆచారాలపై తలసేమియా ప్రభావం ఏమిటి?",
    agent: "faq",
  },
  {
    text: "తలసేమియా సంరక్షణలో సాంస్కృతిక సున్నితత్వాన్ని ఎలా విలీనం చేయవచ్చు?",
    agent: "faq",
  },
  {
    text: "తలసేమియా సంరక్షణలో ఆర్థిక సహాయాన్ని ఎలా విలీనం చేయవచ్చు?",
    agent: "faq",
  },
  { text: "తలసేమియాను పరిష్కరించడంలో ప్రభుత్వ పాత్ర ఏమిటి?", agent: "faq" },
  {
    text: "తలసేమియాను పరిష్కరించడానికి ప్రభుత్వ కార్యక్రమాలకు కొన్ని ఉదాహరణలు ఏమిటి?",
    agent: "faq",
  },
  {
    text: "న్యాయవాద మరియు విధాన ప్రయత్నాలు తలసేమియా సంరక్షణ మరియు పరిశోధనలకు ఎలా మద్దతు ఇస్తాయి?",
    agent: "faq",
  },
  {
    text: "తలసేమియాను పరిష్కరించడంలో ప్రభుత్వేతర సంస్థల (NGOలు) పాత్ర ఏమిటి?",
    agent: "faq",
  },
  {
    text: "తలసేమియాపై పనిచేస్తున్న NGOలకు కొన్ని ఉదాహరణలు ఏమిటి?",
    agent: "faq",
  },
  {
    text: "సహకారాలు మరియు భాగస్వామ్యాలు తలసేమియా సంరక్షణ మరియు పరిశోధనలకు ఎలా తోడ్పడతాయి?",
    agent: "faq",
  },
  {
    text: "తలసేమియాపై పని చేస్తున్న సహకారాలు మరియు భాగస్వామ్యాలకు కొన్ని ఉదాహరణలు ఏమిటి?",
    agent: "faq",
  },
  {
    text: "విద్య మరియు అవగాహన ప్రచారాలు తలసేమియా సంరక్షణ మరియు పరిశోధనలకు ఎలా తోడ్పడతాయి?",
    agent: "faq",
  },
  {
    text: "తలసేమియాపై విద్య మరియు అవగాహన ప్రచారాలకు కొన్ని ఉదాహరణలు ఏమిటి?",
    agent: "faq",
  },
  { text: "थैलेसीमिया क्या है?", agent: "faq" },
  { text: "थैलेसीमिया के उपचार के लोकप्रिय तरीके क्या हैं?", agent: "faq" },
  { text: "थैलेसीमिया के प्रकार क्या हैं?", agent: "faq" },
  { text: "थैलेसीमिया के विभिन्न प्रकार क्या हैं?", agent: "faq" },
  { text: "थैलेसीमिया का ख़तरा किसे है?", agent: "faq" },
  { text: "थैलेसीमिया का वाहक कौन है?", agent: "faq" },
  { text: "थैलेसीमिया माइनर क्या है?", agent: "faq" },
  { text: "थैलेसीमिया मेजर क्या है?", agent: "faq" },
  { text: "थैलेसीमिया के प्रभाव क्या हैं?", agent: "faq" },
  { text: "आपको थैलेसीमिया कैसे विरासत में मिला है?", agent: "faq" },
  { text: "क्या आपको थैलेसीमिया है?", agent: "faq" },
  { text: "हम थैलेसीमिया को कैसे रोक सकते हैं?", agent: "faq" },
  { text: "कौन से डॉक्टर थैलेसीमिया का इलाज करते हैं?", agent: "faq" },
  {
    text: "यदि मैं थैलेसीमिया का वाहक हूं तो थैलेसीमिया परीक्षण कराने का सबसे अच्छा समय कब है?",
    agent: "faq",
  },
  {
    text: "मेरे बच्चे को बीटा थैलेसीमिया मेजर है, क्या इसे ठीक किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया के इलाज के लिए बोन मैरो ट्रांसप्लांटेशन (बीएमटी) का उपयोग करने की सफलता दर क्या है?",
    agent: "faq",
  },
  { text: "रक्तदान प्रक्रिया कैसे काम करती है?", agent: "faq" },
  { text: "क्या सुई डालने पर दर्द होगा?", agent: "faq" },
  { text: "रक्तदान में कितना समय लगता है?", agent: "faq" },
  { text: "क्या रक्त देना सुरक्षित है?", agent: "faq" },
  { text: "क्या रक्तदाताओं के लिए कोई आयु सीमा है?", agent: "faq" },
  {
    text: "मैं दवाएँ ले रहा हूँ. क्या मैं अब भी रक्तदान कर सकता हूँ?",
    agent: "faq",
  },
  { text: "मेरे शरीर में कितना खून है?", agent: "faq" },
  { text: "लाल कोशिकाएँ, प्लेटलेट्स और प्लाज़्मा क्या हैं?", agent: "faq" },
  { text: "रक्तदान के स्वास्थ्य लाभ क्या हैं?", agent: "faq" },
  {
    text: "हीमोग्लोबिन स्तर की किस सीमा पर आधान की आवश्यकता होती है?",
    agent: "faq",
  },
  { text: "हीमोग्लोबिन की सीमा क्या है?", agent: "faq" },
  {
    text: "थैलेसीमिया प्रमुख रोगियों में उपलब्ध हीमोग्लोबिन की सीमा क्या है?",
    agent: "faq",
  },
  { text: "रक्त को कितने दिनों तक संग्रहित किया जा सकता है?", agent: "faq" },
  { text: "लगातार दो रक्तदान के बीच कितना अंतर होना चाहिए?", agent: "faq" },
  {
    text: "थैलेसीमिया रोगियों को कितनी बार रक्त आधान की आवश्यकता होती है?",
    agent: "faq",
  },
  {
    text: "1 यूनिट बैग में संपूर्ण रक्त की कितनी मात्रा मौजूद होती है?",
    agent: "faq",
  },
  { text: "रक्तदान क्या है?", agent: "faq" },
  { text: "रक्तदान क्यों महत्वपूर्ण है?", agent: "faq" },
  { text: "भारत में रक्तदान की प्रक्रिया क्या है?", agent: "faq" },
  { text: "भारत में कौन रक्तदान कर सकता है?", agent: "faq" },
  { text: "भारत में कोई कितनी बार रक्तदान कर सकता है?", agent: "faq" },
  { text: "रक्तदान के विभिन्न प्रकार क्या हैं?", agent: "faq" },
  { text: "रक्तदान का सबसे आम प्रकार क्या है?", agent: "faq" },
  { text: "प्लाज्मा दान क्या है?", agent: "faq" },
  { text: "प्लेटलेट दान क्या है?", agent: "faq" },
  { text: "रक्तदान में कितना समय लगता है?", agent: "faq" },
  { text: "रक्तदान करने के क्या फायदे हैं?", agent: "faq" },
  { text: "रक्तदान करने के जोखिम क्या हैं?", agent: "faq" },
  { text: "दान किये गये रक्त का उपयोग कैसे किया जाता है?", agent: "faq" },
  { text: "दान किये गये रक्त का परीक्षण कैसे किया जाता है?", agent: "faq" },
  { text: "लोग रक्तदान के लिए कैसे तैयारी कर सकते हैं?", agent: "faq" },
  { text: "लोग रक्तदान केंद्र कैसे ढूंढ सकते हैं?", agent: "faq" },
  { text: "लोग नियमित रक्तदाता कैसे बन सकते हैं?", agent: "faq" },
  { text: "क्या टैटू वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  { text: "क्या चिकित्सीय स्थिति वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  { text: "रक्तदान शरीर पर कैसे प्रभाव डालता है?", agent: "faq" },
  { text: "रक्तदान का स्वास्थ्य से क्या संबंध है?", agent: "faq" },
  { text: "रक्तदान का इतिहास क्या है?", agent: "faq" },
  { text: "रक्तदान की वर्तमान स्थिति क्या है?", agent: "faq" },
  { text: "रक्त आपूर्ति की कमी के क्या कारण हैं?", agent: "faq" },
  {
    text: "रक्त आपूर्ति की कमी को दूर करने के लिए सरकार क्या कर रही है?",
    agent: "faq",
  },
  {
    text: "कोविड-19 महामारी ने रक्तदान को कैसे प्रभावित किया है?",
    agent: "faq",
  },
  {
    text: "क्या कोविड-19 महामारी के दौरान रक्तदान करना सुरक्षित है?",
    agent: "faq",
  },
  {
    text: "क्या जिन लोगों को COVID-19 वैक्सीन मिली है वे रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान अभियान को और अधिक सुलभ कैसे बनाया जा सकता है?",
    agent: "faq",
  },
  {
    text: "क्या कुछ देशों की यात्रा करने वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  { text: "रक्तदान को और अधिक समावेशी कैसे बनाया जा सकता है?", agent: "faq" },
  {
    text: "क्या जिन लोगों को COVID-19 हुआ है वे रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  { text: "रक्तदान का अर्थव्यवस्था पर क्या प्रभाव पड़ता है?", agent: "faq" },
  {
    text: "रक्तदान प्रक्रिया को और अधिक कुशल कैसे बनाया जा सकता है?",
    agent: "faq",
  },
  {
    text: "क्या जिन लोगों को रक्त चढ़ाया गया है वे रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान को बढ़ावा देने के लिए सोशल मीडिया का उपयोग कैसे किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "क्या जिन लोगों ने हाल ही में बच्चे को जन्म दिया है वे रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  { text: "कार्यस्थल रक्तदान को कैसे प्रोत्साहित कर सकते हैं?", agent: "faq" },
  { text: "क्या दवाएँ लेने वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "विकलांग लोगों के लिए रक्तदान को और अधिक सुलभ कैसे बनाया जा सकता है?",
    agent: "faq",
  },
  { text: "क्या कैंसर से पीड़ित लोग रक्तदान कर सकते हैं?", agent: "faq" },
  { text: "स्कूल और कॉलेज रक्तदान को कैसे बढ़ावा दे सकते हैं?", agent: "faq" },
  { text: "क्या टैटू या छेदन वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "भारत सरकार रक्तदान नीतियों और विनियमों को कैसे सुधार सकती है?",
    agent: "faq",
  },
  { text: "क्या सर्जरी करा चुके लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदान अभियानों में धार्मिक और सांस्कृतिक मान्यताओं को कैसे संबोधित किया जा सकता है?",
    agent: "faq",
  },
  { text: "क्या उच्च रक्तचाप वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदाताओं के लिए रक्तदान को और अधिक सुविधाजनक कैसे बनाया जा सकता है?",
    agent: "faq",
  },
  { text: "क्या मधुमेह से पीड़ित लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदान केंद्र दाता संतुष्टि में कैसे सुधार कर सकते हैं?",
    agent: "faq",
  },
  { text: "क्या हेपेटाइटिस से पीड़ित लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "मशहूर हस्तियां और सार्वजनिक हस्तियां रक्तदान को बढ़ावा देने में कैसे मदद कर सकती हैं?",
    agent: "faq",
  },
  {
    text: "क्या दिल का दौरा पड़ने वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रमों में दाता की गोपनीयता कैसे सुनिश्चित की जा सकती है?",
    agent: "faq",
  },
  { text: "क्या कम वजन वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदान कार्यक्रमों को और अधिक टिकाऊ कैसे बनाया जा सकता है?",
    agent: "faq",
  },
  {
    text: "क्या वे लोग जिन्हें पहले रक्त-आधान हुआ हो, रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र दान प्रक्रिया के दौरान सुरक्षा और स्वच्छता कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या नशीली दवाओं के उपयोग के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र नियमित दाताओं को एकाधिक दान करने के लिए कैसे प्रोत्साहित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या यौन संचारित रोगों (एसटीडी) के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रम हाशिए पर रहने वाले समुदायों की जरूरतों को कैसे पूरा कर सकते हैं?",
    agent: "faq",
  },
  { text: "क्या कैंसर के इतिहास वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदान को बढ़ावा देने के लिए सोशल मीडिया का उपयोग कैसे किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "क्या मानसिक बीमारी के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र विकलांग दाताओं को कैसे समायोजित कर सकते हैं?",
    agent: "faq",
  },
  { text: "क्या स्ट्रोक से पीड़ित लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदान केंद्र दाताओं के बीच भाषा संबंधी बाधाओं को कैसे दूर कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या हृदय रोग के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र रक्त उत्पादों तक समान पहुंच कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या जिन लोगों को हाल ही में टीका लगा है वे रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रम ग्रामीण समुदायों की जरूरतों को कैसे पूरा कर सकते हैं?",
    agent: "faq",
  },
  { text: "क्या एलर्जी के इतिहास वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदान केंद्र दान प्रक्रिया के दौरान दाता को आराम कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या जिन लोगों को पहले रक्त आधान हुआ है वे रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रम उन सांस्कृतिक मान्यताओं और प्रथाओं को कैसे संबोधित कर सकते हैं जो दान को हतोत्साहित कर सकती हैं?",
    agent: "faq",
  },
  {
    text: "क्या वे लोग जिन्होंने पहले कभी टैटू या छेद करवाया हो, रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र दाता की निजता और गोपनीयता कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या उच्च रक्तचाप के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र दान किए गए रक्त उत्पादों की सुरक्षा और गुणवत्ता कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या लीवर रोग के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रम विभिन्न आयु वर्ग के लोगों की जरूरतों को कैसे पूरा कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या हेपेटाइटिस बी या सी के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र दान के दौरान और बाद में दाताओं की सुरक्षा और भलाई कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या किडनी रोग के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रम एलजीबीटीक्यू+ समुदाय की जरूरतों को कैसे पूरा कर सकते हैं?",
    agent: "faq",
  },
  { text: "क्या तपेदिक के इतिहास वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदान केंद्र पर्याप्त स्टाफ और स्वयंसेवक सहायता कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या मलेरिया के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रम विकलांग लोगों की जरूरतों को कैसे पूरा कर सकते हैं?",
    agent: "faq",
  },
  { text: "क्या कैंसर के इतिहास वाले लोग रक्तदान कर सकते हैं?", agent: "faq" },
  {
    text: "रक्तदान केंद्र दान किए गए रक्त उत्पादों का कुशल और समय पर प्रसंस्करण कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या हृदय रोग के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रम ग्रामीण और दूरदराज के समुदायों की जरूरतों को कैसे पूरा कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या ऑटोइम्यून विकारों के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र दान किए गए रक्त उत्पादों का समान वितरण कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या यौन संचारित संक्रमणों के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान कार्यक्रम हाशिये पर मौजूद और वंचित समुदायों की जरूरतों को कैसे पूरा कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "क्या मादक द्रव्यों के सेवन के इतिहास वाले लोग रक्तदान कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "रक्तदान केंद्र अपने संचालन में पारदर्शिता और जवाबदेही कैसे सुनिश्चित कर सकते हैं?",
    agent: "faq",
  },
  { text: "थैलेसीमिया कितना आम है?", agent: "faq" },
  { text: "थैलेसीमिया का कारण क्या है?", agent: "faq" },
  { text: "क्या थैलेसीमिया विरासत में मिला है?", agent: "faq" },
  { text: "क्या थैलेसीमिया ठीक हो सकता है?", agent: "faq" },
  { text: "थैलेसीमिया के लक्षण क्या हैं?", agent: "faq" },
  { text: "थैलेसीमिया का निदान कैसे किया जाता है?", agent: "faq" },
  {
    text: "थैलेसीमिया मेजर और थैलेसीमिया माइनर में क्या अंतर है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया का इलाज कैसे किया जाता है?", agent: "faq" },
  { text: "थैलेसीमिया के इलाज की लागत क्या है?", agent: "faq" },
  {
    text: "थैलेसीमिया से पीड़ित व्यक्ति की जीवन प्रत्याशा क्या है?",
    agent: "faq",
  },
  {
    text: "भारत के विभिन्न क्षेत्रों में थैलेसीमिया की व्यापकता क्या है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया का आनुवंशिक आधार क्या है?", agent: "faq" },
  {
    text: "भारत के ग्रामीण क्षेत्रों में थैलेसीमिया का प्रबंधन कैसे किया जाता है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया के प्रबंधन की चुनौतियाँ क्या हैं?", agent: "faq" },
  {
    text: "आनुवांशिक परामर्श थैलेसीमिया से प्रभावित परिवारों की कैसे मदद कर सकता है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया को कैसे रोका जा सकता है?", agent: "faq" },
  {
    text: "थैलेसीमिया को रोकने में प्रसवपूर्व निदान की क्या भूमिका है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया के लिए प्रसव पूर्व निदान के संबंध में नैतिक विचार क्या हैं?",
    agent: "faq",
  },
  { text: "थैलेसीमिया में वर्तमान अनुसंधान क्षेत्र क्या हैं?", agent: "faq" },
  { text: "थैलेसीमिया अनुसंधान करने में क्या चुनौतियाँ हैं?", agent: "faq" },
  {
    text: "सामुदायिक सहभागिता थैलेसीमिया अनुसंधान को कैसे बेहतर बना सकती है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया अनुसंधान में वकालत संगठनों की क्या भूमिका है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया का अर्थव्यवस्था पर क्या प्रभाव पड़ता है?", agent: "faq" },
  {
    text: "सार्वजनिक स्वास्थ्य पहल थैलेसीमिया के बोझ को दूर करने में कैसे मदद कर सकती है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया का मानसिक स्वास्थ्य पर क्या प्रभाव पड़ता है?",
    agent: "faq",
  },
  {
    text: "मानसिक स्वास्थ्य सेवाओं को थैलेसीमिया देखभाल में कैसे एकीकृत किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया देखभाल में सुधार के लिए प्रौद्योगिकी का उपयोग कैसे किया जा सकता है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया का शिक्षा पर क्या प्रभाव पड़ता है?", agent: "faq" },
  {
    text: "स्कूल और शैक्षणिक संस्थान थैलेसीमिया से पीड़ित छात्रों की सहायता कैसे कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "ब्लड वॉरियर्स द्वारा ब्लड ब्रिज थैलेसीमिया से प्रभावित परिवारों की कैसे मदद कर सकता है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया से संबंधित कानूनी विचार क्या हैं?", agent: "faq" },
  {
    text: "नीति परिवर्तन थैलेसीमिया के बोझ को दूर करने में कैसे मदद कर सकता है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया का लिंग पर क्या प्रभाव पड़ता है?", agent: "faq" },
  {
    text: "लिंग-संवेदनशील नीतियां और हस्तक्षेप थैलेसीमिया से निपटने में कैसे मदद कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया अनुसंधान और उपचार में अंतर्राष्ट्रीय भागीदारी की क्या भूमिका है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया से निपटने में सरकार की क्या भूमिका है?", agent: "faq" },
  {
    text: "थैलेसीमिया अनुसंधान के लिए संभावित भविष्य की दिशाएँ क्या हैं?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया अनुसंधान इस स्थिति की वैश्विक समझ में कैसे योगदान दे सकता है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया का बाल विकास पर क्या प्रभाव पड़ता है?", agent: "faq" },
  {
    text: "थैलेसीमिया से पीड़ित बच्चों के लिए शीघ्र हस्तक्षेप और सहायता कैसे स्वस्थ बाल विकास को बढ़ावा देने में मदद कर सकती है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया का स्वास्थ्य देखभाल प्रणाली पर क्या प्रभाव पड़ता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया से बेहतर तरीके से निपटने के लिए स्वास्थ्य देखभाल प्रणाली को कैसे मजबूत किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया को संबोधित करने के प्रयास व्यापक सामाजिक और आर्थिक असमानताओं को भी कैसे संबोधित कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया का मानसिक स्वास्थ्य पर क्या प्रभाव पड़ता है?",
    agent: "faq",
  },
  {
    text: "मानसिक स्वास्थ्य सहायता को थैलेसीमिया देखभाल में कैसे एकीकृत किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया से निपटने में सामुदायिक सहभागिता की क्या भूमिका है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया देखभाल और अनुसंधान को बेहतर बनाने के लिए प्रौद्योगिकी का लाभ कैसे उठाया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया का प्रजनन स्वास्थ्य पर क्या प्रभाव पड़ता है?",
    agent: "faq",
  },
  {
    text: "प्रजनन स्वास्थ्य सेवाओं को थैलेसीमिया देखभाल में कैसे एकीकृत किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया का लोगों की शिक्षा और करियर के अवसरों पर क्या प्रभाव पड़ता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया देखभाल में शिक्षा और कैरियर सहायता को कैसे एकीकृत किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया का लोगों के सामाजिक जीवन पर क्या प्रभाव पड़ता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया देखभाल में सामाजिक सहायता को कैसे एकीकृत किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया का लोगों की सांस्कृतिक मान्यताओं और प्रथाओं पर क्या प्रभाव पड़ता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया देखभाल में सांस्कृतिक संवेदनशीलता को कैसे एकीकृत किया जा सकता है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया देखभाल में वित्तीय सहायता को कैसे एकीकृत किया जा सकता है?",
    agent: "faq",
  },
  { text: "थैलेसीमिया से निपटने में सरकार की क्या भूमिका है?", agent: "faq" },
  {
    text: "थैलेसीमिया से निपटने के लिए सरकारी पहल के कुछ उदाहरण क्या हैं?",
    agent: "faq",
  },
  {
    text: "वकालत और नीतिगत प्रयास थैलेसीमिया देखभाल और अनुसंधान का समर्थन कैसे कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया से निपटने में गैर-सरकारी संगठनों (एनजीओ) की क्या भूमिका है?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया पर काम करने वाले गैर सरकारी संगठनों के कुछ उदाहरण क्या हैं?",
    agent: "faq",
  },
  {
    text: "सहयोग और साझेदारी थैलेसीमिया देखभाल और अनुसंधान का समर्थन कैसे कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया पर काम कर रहे सहयोग और साझेदारी के कुछ उदाहरण क्या हैं?",
    agent: "faq",
  },
  {
    text: "शिक्षा और जागरूकता अभियान थैलेसीमिया देखभाल और अनुसंधान का समर्थन कैसे कर सकते हैं?",
    agent: "faq",
  },
  {
    text: "थैलेसीमिया पर शिक्षा और जागरूकता अभियान के कुछ उदाहरण क्या हैं?",
    agent: "faq",
  },

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
  { text: "nice to meet you", agent: "greeting" },
  { text: "pleased to meet you", agent: "greeting" },

  //Bouncer related queries (random/irrelevant text)
  { text: "asdf", agent: "bouncer" },
  { text: "123", agent: "bouncer" },
  { text: "test", agent: "bouncer" },
  { text: "xyz", agent: "bouncer" },
  { text: "what is the weather like", agent: "bouncer" },
  { text: "tell me a joke", agent: "bouncer" },
  { text: "who won the match", agent: "bouncer" },
  { text: "how to bake a cake", agent: "bouncer" },
  { text: "what's the capital of France", agent: "bouncer" },
  { text: "sing me a song", agent: "bouncer" },
];
