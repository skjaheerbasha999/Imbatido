
import React from 'react';
import SectionIcon from '../components/SectionIcon';



const Technology = () => {
  return (
    <div style={{background:'#fff', color:'#222', fontFamily:'Inter, Arial, sans-serif'}}>
      <section className="section card" style={{background:'#f8fafc', borderRadius:'12px', margin:'2rem auto', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
        <SectionIcon icon="🛠️" label="Technology & Feasibility" />
        <SectionIcon icon="🔬" label="Technical Viability" />
        <p>
          Med-Sync leverages proven technologies like React Native/Flutter for cross-platform apps, Firebase for secure data storage, and FCM for real-time notifications.
        </p>
        <SectionIcon icon="⚙️" label="Operational Feasibility" />
        <p>
          Simple onboarding and intuitive UI make Med-Sync easy for caregivers and patients to adopt and use daily.
        </p>
        <SectionIcon icon="💸" label="Economic Feasibility" />
        <p>
          Affordable, scalable, and designed to reduce healthcare costs by improving medication adherence and reducing hospitalizations.
        </p>
        <SectionIcon icon="📈" label="Market Demand" />
        <p>
          The aging population and rise in chronic conditions create strong demand for smart medication management solutions.
        </p>
        <SectionIcon icon="🧑‍💻" label="Full Tech Stack" />
        <ul>
          <li>Frontend: React Native / Flutter</li>
          <li>Backend: Firebase</li>
          <li>Notifications: FCM (Firebase Cloud Messaging)</li>
          <li>Future Scope: AI analytics, device integration</li>
        </ul>
      </section>
    </div>
  );
};

export default Technology;
