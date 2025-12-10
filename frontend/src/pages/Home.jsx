import React, { useEffect, useState } from 'react';
import SectionIcon from '../components/SectionIcon';
import ChatBot from '../components/ChatBot';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{background:'#fff', color:'#222', fontFamily:'Inter, Arial, sans-serif'}}>
      {/* Hero Section with Gradient Background */}
      <section 
        className="hero" 
        style={{
          background:'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #22c55e 100%)',
          textAlign:'center',
          padding:'8rem 1rem 6rem 1rem',
          position:'relative',
          overflow:'hidden',
          minHeight:'600px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <div style={{position:'absolute', top:'0', right:'-100px', width:'300px', height:'300px', background:'rgba(255,255,255,0.05)', borderRadius:'50%', zIndex:0}}></div>
        <div style={{position:'absolute', bottom:'-50px', left:'-150px', width:'400px', height:'400px', background:'rgba(255,255,255,0.03)', borderRadius:'50%', zIndex:0}}></div>
        
        <div style={{position:'relative', zIndex:1, maxWidth:'800px'}}>
          <div style={{fontSize:'4rem', marginBottom:'1.5rem', animation:'bounce 3s infinite'}}>💊</div>
          <h1 style={{fontSize:'3.5rem', fontWeight:800, color:'#fff', margin:'0 0 1.5rem 0', textShadow:'0 2px 10px rgba(0,0,0,0.2)', lineHeight:1.2}}>
            Med-Sync
          </h1>
          <h2 style={{fontSize:'1.8rem', color:'#e0e7ff', margin:'0 0 1.5rem 0', fontWeight:400}}>
            Smart Medicine Reminder
          </h2>
          <p style={{fontSize:'1.2rem', color:'#e0e7ff', margin:'0 0 2.5rem 0', maxWidth:'700px', lineHeight:1.8}}>
            Ensuring patients never miss their medicines. Giving caregivers peace of mind. Improving health outcomes worldwide.
          </p>
          <div style={{display:'flex', justifyContent:'center', gap:'1.5rem', flexWrap:'wrap'}}>
            <a 
              href="#problem" 
              style={{
                background:'#fff', 
                color:'#2563eb', 
                padding:'1rem 2.5rem', 
                borderRadius:'8px', 
                fontWeight:700, 
                textDecoration:'none',
                fontSize:'1rem',
                transition:'all 0.3s ease',
                boxShadow:'0 4px 15px rgba(0,0,0,0.2)',
                cursor:'pointer',
                border:'none',
                display:'inline-block'
              }}
              onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'}}
              onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'}}
            >
              Learn More
            </a>
            <a 
              href="/contact" 
              style={{
                background:'transparent', 
                color:'#fff', 
                padding:'1rem 2.5rem', 
                borderRadius:'8px', 
                fontWeight:700, 
                textDecoration:'none',
                fontSize:'1rem',
                border:'2px solid #fff',
                transition:'all 0.3s ease',
                cursor:'pointer',
                display:'inline-block'
              }}
              onMouseOver={(e) => {e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#2563eb'}}
              onMouseOut={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'}}
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Key Features Overview */}
      <section style={{padding:'4rem 1rem', background:'#f8fafc', marginBottom:'3rem'}}>
        <h2 style={{textAlign:'center', fontSize:'2.5rem', fontWeight:700, color:'#2563eb', marginBottom:'3rem'}}>Why Med-Sync?</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'2rem', maxWidth:'1200px', margin:'0 auto'}}>
          <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', textAlign:'center', transition:'all 0.3s ease'}}
            onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(37,99,235,0.15)'}}
            onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}}
          >
            <div style={{fontSize:'2.5rem', marginBottom:'1rem'}}>🎯</div>
            <h3 style={{color:'#2563eb', fontSize:'1.3rem', marginBottom:'0.5rem'}}>Simple & Intuitive</h3>
            <p style={{color:'#555', lineHeight:1.6}}>Easy-to-use interface designed for elderly patients and their caregivers</p>
          </div>
          <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', textAlign:'center', transition:'all 0.3s ease'}}
            onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(34,197,94,0.15)'}}
            onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}}
          >
            <div style={{fontSize:'2.5rem', marginBottom:'1rem'}}>🔔</div>
            <h3 style={{color:'#2563eb', fontSize:'1.3rem', marginBottom:'0.5rem'}}>Smart Reminders</h3>
            <p style={{color:'#555', lineHeight:1.6}}>Customizable notifications at the right time, every time</p>
          </div>
          <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', textAlign:'center', transition:'all 0.3s ease'}}
            onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(37,99,235,0.15)'}}
            onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}}
          >
            <div style={{fontSize:'2.5rem', marginBottom:'1rem'}}>👨‍👩‍👧</div>
            <h3 style={{color:'#2563eb', fontSize:'1.3rem', marginBottom:'0.5rem'}}>Caregiver Alerts</h3>
            <p style={{color:'#555', lineHeight:1.6}}>Real-time notifications keep caregivers informed and in control</p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section id="problem" style={{padding:'3rem 1rem', background:'#fff', marginBottom:'2rem', maxWidth:'1000px', margin:'0 auto 2rem auto'}}>
        <SectionIcon icon="❗" label="The Problem" />
        <p style={{fontSize:'1.15rem', color:'#555', marginTop:'1.5rem', marginBottom:'1.5rem', lineHeight:1.8}}>
          Millions of elderly and Alzheimer's patients struggle with medication adherence. This isn't just an inconvenience—it's a health crisis.
        </p>
        <ul style={{fontSize:'1.1rem', color:'#333', lineHeight:'2.2', marginLeft:'1rem'}}>
          <li>✗ Patients forget doses unintentionally due to memory issues</li>
          <li>✗ Missed medicines lead to confusion, complications, and emergencies</li>
          <li>✗ Caregivers experience constant anxiety and stress monitoring</li>
          <li>✗ Healthcare costs spike due to preventable hospitalizations</li>
        </ul>
        <div style={{background:'#fee2e2', padding:'1.5rem', borderRadius:'8px', marginTop:'2rem', borderLeft:'4px solid #dc2626'}}>
          <p style={{color:'#7f1d1d', fontWeight:600}}><strong>The Impact:</strong> Missed doses create a cascade of instability for patients and emotional burden for caregivers.</p>
        </div>
      </section>

      {/* The Solution */}
      <section style={{padding:'3rem 1rem', background:'#e0e7ff', marginBottom:'2rem', maxWidth:'1000px', margin:'0 auto 2rem auto', borderRadius:'12px'}}>
        <SectionIcon icon="✅" label="The Solution" />
        <p style={{fontSize:'1.15rem', color:'#222', marginTop:'1.5rem', marginBottom:'1.5rem', lineHeight:1.8}}>
          Med-Sync simplifies medication management with a three-step workflow that works:
        </p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1.5rem', marginTop:'2rem'}}>
          <div style={{background:'#fff', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>1️⃣</div>
            <h4 style={{color:'#2563eb', marginBottom:'0.5rem'}}>Caregiver Setup</h4>
            <p style={{color:'#555', fontSize:'0.95rem'}}>Enter medicine details, doses, and timing</p>
          </div>
          <div style={{background:'#fff', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>2️⃣</div>
            <h4 style={{color:'#2563eb', marginBottom:'0.5rem'}}>Patient Reminder</h4>
            <p style={{color:'#555', fontSize:'0.95rem'}}>Smart notification at the right time</p>
          </div>
          <div style={{background:'#fff', padding:'1.5rem', borderRadius:'8px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>3️⃣</div>
            <h4 style={{color:'#2563eb', marginBottom:'0.5rem'}}>Automatic Alert</h4>
            <p style={{color:'#555', fontSize:'0.95rem'}}>Caregiver gets instant confirmation</p>
          </div>
        </div>
      </section>

      {/* Feasibility Study */}
      <section style={{padding:'3rem 1rem', background:'#fff', marginBottom:'2rem'}}>
        <SectionIcon icon="📊" label="Why It Works" />
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'2rem', marginTop:'2rem', maxWidth:'1200px', margin:'2rem auto 0 auto'}}>
          <div style={{background:'#f0f9ff', borderRadius:'10px', padding:'2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <h3 style={{color:'#2563eb', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>⚙️ Technically Sound</h3>
            <ul style={{color:'#333', lineHeight:1.8, fontSize:'0.95rem'}}>
              <li>• Flutter/React Native for mobile</li>
              <li>• Firebase backend & notifications</li>
              <li>• Cloud-based data storage</li>
            </ul>
          </div>
          <div style={{background:'#f0fdf4', borderRadius:'10px', padding:'2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <h3 style={{color:'#22c55e', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>🎯 Operationally Simple</h3>
            <ul style={{color:'#333', lineHeight:1.8, fontSize:'0.95rem'}}>
              <li>• Senior-friendly interface</li>
              <li>• Large, clear buttons</li>
              <li>• One-tap confirmation</li>
            </ul>
          </div>
          <div style={{background:'#fefce8', borderRadius:'10px', padding:'2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <h3 style={{color:'#eab308', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>💰 Economically Viable</h3>
            <ul style={{color:'#333', lineHeight:1.8, fontSize:'0.95rem'}}>
              <li>• Low development cost</li>
              <li>• Prevents $5K+ hospital visits</li>
              <li>• Saves time and resources</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Impact & Benefits */}
      <section style={{padding:'3rem 1rem', background:'#fff', marginBottom:'2rem'}}>
        <SectionIcon icon="🌟" label="Impact & Benefits" />
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'2rem', marginTop:'2rem', maxWidth:'1200px', margin:'2rem auto 0 auto'}}>
          <div style={{background:'#e0f2fe', borderRadius:'10px', padding:'2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <h3 style={{color:'#0369a1', marginBottom:'1rem'}}>👴 For Patients</h3>
            <ul style={{color:'#333', lineHeight:1.8, fontSize:'0.95rem'}}>
              <li>✓ Take medicine on time, every time</li>
              <li>✓ Better health outcomes</li>
              <li>✓ Greater independence</li>
              <li>✓ Reduced anxiety</li>
            </ul>
          </div>
          <div style={{background:'#fce7f3', borderRadius:'10px', padding:'2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <h3 style={{color:'#be185d', marginBottom:'1rem'}}>👨‍👩‍👧 For Caregivers</h3>
            <ul style={{color:'#333', lineHeight:1.8, fontSize:'0.95rem'}}>
              <li>✓ Real-time medication tracking</li>
              <li>✓ Instant alerts and confirmations</li>
              <li>✓ Reduced stress and worry</li>
              <li>✓ Peace of mind 24/7</li>
            </ul>
          </div>
          <div style={{background:'#dcfce7', borderRadius:'10px', padding:'2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <h3 style={{color:'#15803d', marginBottom:'1rem'}}>👨‍⚕️ For Healthcare</h3>
            <ul style={{color:'#333', lineHeight:1.8, fontSize:'0.95rem'}}>
              <li>✓ Access to adherence data</li>
              <li>✓ Better treatment decisions</li>
              <li>✓ Reduced hospital visits</li>
              <li>✓ Lower overall costs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{padding:'4rem 1rem', background:'linear-gradient(135deg, #2563eb 0%, #22c55e 100%)', textAlign:'center', color:'#fff', marginBottom:'0'}}>
        <h2 style={{fontSize:'2.5rem', fontWeight:700, marginBottom:'1.5rem'}}>Ready to Transform Medication Management?</h2>
        <p style={{fontSize:'1.1rem', marginBottom:'2.5rem', maxWidth:'600px', margin:'0 auto 2.5rem auto', lineHeight:1.8}}>
          Join us in creating a healthier future for elderly patients and their families.
        </p>
        <div style={{display:'flex', justifyContent:'center', gap:'1.5rem', flexWrap:'wrap'}}>
          <a 
            href="/contact" 
            style={{
              background:'#fff', 
              color:'#2563eb', 
              padding:'1rem 2.5rem', 
              borderRadius:'8px', 
              fontWeight:700, 
              textDecoration:'none',
              fontSize:'1rem',
              transition:'all 0.3s ease',
              boxShadow:'0 4px 15px rgba(0,0,0,0.2)',
              cursor:'pointer',
              border:'none',
              display:'inline-block'
            }}
            onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'}}
            onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'}}
          >
            Get Started Today
          </a>
          <a 
            href="/features" 
            style={{
              background:'transparent', 
              color:'#fff', 
              padding:'1rem 2.5rem', 
              borderRadius:'8px', 
              fontWeight:700, 
              textDecoration:'none',
              fontSize:'1rem',
              border:'2px solid #fff',
              transition:'all 0.3s ease',
              cursor:'pointer',
              display:'inline-block'
            }}
            onMouseOver={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}}
            onMouseOut={(e) => {e.currentTarget.style.background = 'transparent'}}
          >
            Learn More Features
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{textAlign:'center', color:'#2563eb', background:'#f8fafc', padding:'3rem 1rem', borderTop:'1px solid #e5e7eb'}}>
        <div style={{maxWidth:'1000px', margin:'0 auto'}}>
          <div style={{fontWeight:700, fontSize:'1.3rem', marginBottom:'1rem'}}>💊 Med-Sync</div>
          <p style={{color:'#555', marginBottom:'1.5rem'}}>Smart Medicine Reminder for Alzheimer's and Elderly Patients</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'1.5rem', marginBottom:'2rem', fontSize:'0.95rem'}}>
            <div>
              <p style={{fontWeight:600, marginBottom:'0.5rem'}}>Product</p>
              <a href="/features" style={{color:'#2563eb', textDecoration:'none', display:'block', marginBottom:'0.3rem'}}>Features</a>
              <a href="/technology" style={{color:'#2563eb', textDecoration:'none', display:'block'}}>Technology</a>
            </div>
            <div>
              <p style={{fontWeight:600, marginBottom:'0.5rem'}}>Company</p>
              <a href="/about" style={{color:'#2563eb', textDecoration:'none', display:'block', marginBottom:'0.3rem'}}>About Us</a>
              <a href="/impact" style={{color:'#2563eb', textDecoration:'none', display:'block'}}>Impact</a>
            </div>
            <div>
              <p style={{fontWeight:600, marginBottom:'0.5rem'}}>Connect</p>
              <a href="/contact" style={{color:'#2563eb', textDecoration:'none', display:'block', marginBottom:'0.3rem'}}>Contact</a>
              <a href="mailto:info@medsync.com" style={{color:'#2563eb', textDecoration:'none', display:'block'}}>Email</a>
            </div>
          </div>
          <div style={{paddingTop:'2rem', borderTop:'1px solid #e5e7eb', color:'#555', fontSize:'0.9rem'}}>
            <p>© 2025 Med-Sync. All rights reserved. | <a href="#" style={{color:'#2563eb', textDecoration:'none'}}>Privacy</a> | <a href="#" style={{color:'#2563eb', textDecoration:'none'}}>Terms</a></p>
          </div>
        </div>
      </footer>

      <ChatBot />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Home;
