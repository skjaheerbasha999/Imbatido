import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your Med-Sync assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Common questions and responses
  const responseMap = {
    'what is med-sync': {
      response: "Med-Sync is a smart medicine reminder app designed to help elderly patients and Alzheimer's patients take their medications on time. It also provides caregivers with real-time updates and peace of mind.",
      keywords: ['what', 'med-sync', 'is'],
    },
    'how does it work': {
      response: "Med-Sync works in 3 simple steps:\n1. Caregiver sets up medicines with doses and timing\n2. Patient receives smart reminders at the right time\n3. Caregiver gets instant alerts when medicine is taken\n\nNo more missed doses!",
      keywords: ['how', 'work', 'works'],
    },
    'who can use it': {
      response: "Med-Sync is designed for:\n• Elderly patients who need medication reminders\n• Alzheimer's patients with memory issues\n• Caregivers (family, friends, or professionals)\n• Healthcare providers monitoring adherence",
      keywords: ['who', 'can', 'use'],
    },
    'is it secure': {
      response: "Yes! We prioritize your security with:\n✓ End-to-end encryption\n✓ Password hashing\n✓ HIPAA-ready compliance\n✓ Secure data storage\nYour health data is safe with us.",
      keywords: ['secure', 'security', 'safe', 'privacy'],
    },
    'how much does it cost': {
      response: "Great question! Pricing details and plans are available on our Features page or Contact page. We offer affordable solutions for individuals and families.",
      keywords: ['cost', 'price', 'free', 'pricing'],
    },
    'how do i signup': {
      response: "Signing up is easy!\n1. Click the 'Get Started' or 'Sign Up' button\n2. Choose your role (Patient or Caregiver)\n3. Fill in your details\n4. Create a strong password\n5. Start using Med-Sync!\n\nWant to try now? Click 'Get Started' at the top!",
      keywords: ['signup', 'sign up', 'register', 'join'],
    },
    'what features do you have': {
      response: "Med-Sync includes:\n📱 Smart reminders at scheduled times\n🔔 Real-time caregiver notifications\n📊 Adherence tracking & statistics\n👨‍👩‍👧 Caregiver management\n📈 Health reports\n🔐 Secure data storage\n\nExplore our Features page for more!",
      keywords: ['features', 'what', 'do', 'you', 'have'],
    },
    'how do i contact support': {
      response: "We're here to help! You can:\n📧 Email: info@medsync.com\n📞 Phone: +1 234 567 890\n💬 Chat with us right here!\n📝 Use our Contact form\n\nWe typically respond within 24 hours.",
      keywords: ['contact', 'support', 'help', 'customer'],
    },
    'what about caregivers': {
      response: "Caregivers get powerful tools:\n✓ Real-time medication tracking\n✓ Instant alerts when doses are missed\n✓ Adherence reports\n✓ Multiple patient support\n✓ Notification preferences\n✓ Easy patient management\n\nMake caregiving easier!",
      keywords: ['caregiver', 'caregivers', 'monitor'],
    },
    'hello': {
      response: "Hey there! 👋 How can I assist you with Med-Sync today?",
      keywords: ['hello', 'hi', 'hey', 'greetings'],
    },
    'thank you': {
      response: "You're welcome! 😊 Feel free to ask if you have any more questions about Med-Sync.",
      keywords: ['thank', 'thanks', 'appreciate'],
    },
    'doctor integration': {
      response: "Med-Sync supports doctor collaboration:\n✓ Doctors can access patient adherence data\n✓ Real-time medication compliance reports\n✓ Prescription tracking and management\n✓ Patient health history integration\n✓ Secure communication with caregivers\n\nDoctors can monitor treatment effectiveness and adjust medications accordingly!",
      keywords: ['doctor', 'integration', 'physician', 'medical', 'professional'],
    },
    'medical compliance': {
      response: "Medical Compliance is crucial!\nMed-Sync ensures:\n✓ 100% adherence tracking\n✓ Compliance reports for healthcare providers\n✓ HIPAA-compliant data storage\n✓ Automated documentation\n✓ Reduced medication errors\n✓ Better health outcomes\n\nImprove patient compliance with intelligent reminders!",
      keywords: ['compliance', 'adherence', 'medical', 'healthcare'],
    },
    'what is medication adherence': {
      response: "Medication Adherence means taking medicines exactly as prescribed:\n• At the correct dose\n• At the right time\n• For the full duration\n\nWhy it matters:\n📊 80% of disease complications are due to non-adherence\n💊 Med-Sync helps achieve 95%+ adherence rates\n🏥 Reduces hospitalizations and healthcare costs\n\nLet's improve health outcomes together!",
      keywords: ['adherence', 'medication', 'prescription', 'compliance'],
    },
    'chronic disease management': {
      response: "Med-Sync is perfect for chronic disease management:\n✓ Diabetes - Insulin & oral medication reminders\n✓ Hypertension - Blood pressure medication tracking\n✓ Alzheimer's - Cognitive support with reminders\n✓ Arthritis - Pain management medication timing\n✓ Heart disease - Cardio medication adherence\n✓ Multiple conditions - Manage all medications in one place\n\nBetter disease management = Better quality of life!",
      keywords: ['chronic', 'disease', 'diabetes', 'hypertension', 'heart', 'arthritis'],
    },
    'emergency alerts': {
      response: "Med-Sync Emergency Alert Features:\n🚨 Missed dose alerts for caregivers\n📞 Quick caregiver notification system\n⏰ Multiple reminder attempts\n👨‍⚕️ Doctor notification option\n📊 Incident logging & reports\n🔴 Critical medication flags\n\nEnsure no important medication is missed!",
      keywords: ['emergency', 'alert', 'urgent', 'critical', 'notification'],
    },
    'elderly care': {
      response: "Med-Sync for Elderly Care:\n👴 Large, easy-to-read interface\n🔔 Simple one-tap confirmation\n📱 Voice reminder option\n🚨 Caregiver backup alerts\n🏥 Health history tracking\n💊 Multiple medication support\n❤️ Falls prevention through better health\n\nCaring for elderly loved ones made easier!",
      keywords: ['elderly', 'senior', 'aging', 'age'],
    },
    'alzheimers support': {
      response: "Med-Sync for Alzheimer's Patients:\n🧠 Memory-friendly reminders\n🎨 Large, clear visual cues\n🔊 Audio notifications\n🏠 Caregiver override capability\n📊 Cognitive decline tracking\n💪 Maintains dignity and independence\n\nSupporting both patients and caregivers through every stage!",
      keywords: ['alzheimer', 'dementia', 'memory', 'cognitive'],
    },
    'how to integrate with hospital': {
      response: "Hospital Integration Features:\n🏥 Electronic Health Records (EHR) compatibility\n📊 Seamless data exchange\n👨‍⚕️ Doctor/Nurse access permissions\n📋 Automated adherence reports\n🔐 HIPAA compliance ready\n📱 Multi-institution support\n\nContact our Enterprise team for hospital integration details!",
      keywords: ['hospital', 'integration', 'institution', 'clinic'],
    },
    'side effects tracking': {
      response: "Med-Sync Side Effects Monitoring:\n⚠️ Log medication side effects\n📊 Track patterns and severity\n📧 Auto-notify doctors\n🔔 Safety alerts system\n📋 Medical history correlation\n✅ Safety recommendations\n\nPatient safety is our top priority!",
      keywords: ['side', 'effects', 'adverse', 'reaction', 'safety'],
    },
    'drug interactions': {
      response: "Med-Sync Drug Interaction Checking:\n⚠️ Checks for harmful drug combinations\n💊 Multiple medication safety\n👨‍⚕️ Doctor approval workflow\n📋 Interaction database updates\n🚨 Critical interaction alerts\n✅ Safe medicine combinations\n\nEnsuring safe medication combinations for better health!",
      keywords: ['drug', 'interaction', 'combination', 'contraindication'],
    },
    'how doctors use med-sync': {
      response: "How Doctors Benefit from Med-Sync:\n📊 Real-time adherence data\n⏰ Medication compliance metrics\n🏥 Patient health tracking\n📈 Treatment effectiveness analysis\n🔔 Immediate non-compliance alerts\n📋 Digital prescription management\n💬 Direct patient/caregiver communication\n\nMake informed decisions with accurate adherence data!",
      keywords: ['doctor', 'physician', 'healthcare', 'provider', 'medical', 'professional'],
    },
    'what is hypertension': {
      response: "Hypertension (High Blood Pressure) is when blood pressure stays elevated at 130/80 mmHg or higher.\n\nSymptoms:\n• Often no symptoms (silent killer)\n• Headaches, dizziness, shortness of breath\n\nManagement:\n💊 ACE inhibitors, Beta-blockers, Diuretics\n🏃 Regular exercise & healthy diet\n🧂 Reduce sodium intake\n⏰ Take medications daily as prescribed\n\nRisk: Can lead to heart disease, stroke, kidney damage if untreated!",
      keywords: ['hypertension', 'high blood pressure', 'pressure', 'bp'],
    },
    'what is diabetes': {
      response: "Diabetes is a condition where blood sugar levels are too high.\n\nTypes:\n🔴 Type 1: Pancreas doesn't make insulin (autoimmune)\n🟠 Type 2: Body can't use insulin properly (most common)\n🟡 Gestational: During pregnancy\n\nSymptoms:\n• Increased thirst & urination\n• Fatigue, blurred vision\n• Slow wound healing\n\nManagement:\n💉 Insulin or oral medications\n🥗 Diet control & exercise\n📊 Regular blood sugar monitoring\n⏰ Consistent medication schedule with Med-Sync\n\nProper management prevents complications!",
      keywords: ['diabetes', 'blood sugar', 'glucose', 'insulin'],
    },
    'what is heart disease': {
      response: "Heart Disease includes conditions affecting the heart and blood vessels.\n\nTypes:\n🫀 Coronary Artery Disease - Narrowed arteries\n💓 Heart Failure - Heart can't pump efficiently\n🏥 Arrhythmia - Irregular heartbeat\n🩸 Valve Disease - Damaged heart valves\n\nSymptoms:\n• Chest pain/discomfort\n• Shortness of breath\n• Fatigue, dizziness\n\nManagement:\n💊 Statins, ACE inhibitors, Beta-blockers\n❤️ Heart-healthy diet (low sodium, low fat)\n🏃 Regular exercise & stress management\n⏰ Never miss medications!\n\nEarly detection and treatment are crucial!",
      keywords: ['heart', 'cardiac', 'cardiovascular', 'coronary'],
    },
    'what is arthritis': {
      response: "Arthritis is inflammation of one or more joints, causing pain and stiffness.\n\nTypes:\n🦴 Osteoarthritis - Wear and tear (most common)\n💥 Rheumatoid Arthritis - Autoimmune disease\n\nSymptoms:\n• Joint pain, swelling, stiffness\n• Reduced range of motion\n• Worse in morning or after activity\n\nManagement:\n💊 NSAIDs (Ibuprofen), DMARDs, Biologics\n🧊 Hot/cold therapy\n💪 Physical therapy & gentle exercise\n⏰ Regular medication helps prevent progression\n\nEarly treatment prevents joint damage!",
      keywords: ['arthritis', 'joint', 'inflammation', 'oa', 'ra'],
    },
    'what is cholesterol': {
      response: "Cholesterol is a waxy substance in blood. Too much causes plaque buildup.\n\nTypes:\n✅ HDL (Good) - Removes bad cholesterol\n❌ LDL (Bad) - Builds up in arteries\n\nRisks:\n🚨 LDL > 100 mg/dL is unhealthy\n🚨 Can lead to heart attack & stroke\n\nManagement:\n💊 Statins (Atorvastatin, Simvastatin)\n🥗 Low cholesterol diet\n🏃 Regular exercise\n🚭 Quit smoking\n⏰ Consistent medication with Med-Sync\n\nTarget: LDL < 100 mg/dL, HDL > 40 mg/dL",
      keywords: ['cholesterol', 'ldl', 'hdl', 'triglycerides'],
    },
    'what is thyroid disease': {
      response: "Thyroid Disease affects metabolism, energy, and weight control.\n\nTypes:\n🔴 Hypothyroidism - Underactive thyroid\n🟠 Hyperthyroidism - Overactive thyroid\n\nSymptoms:\n• Fatigue, weight changes\n• Hair loss, temperature sensitivity\n• Mood changes, brain fog\n\nManagement:\n💊 Levothyroxine (hypothyroidism)\n💊 PTU, Methimazole (hyperthyroidism)\n🩸 Regular TSH level monitoring\n⏰ Take medications consistently\n📋 Annual thyroid function tests\n\nProper medication keeps metabolism balanced!",
      keywords: ['thyroid', 'hypothyroidism', 'hyperthyroidism', 'tsh'],
    },
    'what is asthma': {
      response: "Asthma is a chronic lung disease with airway inflammation and narrowing.\n\nSymptoms:\n🫁 Shortness of breath, wheezing\n💨 Chest tightness, persistent cough\n😤 Difficulty with physical activity\n\nAsthma Triggers:\n🌍 Allergens (pollen, dust, pets)\n🏭 Air pollution, smoke\n❄️ Cold air, exercise\n😰 Stress, anxiety\n\nManagement:\n💊 Rescue inhalers (albuterol) - Quick relief\n💊 Maintenance inhalers (corticosteroids) - Prevention\n📋 Asthma action plan\n⏰ Take preventive meds even when feeling fine!\n\nProper control prevents asthma attacks!",
      keywords: ['asthma', 'breathing', 'inhaler', 'respiratory'],
    },
    'what is depression': {
      response: "Depression is a mental health condition affecting mood, thoughts, and daily functioning.\n\nSymptoms:\n😢 Persistent sadness, hopelessness\n😴 Sleep issues (insomnia or oversleeping)\n😔 Loss of interest in activities\n⚡ Fatigue, difficulty concentrating\n💭 Thoughts of worthlessness\n\nManagement:\n💊 SSRIs/SNRIs (Sertraline, Escitalopram)\n💭 Psychotherapy/Counseling\n🏃 Exercise, social connection\n😴 Sleep hygiene\n⏰ Consistent medication is crucial!\n🆘 Crisis helpline: 988 Suicide & Crisis Lifeline\n\nTreatment works - seek help today!",
      keywords: ['depression', 'mental health', 'mood', 'anxiety', 'psychiatric'],
    },
    'what is anxiety disorder': {
      response: "Anxiety Disorder is excessive worry and fear affecting daily life.\n\nTypes:\n😰 Generalized Anxiety Disorder (GAD)\n😱 Panic Disorder (sudden intense fear)\n🏘️ Social Anxiety, Agoraphobia\n\nSymptoms:\n💓 Racing heart, chest pain\n😰 Excessive worry, restlessness\n😴 Sleep problems, irritability\n😤 Difficulty concentrating\n\nManagement:\n💊 SSRIs, Benzodiazepines (short-term)\n🧘 Deep breathing, mindfulness\n💬 Cognitive Behavioral Therapy (CBT)\n🏃 Regular exercise\n⏰ Take medications consistently!\n\nAnxiety is treatable - don't suffer alone!",
      keywords: ['anxiety', 'panic', 'worry', 'fear', 'disorder'],
    },
    'what is copd': {
      response: "COPD (Chronic Obstructive Pulmonary Disease) makes breathing difficult.\n\nMain Types:\n🚬 Emphysema - Air sacs damaged\n🫁 Chronic Bronchitis - Constant cough\n\nSymptoms:\n😤 Shortness of breath, especially with activity\n🫁 Chronic cough with mucus\n⚡ Fatigue, wheezing\n\nMain Cause:\n🚬 Smoking (primary cause)\n💨 Long-term air pollution exposure\n\nManagement:\n💊 Bronchodilators (albuterol, tiotropium)\n💊 Corticosteroid inhalers\n🫁 Oxygen therapy if needed\n⏰ Never miss medications!\n🚭 Quit smoking - most important!\n\nEarly treatment slows disease progression!",
      keywords: ['copd', 'emphysema', 'chronic', 'bronchitis', 'lung'],
    },
    'what is osteoporosis': {
      response: "Osteoporosis is weakened bones with increased fracture risk.\n\nSymptoms:\n🦴 Often no symptoms until fracture\n📏 Loss of height, stooped posture\n😢 Back pain from collapsed vertebrae\n\nRisk Factors:\n👵 Postmenopausal women (low estrogen)\n👴 Advancing age\n🚭 Smoking, excessive alcohol\n😴 Low calcium/vitamin D\n\nManagement:\n💊 Bisphosphonates (Alendronate)\n💊 Calcium & Vitamin D supplements\n🏃 Weight-bearing exercise\n🥛 High-calcium diet\n⏰ Consistent medication prevents fractures!\n\nPrevent falls and fractures - take meds!",
      keywords: ['osteoporosis', 'bone', 'fracture', 'calcium'],
    },
    'what is kidney disease': {
      response: "Kidney Disease happens when kidneys lose function to filter waste.\n\nStages:\n🟢 Stage 1-2: Mild damage\n🟡 Stage 3: Moderate decline\n🔴 Stage 4-5: Severe decline\n\nSymptoms:\n😴 Fatigue, weakness\n💧 Swelling in feet/hands\n🤢 Nausea, loss of appetite\n😤 Shortness of breath\n\nCommon Causes:\n🩸 Diabetes, Hypertension\n\nManagement:\n💊 ACE inhibitors, diuretics\n🥗 Low sodium, protein control\n💧 Fluid restriction if needed\n🩸 Regular lab work (creatinine, GFR)\n⏰ Medication compliance crucial!\n\nEarly treatment slows progression!",
      keywords: ['kidney', 'renal', 'glomerulonephritis', 'ckd'],
    },
    'what is stroke': {
      response: "Stroke occurs when blood flow to brain is blocked.\n\nTypes:\n🩸 Ischemic (90%) - Blood clot blocks artery\n💥 Hemorrhagic - Blood vessel ruptures\n\nWARNING SIGNS (FAST):\n😊 Face drooping on one side\n💪 Arm weakness or numbness\n🗣️ Speech difficulty, slurring\n⏰ Time to call 911 IMMEDIATELY!\n\nOther symptoms:\n🤕 Sudden severe headache\n😵 Dizziness, loss of balance\n👁️ Vision changes\n\nPrevention:\n💊 Blood thinners (Aspirin, Warfarin)\n💊 Blood pressure, cholesterol medications\n🏃 Exercise, healthy diet\n🚭 No smoking, limit alcohol\n⏰ NEVER skip medications!\n\n🚨 CALL 911 AT FIRST SIGN!",
      keywords: ['stroke', 'cerebrovascular', 'tia', 'brain'],
    },
    'how to take medications safely': {
      response: "Safe Medication Practice:\n\n✅ DO:\n📋 Keep medication list updated\n🕐 Take at same time daily (use Med-Sync!)\n💧 Take with/without food as directed\n👨‍⚕️ Tell doctor about ALL medicines\n⏰ Set phone reminders\n💧 Stay hydrated unless told otherwise\n📝 Report side effects immediately\n\n❌ DON'T:\n🚫 Skip doses to save money\n🚫 Double dose if you forget\n🚫 Share medications with others\n🚫 Stop suddenly without doctor approval\n🚫 Mix with alcohol unless approved\n🚫 Take expired medications\n🚫 Mix different brands without checking\n\n💡 Med-Sync helps with reminders and tracking!\n\nWhen in doubt, ask your doctor or pharmacist!",
      keywords: ['medication', 'safety', 'how to take', 'prescription'],
    },
    'what are side effects': {
      response: "Side Effects are unintended reactions to medications.\n\nCommon Side Effects:\n😴 Drowsiness, dizziness\n🤢 Nausea, upset stomach\n🦵 Headaches\n😤 Dry mouth\n👁️ Blurred vision\n\nWhen to Contact Doctor:\n⚠️ Severe allergic reactions (rash, breathing difficulty)\n🚨 Chest pain, severe headache\n😵 Fainting, severe dizziness\n⚫ Black/bloody stools\n💔 Palpitations\n🤯 Confusion, hallucinations\n\nManagement:\n💬 Talk to doctor - don't stop meds!\n⏰ Usually improve within 1-2 weeks\n💊 Doctor may adjust dose or switch medicine\n📱 Use Med-Sync to track side effects\n\nImportant:\n• Side effects ≠ reason to stop medication\n• Report to doctor for safe alternatives\n• Many side effects are temporary!\n\nNever suffer silently - communicate with your doctor!",
      keywords: ['side', 'effects', 'reaction', 'adverse', 'symptoms'],
    },
    'how to manage chronic pain': {
      response: "Chronic Pain Management Strategies:\n\n💊 Medications:\n• NSAIDs (Ibuprofen, Naproxen)\n• Acetaminophen (Tylenol)\n• Muscle relaxants\n• Opioids (if necessary - use cautiously)\n• Antidepressants, Anti-seizure meds\n\n🧘 Non-Medication:\n• Physical therapy, stretching\n• Heat/cold therapy\n• Massage, acupuncture\n• Meditation, mindfulness\n• Exercise (low-impact)\n• Sleep management\n\n💭 Psychological:\n• Cognitive Behavioral Therapy (CBT)\n• Support groups\n• Stress reduction\n\n📋 Important:\n⏰ Take medications consistently\n📝 Keep pain diary\n👨‍⚕️ Work with pain specialist\n🔔 Med-Sync keeps you on schedule!\n\nPain management is personal - work with your team!",
      keywords: ['pain', 'chronic', 'management', 'relief'],
    },
    'what is the importance of vitamin d': {
      response: "Vitamin D is Essential for Health!\n\nFunctions:\n🦴 Strong bones (calcium absorption)\n💪 Muscle function\n🛡️ Immune system support\n❤️ Heart health\n🧠 Brain function\n\nDeficiency Symptoms:\n😴 Fatigue, weakness\n🦴 Bone/muscle pain\n😔 Depression, mood changes\n🤒 Frequent infections\n\nSources:\n☀️ Sunlight (15-30 min daily)\n🐟 Fatty fish (salmon, mackerel)\n🥛 Fortified milk, orange juice\n🥚 Egg yolks\n💊 Supplements (1000-4000 IU daily)\n\nRecommendations:\n👴 Elderly (over 70): 800-1000 IU daily\n🩸 Check vitamin D levels annually\n📋 Doctor prescribes if deficient\n⏰ Take consistently!\n\nVitamin D is critical - especially for elderly!",
      keywords: ['vitamin', 'vitamin d', 'deficiency', 'supplementation'],
    },
    'what is the importance of calcium': {
      response: "Calcium is Critical for Bone Health!\n\nFunctions:\n🦴 Build and maintain strong bones\n💓 Heart muscle function\n🧠 Nerve transmission\n💪 Muscle contraction\n🩸 Blood clotting\n\nDeficiency Risks:\n🦴 Osteoporosis, fractures\n💔 Heart problems\n🤐 Teeth and gum disease\n😰 Anxiety, depression\n\nBest Sources:\n🥛 Dairy: milk, yogurt, cheese\n🥬 Leafy greens: broccoli, spinach\n🐟 Fish with bones: sardines, salmon\n🥜 Fortified foods, nuts\n\nDaily Requirements:\n👴 Adults 51+: 1200 mg/day\n👵 Postmenopausal women: 1200 mg/day\n\nWith Vitamin D:\n☀️ Vitamin D helps absorb calcium\n💊 Take together for best effect\n⏰ Consistent intake crucial!\n\nCombination of calcium + vitamin D = Stronger bones!",
      keywords: ['calcium', 'bone health', 'supplement', 'mineral'],
    },
    'what is blood pressure management': {
      response: "Blood Pressure Management is Essential!\n\nTarget Ranges:\n✅ Normal: < 120/80 mmHg\n⚠️ Elevated: 120-129/<80 mmHg\n🔴 Stage 1 HTN: 130-139/80-89 mmHg\n🔴 Stage 2 HTN: ≥ 140/90 mmHg\n\nManagement Plan:\n💊 ACE inhibitors, Beta-blockers, Diuretics\n🏃 Regular exercise (150 min/week)\n🥗 DASH diet (low sodium, high potassium)\n⏸️ Stress reduction & sleep\n🚭 No smoking, limit alcohol\n⏰ Consistent medication!\n\nMonitoring:\n📊 Check at home regularly\n🩸 Doctor visit every 3-6 months\n📋 Keep blood pressure log\n🔔 Med-Sync reminds you daily!\n\nGoals:\n✅ Most: < 130/80 mmHg\n✅ Elderly: < 130/80 mmHg (unless intolerant)\n\nImportance:\n💔 Uncontrolled HTN → Heart disease, stroke\n🧠 Kidney damage, dementia risk\n\nYou can control it - stay consistent!",
      keywords: ['blood pressure', 'hypertension', 'management', 'monitor'],
    },
    'how to maintain healthy lifestyle': {
      response: "Healthy Lifestyle = Better Medicine Outcomes!\n\n🏃 Exercise:\n• 150 min moderate cardio/week\n• 2x strength training/week\n• Daily walking (at least 30 min)\n• Flexibility exercises (yoga)\n\n🥗 Nutrition:\n• Whole grains, fruits, vegetables\n• Lean proteins (fish, chicken)\n• Healthy fats (olive oil, nuts)\n• Limit sodium, sugar, processed foods\n• Stay hydrated (8 glasses water/day)\n\n😴 Sleep:\n• 7-9 hours nightly\n• Consistent bedtime\n• Dark, quiet bedroom\n• No screens 1 hour before bed\n\n🧠 Mental Health:\n• Stress management (meditation)\n• Social connections\n• Hobbies, activities\n• Professional help if needed\n\n⏰ Medication Adherence:\n💊 Take all meds as prescribed!\n📱 Use Med-Sync for reminders\n📋 Regular doctor checkups\n🩸 Lab work annually\n\n🚫 Avoid:\n• Smoking, excessive alcohol\n• Sedentary lifestyle\n• Processed foods\n• Stress overload\n\nBest Medicine: Prevention! Start today!",
      keywords: ['healthy', 'lifestyle', 'exercise', 'diet', 'wellness'],
    },
    'what is preventive healthcare': {
      response: "Preventive Healthcare = Stop Problems Before They Start!\n\n🩺 Regular Screenings:\n👴 Annual physical exam\n💉 Vaccinations (flu, pneumonia, shingles)\n🩸 Blood work (cholesterol, glucose, liver/kidney)\n🫀 Cardiovascular screening\n🔬 Cancer screenings (colonoscopy, mammogram)\n👀 Eye, hearing, dental checkups\n\n💊 Disease Prevention:\n🩸 Blood pressure monitoring\n📊 Diabetes screening\n💓 Heart disease risk assessment\n🧠 Cognitive screening (memory)\n\n🏃 Lifestyle Prevention:\n🥗 Healthy diet\n💪 Regular exercise\n😴 Adequate sleep\n🧘 Stress management\n🚭 No smoking\n\n📋 Track Your Health:\n📱 Med-Sync medication adherence\n🩸 Regular lab visits\n📊 Keep health records\n👨‍⚕️ Regular doctor visits\n\nAge-Specific:\n👴 Age 40+: Cholesterol, blood pressure\n👵 Age 50+: Cancer screenings\n👨 Age 65+: Flu, pneumonia, bone density\n\n💡 Early detection = Better outcomes!\n\nInvest in prevention now!",
      keywords: ['preventive', 'prevention', 'screening', 'checkup'],
    },
    'what is pneumonia': {
      response: "Pneumonia is a lung infection causing inflammation and fluid buildup.\n\n⚕️ CLINICAL ASSESSMENT:\nPneumonia severity depends on:\n• Type (bacterial, viral, fungal)\n• Patient age & immune status\n• Presence of comorbidities\n\nSymptoms:\n🤒 High fever (103-104°F)\n😤 Productive cough (yellow/green sputum)\n💨 Shortness of breath, chest pain\n⚡ Fatigue, chills, sweating\n🤢 Nausea, diarrhea (in some cases)\n\nRisk Factors:\n👴 Age >65 years\n🚬 Smoking history\n💊 Immunosuppression\n❤️ Heart/lung disease\n🍷 Alcohol abuse\n\nDiagnosis:\n🫁 Chest X-ray (consolidation)\n🧬 Sputum culture (identify organism)\n💉 Blood cultures (bacteremia)\n🩸 CBC with differential\n\nTreatment:\n💊 Antibiotics (based on culture results):\n  - Penicillin/Amoxicillin (pneumococcal)\n  - Fluoroquinolones (atypical)\n  - Macrolides (viral support)\n🏥 Hospitalization if severe (SpO2 <90%)\n💧 IV fluids, oxygen therapy\n🫁 Respiratory support if needed\n\n⚠️ Complications:\n🫀 Sepsis, septic shock\n💓 Empyema (fluid in pleural space)\n🫁 Respiratory failure\n🧠 Meningitis (rare)\n\nPrevention:\n💉 Pneumococcal vaccine (PCV13, PPSV23)\n🩹 Annual flu shot\n🚭 Quit smoking\n\n⏰ Prognosis:\n✅ 90-95% recovery with treatment\n⚠️ Higher mortality in elderly/immunocompromised\n\nSEEK IMMEDIATE CARE IF:\n😤 Severe shortness of breath\n💙 Cyanosis (bluish lips/nails)\n❤️ Chest pain with breathing\n🤕 Altered mental status",
      keywords: ['pneumonia', 'lung infection', 'chest', 'respiratory'],
    },
    'what is sepsis': {
      response: "Sepsis is a life-threatening systemic inflammatory response to infection.\n\n⚠️ MEDICAL EMERGENCY - CALL 911!\n\n⚕️ DEFINITION:\nSepsis = Infection + Dysregulated Host Response\n• Systemic inflammation from infection\n• Organ dysfunction\n• Life-threatening condition\n\nSeptic Shock:\n🩸 Sepsis + Hypotension (despite fluid resuscitation)\n💔 Lactate >2 mmol/L\n📉 Requires vasopressors\n⚠️ Mortality rate 30-40%\n\nSymptoms (SIRS Criteria):\n🤒 Fever >38.3°C or <36°C\n💓 Heart rate >90 bpm\n😤 Respiratory rate >20 or PaCO2 <32\n🩸 WBC >12,000 or <4,000\n\nCommon Sources:\n🫁 Pneumonia (most common)\n🚽 Urinary tract infection\n🤕 Surgical wound infection\n🩸 Bloodstream infection\n🫀 Endocarditis\n\nRisk Factors:\n👴 Age >65\n💊 Immunosuppression (HIV, chemotherapy)\n🏥 Recent hospitalization\n💉 Indwelling catheters\n🩹 Recent surgery\n🚬 Smoking\n\n⚕️ DIAGNOSTIC WORKUP:\n🩸 Blood cultures (before antibiotics!)\n🧬 CBC, CMP, coagulation studies\n🔬 Lactate level (prognostic)\n🫁 Imaging (CXR, CT based on suspected source)\n🩹 Urinalysis & urine culture\n\n🚨 IMMEDIATE MANAGEMENT (\"Golden Hour\"):\n1️⃣ Call 911 - ICU admission likely\n2️⃣ Oxygen to maintain SpO2 >90%\n3️⃣ IV access, fluid resuscitation (30 mL/kg)\n4️⃣ Broad-spectrum antibiotics ASAP\n5️⃣ Vasopressors if hypotensive\n6️⃣ Source control (drain, remove catheter)\n\n💊 Antibiotic Strategy:\nInitial broad spectrum:\n• 3rd generation cephalosporin +/- aminoglycoside\n• Or: Piperacillin-tazobactam\nThen tailor to culture results\n\n💔 Complications:\n• Acute kidney injury (AKI)\n• Disseminated intravascular coagulation (DIC)\n• Multi-organ failure\n• Septic shock\n• Death\n\n⏰ PROGNOSIS:\n📊 Survival depends on:\n• Age & comorbidities\n• Time to antibiotics (<1 hour critical)\n• Organ failures at presentation\n• Appropriate source control\n\n🚨 RED FLAGS:\n🩸 Confusion, altered mental status\n💙 Cold extremities, mottled skin\n😴 Difficulty breathing\n⚪ Skin rash/petechiae\n\n⚠️ THIS IS A MEDICAL EMERGENCY\nDO NOT DELAY - SEEK IMMEDIATE CARE!",
      keywords: ['sepsis', 'septic shock', 'infection', 'emergency'],
    },
    'myocardial infarction': {
      response: "Myocardial Infarction (Heart Attack) - Medical Emergency!\n\n🚨 CALL 911 IMMEDIATELY!\n\n⚕️ DEFINITION:\nMI = Death of heart muscle due to coronary artery occlusion\n\nTypes:\n🔴 STEMI (ST-Elevation): Transmural infarction\n🟠 NSTEMI: Subendocardial infarction\n\nRisk Factors:\n🚬 Smoking (risk ↑ 4x)\n🩸 Hypertension\n📊 Diabetes\n❤️ Family history of early MI\n🏃 Sedentary lifestyle\n📈 High cholesterol\n⚖️ Obesity\n😰 Chronic stress\n\nClassic Symptoms:\n💔 Severe crushing chest pain\n😤 Dyspnea (shortness of breath)\n😰 Anxiety, sense of doom\n💧 Diaphoresis (profuse sweating)\n🤢 Nausea/vomiting\n💓 Palpitations\n😵 Dizziness\n\n⚠️ ATYPICAL PRESENTATION:\n👵 Elderly: May have minimal symptoms\n👩 Women: Often atypical presentation\n🩸 Diabetics: Silent infarction possible\n\nPATHOPHYSIOLOGY:\n1. Coronary artery plaque rupture\n2. Thrombosis (clot formation)\n3. Complete vessel occlusion\n4. Myocardial ischemia\n5. Necrosis begins in minutes\n6. Irreversible damage after 4-6 hours\n\n⚕️ DIAGNOSTIC TESTS:\n📊 12-Lead ECG (within 10 minutes)\n  • ST elevation = STEMI\n  • T-wave changes, Q waves\n💉 Cardiac troponins (Tn I, Tn T)\n  • Gold standard marker\n  • Elevation 3-4 hours post-MI\n🧬 CK-MB (isoenzyme)\n🫀 Echocardiography\n🔬 Chest X-ray\n💉 Complete metabolic panel\n\n🚑 EMERGENCY MANAGEMENT:\n1️⃣ STEMI: Primary PCI (angioplasty) <120 min\n   OR Thrombolysis <30 min\n2️⃣ NSTEMI: Dual antiplatelet therapy + anticoagulation\n3️⃣ Oxygen (if SpO2 <90%)\n4️⃣ Aspirin 325 mg (chewed)\n5️⃣ Nitroglycerin SL for chest pain\n6️⃣ Morphine for severe pain\n7️⃣ Beta-blockers (if stable)\n8️⃣ ACE inhibitors\n\n💊 MEDICATIONS (Post-MI):\n🫀 Dual antiplatelet:\n  • Aspirin 81 mg daily (lifelong)\n  • P2Y12 inhibitor (clopidogrel/ticagrelor) 12mo\n💊 Beta-blockers (metoprolol, carvedilol)\n💊 ACE inhibitors/ARBs\n💊 Statins (high-intensity)\n💊 Nitrates PRN\n\n⚠️ COMPLICATIONS:\n💔 Cardiogenic shock\n💓 Arrhythmias (VF, bradycardia)\n💧 Acute pulmonary edema\n🫀 Ventricular rupture\n🔄 Free wall rupture → tamponade\n📉 Papillary muscle rupture → MR\n\n🏥 REHABILITATION:\nPhase 1 (0-48h): ICU monitoring\nPhase 2 (2-6 weeks): Supervised exercise\nPhase 3 (6+ weeks): Maintenance program\n\n⏰ PROGNOSIS:\n📊 Hospital mortality: 5-10% (lower with PCI)\n❤️ 5-year survival: 85-90%\nFactors affecting outcome:\n• Time to reperfusion\n• Infarct size\n• Ejection fraction\n• Comorbidities\n\n🚨 SEEK IMMEDIATE MEDICAL CARE!\nMinutes matter in heart attack!",
      keywords: ['myocardial infarction', 'heart attack', 'mi', 'cardiac', 'chest pain'],
    },
    'stroke recognition': {
      response: "Stroke - Medical Emergency! CALL 911!\n\n⚠️ REMEMBER: F.A.S.T.\nF = Face drooping\nA = Arm weakness\nS = Speech difficulty\nT = Time to call 911\n\n⚕️ STROKE TYPES:\n\n🩸 ISCHEMIC (85-90%):\n• Thrombotic: Clot forms in brain vessel\n• Embolic: Clot travels from heart/arteries\n• Lacunar: Small vessel disease\nTreatment: tPA (thrombolytic) within 4.5 hours!\n\n💥 HEMORRHAGIC (10-15%):\n• Intracerebral: Bleeding in brain\n• Subarachnoid: Bleeding in subarachnoid space\nTreatment: Surgical intervention, hemostasis\n\n⚠️ TIA (Transient Ischemic Attack):\n• Mini-stroke, symptoms resolve <24h\n• Warning sign of future stroke\n• Still requires emergency evaluation!\n\nSYMPTOMS (Sudden Onset):\n😵 Facial drooping on one side\n💪 Arm/leg weakness (unilateral)\n🗣️ Speech difficulty or slurring\n👁️ Vision loss (1 eye)\n🤕 Severe headache\n😴 Loss of consciousness\n😵 Vertigo, loss of balance\n🚶 Difficulty walking\n\nRISK FACTORS:\n🩸 Hypertension (most important!)\n❤️ Atrial fibrillation\n📊 Diabetes\n📈 High cholesterol\n🚬 Smoking\n👴 Age >55\n♂️ Male gender\n😰 Stress\n🏃 Sedentary lifestyle\n💊 Oral contraceptives\n\n⚕️ DIAGNOSTIC WORKUP:\n🧠 CT Head (rule out hemorrhage) - STAT\n🫀 ECG (check for afib)\n🩸 Labs: PT, PTT, INR, CBC, glucose\n🫀 Echocardiogram (cardiac source)\n🔬 Carotid ultrasound/MRA\n🧠 MRI (ischemic stroke)\n\n🚑 EMERGENCY MANAGEMENT:\n\nIschemic Stroke <4.5 hours:\n1️⃣ IV tPA (alteplase) 0.9 mg/kg\n   • 10% bolus, rest over 60 min\n   • Door-to-needle <60 min goal\n\n2️⃣ Mechanical thrombectomy\n   • <24 hours from onset\n   • Large vessel occlusion\n   • Catheter-based clot removal\n\n3️⃣ Supportive care:\n   • Oxygen if SpO2 <90%\n   • IV fluids (maintain euvolemia)\n   • Head of bed 30°\n   • Temperature control\n   • Monitor glucose (target 80-180)\n   • NPO initially (aspiration risk)\n\nHemorrhagic Stroke:\n1️⃣ BP management (SBP goal 130-140)\n2️⃣ Reverse anticoagulation if on warfarin\n3️⃣ Surgery if ICH >30 mL or herniation risk\n4️⃣ ICP monitoring if needed\n\n💊 POST-STROKE MEDICATIONS:\n🩸 Antiplatelet agents:\n   • Aspirin 325 mg daily\n   • Clopidogrel (if aspirin allergy)\n💊 Statins (high-dose)\n💊 Antihypertensives\n💊 Antidiabetic agents\n\n🧠 REHABILITATION:\n🏥 Stroke unit admission\n🧘 Physical/occupational therapy\n💬 Speech therapy (if aphasia)\n😰 Psychological support\n\n⏰ TIME IS BRAIN!\n• Every minute = 1.9 million neurons lost\n• Treatment window for tPA: 4.5 hours\n• Mechanical thrombectomy: Up to 24 hours\n\n🚨 CALL 911 IMMEDIATELY!\nDON'T WAIT - STROKE IS A MEDICAL EMERGENCY!",
      keywords: ['stroke', 'cerebrovascular', 'brain', 'neurological', 'tia'],
    },
    'cancer screening': {
      response: "Cancer Screening - Early Detection Saves Lives!\n\n⚕️ SCREENING GUIDELINES:\n\n🫀 COLORECTAL CANCER:\nAge: Start at 45 (or 50 if average risk)\nMethods:\n• Colonoscopy every 10 years\n• Fecal occult blood test (FOBT) annually\n• Flexible sigmoidoscopy every 5 years\nRisk Factors:\n• Family history\n• Inflammatory bowel disease\n• Obesity, smoking, alcohol\n\n👩 BREAST CANCER:\nAge: 40s (discuss risks/benefits)\n       50-74 (routine screening)\nMethods:\n• Mammography annually or biannually\n• Clinical breast exam\n• MRI (high-risk patients)\nRisk Factors:\n• Age, family history\n• BRCA1/BRCA2 mutations\n• Estrogen exposure\n• Obesity, alcohol\n\n🫁 LUNG CANCER:\nAge: 50-80 with smoking history\nMethod: Low-dose CT scan annually\nEligibility:\n• ≥30 pack-year smoking history\n• Current or former smoker\nBenefit: 20% mortality reduction\n\n🔍 PROSTATE CANCER:\nAge: 50+ (or 40+ if high-risk)\nMethods:\n• PSA blood test\n• Digital rectal exam\nNote: Discuss pros/cons (false positives)\n\n🩸 CERVICAL CANCER:\nAge: 21-65\nMethods:\n• Pap smear every 3 years\n• HPV testing every 5 years\n• Co-testing (Pap + HPV) every 5 years\nVaccination: HPV vaccine <45\n\n🩹 SKIN CANCER:\nAge: 20+ (especially fair skin)\nMethod: Annual skin examination\nSelf-exam: ABCDE\n• Asymmetry\n• Border irregularity\n• Color variation\n• Diameter >6mm\n• Evolution (changes)\n\n⚕️ CANCER RISK REDUCTION:\n🚭 Smoking: Avoid (quit if current)\n🍷 Alcohol: Limit to moderate\n🥗 Diet: Fruits, vegetables, fiber\n⚖️ Weight: Maintain healthy BMI\n🏃 Exercise: 150 min moderate weekly\n☀️ Sun: Use SPF 30+, avoid peak hours\n💉 Vaccinations: HPV vaccine, HBV\n\n⚠️ WARNING SIGNS:\n🔴 Unexplained weight loss\n🔴 Persistent fatigue\n🔴 Abnormal bleeding\n🔴 Persistent pain\n🔴 Skin changes\n🔴 Difficulty swallowing\n🔴 Chronic cough\n\n🧬 GENETIC TESTING:\nConsider if:\n• Multiple family members with cancer\n• Early-onset cancer (<50)\n• BRCA1/BRCA2 mutations\n• Lynch syndrome\n\n💡 KEY PRINCIPLE:\nEarly detection = Better outcomes!\nTalk to your doctor about your risk!",
      keywords: ['cancer', 'screening', 'tumor', 'malignancy', 'oncology'],
    },
    'antibiotic resistance': {
      response: "Antibiotic Resistance - A Growing Medical Crisis!\n\n⚠️ DEFINITION:\nAntimicrobial resistance (AMR) = Bacteria survive antibiotics\n• Bacteria develop defense mechanisms\n• Genes spread between bacteria\n• Treatment options decrease\n• Infections become harder to treat\n\n⚕️ HOW RESISTANCE DEVELOPS:\n1️⃣ Natural selection:\n   • Antibiotic kills susceptible bacteria\n   • Resistant bacteria survive\n   • Resistant strain becomes dominant\n\n2️⃣ Genetic mechanisms:\n   • Enzymatic inactivation (beta-lactamase)\n   • Target modification (altered binding)\n   • Efflux pumps (expel drug)\n   • Reduced permeability\n\n🦠 COMMON RESISTANT ORGANISMS:\n• MRSA (Methicillin-resistant S. aureus)\n• VRE (Vancomycin-resistant Enterococcus)\n• ESBL (Extended-spectrum beta-lactamase)\n• Pseudomonas aeruginosa (MDR)\n• Clostridium difficile\n• Candida auris\n\n⚠️ SOURCES OF RESISTANCE:\n🏥 Healthcare settings:\n   • Overuse of antibiotics\n   • Poor infection control\n   • Immunocompromised patients\n\n🌾 Agricultural use (60% of antibiotics):\n   • Growth promotion in livestock\n   • Disease prevention in animals\n   • Spreads through food chain\n\n🤦 Patient behaviors:\n   • Not completing courses\n   • Sharing medications\n   • Demanding antibiotics\n   • Poor hygiene\n\n💊 PREVENTING RESISTANCE:\n\nHealthcare:\n✅ Antibiotic stewardship programs\n✅ Culture-directed therapy\n✅ Shorter treatment courses\n✅ Infection prevention measures\n✅ Vaccination programs\n✅ Diagnostic testing (rapid ID)\n\nPatient:\n✅ Complete full course (even if better)\n✅ Don't save antibiotics\n✅ Don't share medications\n✅ Only take when prescribed\n✅ Good hygiene (hand washing)\n✅ Proper food handling\n✅ Don't demand antibiotics for viral illness\n\n⚕️ CLINICAL IMPLICATIONS:\n🔴 Treatment failures increasing\n🔴 Need for broader-spectrum drugs\n🔴 Increased hospital stays\n🔴 Higher mortality rates\n🔴 Increased healthcare costs\n\n📊 GLOBAL IMPACT:\n• 1.3 million deaths annually (WHO)\n• Could become leading cause of death\n• Economic burden: $100+ billion yearly\n• Affects surgery, cancer therapy, transplants\n\n🔬 SOLUTIONS:\n💡 New antibiotic development\n💡 Phage therapy research\n💡 Immunotherapy approaches\n💡 Rapid diagnostics\n💡 Infection prevention\n💡 Public awareness\n\n🎯 WHAT YOU CAN DO:\n1️⃣ Only use prescribed antibiotics\n2️⃣ Complete full course\n3️⃣ Maintain good hygiene\n4️⃣ Support vaccination programs\n5️⃣ Advocate for stewardship\n6️⃣ Educate others\n\n⚠️ THIS IS A PUBLIC HEALTH EMERGENCY!\nWe must all work together to prevent resistance!",
      keywords: ['antibiotic', 'resistance', 'mrsa', 'infection', 'bacteria'],
    },
    'emergency first aid': {
      response: "Emergency First Aid - Life-Saving Interventions!\n\n🚨 CALL 911 FOR:\n• Chest pain/pressure\n• Severe allergic reaction\n• Severe bleeding\n• Difficulty breathing\n• Unconsciousness\n• Poisoning/overdose\n• Severe injury\n\n💓 CPR (Cardiopulmonary Resuscitation):\n1️⃣ Check responsiveness\n2️⃣ Call 911\n3️⃣ Position supine on firm surface\n4️⃣ Open airway (head tilt, chin lift)\n5️⃣ Hand placement: Center of chest\n6️⃣ Compression rate: 100-120/min\n7️⃣ Depth: 2-2.4 inches (5-6 cm)\n8️⃣ Ratio: 30 compressions : 2 breaths\n9️⃣ Continue until:\n   • EMS arrives\n   • AED applied\n   • Person revives\n   • Exhaustion (cannot continue)\n\nKey: Push hard and fast!\n\n🫀 AED (Automated External Defibrillator):\n1️⃣ Turn on AED\n2️⃣ Apply pads to bare chest\n3️⃣ Clear area\n4️⃣ Press shock button if advised\n5️⃣ Resume CPR immediately\n6️⃣ Continue until EMS arrives\n\n🩸 SEVERE BLEEDING:\n1️⃣ Safety: Wear gloves\n2️⃣ Apply direct pressure with cloth\n3️⃣ Maintain pressure 10-15 minutes\n4️⃣ If soaks through, don't remove\n5️⃣ Add more cloths on top\n6️⃣ Elevate limb if possible\n7️⃣ Apply tourniquet if:\n   • Life-threatening bleeding\n   • Limb wound above knee/elbow\n   • 2 inches above wound\n   • Mark time on tourniquet\n8️⃣ Call 911\n\n🧠 CHOKING (Heimlich Maneuver):\n1️⃣ Ask \"Are you choking?\"\n2️⃣ If can't speak/cough: Act!\n3️⃣ Stand behind person\n4️⃣ Fist above navel, below ribs\n5️⃣ Quick upward thrusts\n6️⃣ Repeat until object dislodges\n7️⃣ If unconscious: CPR\n\n⚡ SHOCK:\nSigns:\n• Pale, clammy skin\n• Weak pulse\n• Rapid breathing\n• Confusion\n\nManagement:\n1️⃣ Lay flat\n2️⃣ Elevate legs 12 inches\n3️⃣ Keep warm (blanket)\n4️⃣ Monitor breathing/pulse\n5️⃣ Call 911\n6️⃣ Don't give food/water\n\n🔥 SEVERE BURNS:\n1️⃣ Remove from heat source\n2️⃣ Cool with water 10-20 min\n3️⃣ Remove tight clothing\n4️⃣ Cover with clean cloth\n5️⃣ DO NOT apply ice\n6️⃣ Call 911 if:\n   • Larger than 3 inches\n   • On face, hands, joints\n   • Full thickness burn\n\n☠️ POISONING:\n1️⃣ Call Poison Control: 1-800-222-1222\n2️⃣ Have container available\n3️⃣ Don't induce vomiting\n4️⃣ Save poison container/sample\n5️⃣ Follow Poison Control advice\n\n⚠️ ALLERGIC REACTION:\nMild:\n• Antihistamine (Benadryl)\n• Monitor closely\n\nSevere (Anaphylaxis):\n1️⃣ Call 911 IMMEDIATELY\n2️⃣ Inject EpiPen if available\n3️⃣ Repeat after 5-15 min if needed\n4️⃣ Lay flat, elevate legs\n5️⃣ Stay with person\n6️⃣ Go to hospital (even if better)\n\n⚠️ IMPORTANT:\n• Training matters: Take CPR/first aid class\n• Call 911 when in doubt\n• Follow instructions from dispatcher\n• Document what happened\n• Stay with victim until help arrives\n\nBe prepared. Be confident. Save lives!",
      keywords: ['emergency', 'first aid', 'cpr', 'bleeding', 'choking', 'resuscitation'],
    },
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Check for exact or partial matches
    for (const [key, data] of Object.entries(responseMap)) {
      const keywordMatches = data.keywords.filter(keyword =>
        lowerMessage.includes(keyword)
      );
      if (keywordMatches.length > 0) {
        return data.response;
      }
    }
    // Default response if no match found
    return "Welcome to Med-Sync Medical AI! 🏥\n\nI'm here to provide medical education & guidance like a healthcare professional.\n\n🚨 EMERGENCY CONDITIONS:\n• Myocardial Infarction (Heart Attack)\n• Stroke Recognition & Management\n• Sepsis & Septic Shock\n• Severe Infections (Pneumonia)\n• Anaphylaxis & Allergic Reactions\n• Emergency First Aid & CPR\n\n⚕️ DIAGNOSTIC & CLINICAL:\n• Cancer Screening Guidelines\n• Antibiotic Resistance Issues\n• Blood Pressure Management\n• Medication Safety & Compliance\n• Drug Interactions\n\n💊 CHRONIC DISEASES:\n• Diabetes, Hypertension\n• Heart Disease, COPD\n• Arthritis, Osteoporosis\n• Kidney Disease, Thyroid\n• Depression, Anxiety\n• Asthma, Respiratory Conditions\n\n🏥 PREVENTIVE CARE:\n• Annual Health Screenings\n• Vaccination Guidelines\n• Healthy Lifestyle Recommendations\n• Nutrition & Exercise\n• Stress Management\n\n📱 MED-SYNC FEATURES:\n• Medication Reminders & Adherence\n• Doctor Integration\n• Caregiver Alerts\n• Health Tracking\n\n⚠️ DISCLAIMER:\nThis is EDUCATIONAL information only.\n🚨 FOR EMERGENCIES: CALL 911 IMMEDIATELY\n👨‍⚕️ ALWAYS consult a real doctor for medical decisions.\nDo NOT delay professional care based on this information.\n\nWhat medical topic would you like to learn about?";
    
    
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const response = findResponse(inputValue);
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const quickActions = [
    { label: '❤️ Heart Attack', message: 'What is myocardial infarction?' },
    { label: '🧠 Stroke Warning', message: 'What is stroke recognition?' },
    { label: '🩺 Pneumonia Info', message: 'What is pneumonia?' },
    { label: '⚠️ Sepsis Alert', message: 'What is sepsis?' },
    { label: '🔬 Cancer Screening', message: 'What is cancer screening?' },
    { label: '🚨 First Aid', message: 'What is emergency first aid?' },
  ];

  return (
    <>
      {/* Chatbot Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563eb 0%, #22c55e 100%)',
          color: '#fff',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 999,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
        }}
        title="Chat with our AI assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '7rem',
            right: '2rem',
            width: '400px',
            maxWidth: '90vw',
            height: '600px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            animation: 'slideUp 0.3s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              color: '#fff',
              padding: '1.5rem',
              borderRadius: '12px 12px 0 0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>
              👨‍⚕️ Medical Professional AI
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
              Doctor-Level Medical Guidance & Education
            </p>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              background: '#f8fafc',
            }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '0.8rem 1rem',
                    borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    background: msg.sender === 'user' ? '#2563eb' : '#e0e7ff',
                    color: msg.sender === 'user' ? '#fff' : '#222',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '12px 12px 12px 0',
                    background: '#e0e7ff',
                    color: '#222',
                    display: 'flex',
                    gap: '0.4rem',
                  }}
                >
                  <span style={{ animation: 'bounce 1s infinite' }}>●</span>
                  <span style={{ animation: 'bounce 1s infinite 0.2s' }}>●</span>
                  <span style={{ animation: 'bounce 1s infinite 0.4s' }}>●</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (show if only initial message) */}
          {messages.length === 1 && (
            <div style={{ padding: '0.5rem', borderTop: '1px solid #e5e7eb', background: '#fff' }}>
              <p style={{ margin: '0.5rem 0 0.3rem 0', fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>
                Quick Questions:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputValue(action.message);
                      handleSendMessage({ preventDefault: () => {} });
                    }}
                    style={{
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.75rem',
                      background: '#f0f9ff',
                      border: '1px solid #bfdbfe',
                      color: '#0369a1',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#bfdbfe';
                      e.currentTarget.style.color = '#003d82';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#f0f9ff';
                      e.currentTarget.style.color = '#0369a1';
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '1rem',
              borderTop: '1px solid #e5e7eb',
              background: '#fff',
              borderRadius: '0 0 12px 12px',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.6rem 0.8rem',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: '0.6rem 1rem',
                background: isLoading ? '#94a3b8' : '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => !isLoading && (e.currentTarget.style.background = '#1e40af')}
              onMouseOut={(e) => !isLoading && (e.currentTarget.style.background = '#2563eb')}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
