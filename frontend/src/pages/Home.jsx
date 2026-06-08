import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import useReveal from '../hooks/useReveal';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const rootRef = useReveal();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const highlights = [
    { icon: '🩺', title: 'Patient Health Tracking', copy: 'Monitor vital routines and medication adherence with clear progress views.' },
    { icon: '👨‍⚕️', title: 'Doctor Monitoring System', copy: 'Doctors can review schedules, patient notes and recovery status at a glance.' },
    { icon: '💊', title: 'Medication Management', copy: 'Organize prescriptions, reminders, and dosage history in one secure place.' },
    { icon: '📈', title: 'Recovery Progress', copy: 'Track healing milestones, trends, and daily wellness improvements.' },
    { icon: '🥗', title: 'Diet Recommendations', copy: 'Receive personalized meal guidance based on health and medication plans.' },
    { icon: '🏃', title: 'Wellness Guidance', copy: 'Support fitness routines and lifestyle habits tailored to recovery goals.' },
    { icon: '🔒', title: 'Secure Records', copy: 'Keep medical history and care notes protected with modern encryption.' },
    { icon: '💬', title: 'Doctor–Patient Interaction', copy: 'Enable seamless communication and easy follow-up between care teams.' }
  ];

  const featureCards = [
    { icon: '⚡', title: 'Smart Reminders', copy: 'Receive intelligent alerts for medication times, refills, and follow-ups.' },
    { icon: '📊', title: 'Wellness Analytics', copy: 'See adherence scores, recovery trends, and personalized health insights.' },
    { icon: '🛡️', title: 'Trusted Platform', copy: 'A professional, premium interface designed for care confidence.' },
  ];

  return (
    <div ref={rootRef} className="page-transition">
      <section className="hero reveal">
        <div className="hero-content">
          <div className="eyebrow">Healthcare Platform</div>
          <h1 className="hero-title">Modern patient care and medication management.</h1>
          <p className="hero-copy">Med-Sync delivers premium healthcare coordination for patients, doctors, and caregivers with secure records, recovery analytics, and personalized guidance.</p>
          <div className="hero-actions">
            <Link to="/login" className="button-primary">Login</Link>
            <Link to="/signup" className="button-secondary">Register</Link>
          </div>
        </div>

        <div className="hero-panel reveal">
          <div className="hero-panel-card">
            <h3>Unified care hub</h3>
            <p>Connect patients and providers through a single secure workflow for medication and recovery tracking.</p>
          </div>
          <div className="hero-panel-card">
            <h3>Premium insights</h3>
            <p>Use professional analytics, progress streaks, and wellness summaries to stay ahead of every treatment plan.</p>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="section-header">
          <span className="eyebrow">Project Overview</span>
          <h2 className="section-title">Healthcare Management System</h2>
          <p className="section-copy">Med-Sync is built for modern healthcare SaaS experiences, delivering patient monitoring, doctor oversight, medication management, progress analytics, and secure records in one cohesive platform.</p>
        </div>

        <div className="card-grid">
          {highlights.map((item) => (
            <div key={item.title} className="card reveal">
              <div className="card-icon">{item.icon}</div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-copy">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal" style={{ background: 'radial-gradient(circle at top left, rgba(37,99,235,0.08), transparent 40%)' }}>
        <div className="section-header">
          <span className="eyebrow">Why choose Med-Sync</span>
          <h2 className="section-title">A modern platform for healthcare teams</h2>
          <p className="section-copy">It’s built to feel like a premium SaaS experience while delivering the trusted tools patients and doctors need every day.</p>
        </div>

        <div className="card-grid">
          {featureCards.map((card) => (
            <div key={card.title} className="card reveal">
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-copy">{card.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <div className="section-header">
          <span className="eyebrow">Get started</span>
          <h2 className="section-title">Professional care starts here</h2>
          <p className="section-copy">Create an account or log in to experience a polished healthcare dashboard with integrated medication tracking and doctor communication.</p>
        </div>

        <div className="hero-actions">
          <Link to="/signup" className="button-primary">Create Account</Link>
          <Link to="/login" className="button-secondary">Explore Login</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
