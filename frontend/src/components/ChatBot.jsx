import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your Med-Sync health assistant. How can I help you navigate your dashboard or check your metrics today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Common questions and responses database
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
      response: "Diabetes is a condition where blood sugar levels are too high.\n\nTypes:\n🔴 Type 1: Pancreas doesn't make insulin (autoimmune)\n🟠 Type 2: Body can't use insulin properly (most common)\n\nSymptoms:\n• Increased thirst & urination\n• Fatigue, blurred vision\n\nManagement:\n💉 Insulin or oral medications\n🥗 Diet control & exercise\n⏰ Consistent medication schedule with Med-Sync!",
      keywords: ['diabetes', 'blood sugar', 'glucose', 'insulin'],
    },
    'what is heart disease': {
      response: "Heart Disease includes conditions affecting the heart and blood vessels.\n\nSymptoms:\n• Chest pain/discomfort\n• Shortness of breath\n\nManagement:\n💊 Statins, ACE inhibitors, Beta-blockers\n❤️ Heart-healthy diet & exercise\n⏰ Never miss medications!",
      keywords: ['heart', 'cardiac', 'cardiovascular', 'coronary'],
    },
    'what is arthritis': {
      response: "Arthritis is inflammation of one or more joints, causing pain and stiffness.\n\nManagement:\n💊 NSAIDs (Ibuprofen), DMARDs\n💪 Physical therapy & gentle exercise\n⏰ Regular medication prevents progression",
      keywords: ['arthritis', 'joint', 'inflammation', 'oa', 'ra'],
    },
    'what is stroke': {
      response: "Stroke occurs when blood flow to brain is blocked.\n\nWARNING SIGNS (FAST):\n😊 Face drooping on one side\n💪 Arm weakness or numbness\n🗣️ Speech difficulty, slurring\n⏰ Time to call 911 IMMEDIATELY!",
      keywords: ['stroke', 'cerebrovascular', 'tia', 'brain'],
    },
    'emergency first aid': {
      response: "Emergency First Aid CPR:\n1. Check responsiveness\n2. Call 911\n3. Start chest compressions: 100-120/min at center of chest\n4. Push hard and fast!\n\nFor bleeding: apply direct pressure with a clean cloth until help arrives.",
      keywords: ['emergency', 'first aid', 'cpr', 'bleeding', 'choking'],
    },
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // 1. Direct key matching (highest priority)
    for (const [key, data] of Object.entries(responseMap)) {
      if (lowerMessage.includes(key)) {
        return data.response;
      }
    }

    // 2. Keyword scoring (excluding stop words for scoring)
    const stopWords = ['what', 'is', 'how', 'do', 'you', 'have', 'i', 'it', 'for', 'about', 'can', 'in', 'to', 'your', 'my'];
    let bestMatchKey = null;
    let maxMatches = 0;

    for (const [key, data] of Object.entries(responseMap)) {
      // Direct keyword checks (including exact matches of any keyword)
      const directMatch = data.keywords.find(keyword => lowerMessage === keyword || (keyword.length > 3 && lowerMessage.includes(keyword)));
      if (directMatch) {
        return data.response;
      }

      const significantKeywords = data.keywords.filter(kw => !stopWords.includes(kw));
      const matches = significantKeywords.filter(keyword => lowerMessage.includes(keyword)).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatchKey = key;
      }
    }

    if (maxMatches > 0 && bestMatchKey) {
      return responseMap[bestMatchKey].response;
    }

    // Default response if no match found
    return "Welcome to Med-Sync Medical AI! 🏥\n\nI'm here to provide medical education & guidance like a healthcare professional.\n\n🚨 EMERGENCY CONDITIONS:\n• Myocardial Infarction (Heart Attack)\n• Stroke Recognition & Management\n• Sepsis & Septic Shock\n• Emergency First Aid & CPR\n\n⚕️ DIAGNOSTIC & CLINICAL:\n• Cancer Screening Guidelines\n• Antibiotic Resistance Issues\n• Blood Pressure Management\n• Medication Safety & Compliance\n\nWhat medical topic would you like to learn about?";
  };

  const handleSendMessage = async (e, customValue = '') => {
    if (e && e.preventDefault) e.preventDefault();
    const valueToSend = customValue || inputValue;
    if (!valueToSend.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: valueToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: valueToSend }),
      });

      if (!response.ok) {
        throw new Error('API response failed');
      }

      const data = await response.json();
      const replyText = data.reply;

      const botMessage = {
        id: messages.length + 2,
        text: replyText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.warn('✗ API Chat failed, falling back to local database search:', error);
      const responseText = findResponse(valueToSend);
      const botMessage = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: '❤️ Heart Attack', message: 'What is myocardial infarction?' },
    { label: '🧠 Stroke Warning', message: 'What is stroke recognition?' },
    { label: '🩺 CPR First Aid', message: 'What is emergency first aid?' },
    { label: '📱 App Features', message: 'What features do you have?' }
  ];

  return (
    <>
      {/* Chatbot Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-fab"
        title="Chat with our AI assistant"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header Banner */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-header-title">Med-Sync AI Assistant</span>
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span>Online</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)} title="Close Chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages Thread Area */}
          <div className="chat-thread">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`chat-bubble-container ${msg.sender === 'bot' ? 'ai' : 'user'}`}
              >
                <div className="chat-bubble">
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-bubble-container ai">
                <div className="chat-bubble loading-bubble">
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Panel */}
          {messages.length === 1 && (
            <div style={{ padding: '0.65rem 1.25rem', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleSendMessage(null, action.message);
                    }}
                    style={{
                      padding: '0.4rem 0.75rem',
                      fontSize: '0.76rem',
                      background: 'rgba(37, 99, 235, 0.08)',
                      border: '1px solid var(--border)',
                      color: 'var(--primary)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Action Bar */}
          <form onSubmit={handleSendMessage} className="chat-input-bar">
            <input
              type="text"
              id="chat-input-field"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything..."
              disabled={isLoading}
              className="chat-input-field"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="chat-send-btn"
              title="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
