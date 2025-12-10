
import React from 'react';
import SectionIcon from '../components/SectionIcon';



const About = () => {
  return (
    <div style={{background:'#fff', color:'#222', fontFamily:'Inter, Arial, sans-serif'}}>
      <section className="section card" style={{background:'#f8fafc', borderRadius:'12px', margin:'2rem auto', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
        <SectionIcon icon="ℹ️" label="About Med-Sync" />
        <SectionIcon icon="💡" label="Why Med-Sync was created" />
        <p>
          Med-Sync was born out of a passion to solve the growing challenge of medication adherence among elderly patients, especially those with Alzheimer’s and related conditions.
        </p>
        <SectionIcon icon="❗" label="The Problem of Medication Adherence" />
        <p>
          Forgetting or missing doses can lead to serious health issues. Caregivers face stress and uncertainty, while patients risk complications and hospitalizations.
        </p>
        <SectionIcon icon="🎯" label="Mission & Vision" />
        <p>
          <strong>Mission:</strong> To empower families and caregivers with technology that ensures safe, timely medication for every patient.<br/>
          <strong>Vision:</strong> A world where no patient suffers due to missed medication.
        </p>
        <SectionIcon icon="🧠" label="Background: Alzheimer’s & Elderly Care Needs" />
        <p>
          Alzheimer’s and other age-related conditions make medication management complex. Med-Sync addresses these needs with a simple, effective solution for families and care teams.
        </p>
      </section>
    </div>
  );
};

export default About;
