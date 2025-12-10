import React from 'react';

const SectionIcon = ({ icon, label }) => (
  <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.5rem'}}>
    <span style={{fontSize:'1.5rem'}}>{icon}</span>
    <span style={{fontWeight:600,color:'#2563eb'}}>{label}</span>
  </div>
);

export default SectionIcon;
