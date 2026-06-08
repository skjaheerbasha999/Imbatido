
import React from 'react';
import SectionIcon from '../components/SectionIcon';



const Features = () => {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'Inter, Arial, sans-serif' }}>
      <section className="section card" style={{ background: 'var(--surface)', borderRadius: '12px', margin: '2rem auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <SectionIcon icon="🛡️" label="Features & Solution" />
        <SectionIcon icon="👩‍⚕️" label="Caregiver Medicine Setup" />
        <p>
          Caregivers can easily set up medication schedules for patients, customizing dose times and reminders.
        </p>
        <SectionIcon icon="⏰" label="Patient Reminder Flow" />
        <p>
          Patients receive timely reminders on their devices, ensuring they never miss a dose.
        </p>
        <SectionIcon icon="👍" label="One-Tap Confirmation" />
        <p>
          Patients confirm medication intake with a single tap, instantly notifying caregivers.
        </p>
        <SectionIcon icon="🔔" label="Automatic Caregiver Alerts" />
        <p>
          If a dose is missed or not confirmed, caregivers receive automatic alerts for quick intervention.
        </p>
        <SectionIcon icon="🔄" label="Smart Communication Loop" />
        <p>
          Real-time updates and feedback between patients and caregivers create a smart, supportive care loop.
        </p>
        <SectionIcon icon="🖼️" label="Screenshots / UI Flow (optional)" />
        <div style={{ background: 'var(--surface)', color: 'var(--primary)', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border)' }}>
          <em>UI flow and screenshots coming soon...</em>
        </div>
      </section>
    </div>
  );
};

export default Features;
