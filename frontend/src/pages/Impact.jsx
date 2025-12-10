
import React from 'react';
import SectionIcon from '../components/SectionIcon';



const Impact = () => {
  return (
    <div style={{background:'#fff', color:'#222', fontFamily:'Inter, Arial, sans-serif'}}>
      <section className="section card" style={{background:'#f8fafc', borderRadius:'12px', margin:'2rem auto', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
        <SectionIcon icon="🌟" label="Impact & Benefits" />
        <SectionIcon icon="👴" label="Impact on Elderly Patients" />
        <p>
          Improved medication adherence leads to better health, fewer complications, and greater independence for elderly patients.
        </p>
        <SectionIcon icon="🧑‍⚕️" label="Impact on Caregivers" />
        <p>
          Reduced stress and uncertainty, with real-time updates and alerts for peace of mind.
        </p>
        <SectionIcon icon="👨‍⚕️" label="Benefits for Doctors" />
        <p>
          Actionable adherence data helps doctors make informed decisions and provide better care.
        </p>
        <SectionIcon icon="🏥" label="Social, Economic & Healthcare Impact" />
        <p>
          Med-Sync supports families, reduces healthcare costs, and improves outcomes at scale.
        </p>
        <SectionIcon icon="🔬" label="Research Potential" />
        <p>
          Data-driven insights open new avenues for research in medication adherence and elderly care.
        </p>
      </section>
    </div>
  );
};

export default Impact;
