import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import useReveal from '../hooks/useReveal';

const Counter = ({ end = 0, duration = 1000, format }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = 30;
    const steps = Math.max(1, Math.floor(duration / stepTime));
    const increment = Math.ceil((end - start) / steps);
    const iv = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(iv);
      } else {
        setValue(start);
      }
    }, stepTime);
    return () => clearInterval(iv);
  }, [end, duration]);
  return <span>{format ? format(value) : value}</span>;
};

const InfoRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px dashed var(--border-muted)' }}>
    <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{label}</div>
    <div style={{ fontWeight: 700, color: 'var(--text)' }}>{value ?? '—'}</div>
  </div>
);

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const rootRef = useReveal();

  if (!user) {
    return (
      <div className="page-transition" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div style={{ background: 'var(--card)', padding: '2rem 2.5rem', borderRadius: '24px', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: 'var(--primary)' }}>No profile available</h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>Please sign in to view your profile details.</p>
        </div>
      </div>
    );
  }

  const common = {
    lastLogin: user.lastLogin || '2026-06-01 09:24',
    loginHistory: user.loginHistory || ['2026-06-01 09:24', '2026-05-12 14:02', '2026-04-03 08:11'],
  };

  const patientData = {
    fullName: user.name,
    patientId: user.id,
    age: user.age || '34',
    gender: user.gender || 'Male',
    bloodGroup: user.bloodGroup || 'O+',
    contact: user.phone || user.email || '—',
    emergencyContact: user.emergencyContact || 'N/A',
    registrationDate: user.registeredAt || '2024-10-01',
    currentDisease: user.currentDisease || 'Hypertension',
    currentCondition: user.currentCondition || 'Stable',
    healthStatus: user.healthStatus || 'Good',
    recoveryPercent: user.recoveryPercent || 82,
    assignedDoctor: user.assignedDoctor || 'Dr. Mira Patel',
    medications: user.medications || ['Amlodipine 5mg', 'Aspirin 75mg'],
    medicalHistory: user.medicalHistory || { timesDiagnosed: 3, previousDiseases: ['Flu', 'Bronchitis'], previousTreatments: ['Antivirals'], hospitalVisits: 2 },
    stats: { consultations: 12, appointments: 9, medicinesTaken: 240, recoverySuccessRate: 76, improvementScore: 68 },
    timeline: user.timeline || [
      { id: 1, label: 'Appointment with Dr. Patel', date: '2026-05-30' },
      { id: 2, label: 'Medication log: Amlodipine', date: '2026-05-28' },
    ],
  };

  const doctorData = {
    name: user.name,
    doctorId: user.id,
    specialization: user.specialization || 'Cardiology',
    qualification: user.qualification || 'MD',
    experience: user.experience || 8,
    contact: user.phone || user.email || '—',
    clinic: user.clinic || 'Sunrise Clinic',
    registrationDate: user.registeredAt || '2018-03-15',
    stats: { patientsTreated: 1200, activePatients: 312, recovered: 980, consultations: 5400, prescriptions: 4020, successRate: 82 },
    work: { workingDays: 220, workingHours: 1760, perMonth: 45, avgConsultTime: '20m' },
    achievements: user.achievements || ['Board Certified', 'Best Doctor 2022'],
    analytics: user.analytics || [],
  };

  const caregiverData = {
    name: user.name,
    caregiverId: user.id,
    contact: user.phone || user.email || '—',
    experience: user.experience || 4,
    assignedPatients: user.assignedPatients || ['Patient A', 'Patient B'],
    registrationDate: user.registeredAt || '2021-07-01',
    stats: { assisted: 320, active: 18, recoveries: 120, remindersSent: 4200, reportsSubmitted: 890 },
    performance: { workingDays: 200, workingHours: 1500, avgResponse: '18m', attendance: '95%' },
    activitySummary: user.activitySummary || [],
  };

  const downloadProfile = () => {
    const data = { user, theme, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name || 'profile'}-summary.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={rootRef} className="page-transition" style={{ padding: '2.25rem 1rem', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gap: '1.25rem' }}>
        <header style={{ background: 'var(--card)', padding: '1.25rem', borderRadius: '16px', boxShadow: 'var(--shadow)', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: 88, height: 88, borderRadius: 18, background: 'linear-gradient(135deg, rgba(0,0,0,0.04), transparent)', display: 'grid', placeItems: 'center', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img alt="avatar" src={user.avatar || 'https://api.dicebear.com/6.x/thumbs/svg?seed=' + encodeURIComponent(user.name || 'user')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Profile</p>
              <h1 style={{ margin: '0.35rem 0 0', fontSize: '1.6rem', color: 'var(--primary)' }}>{user.name}</h1>
              <p style={{ margin: 0, color: 'var(--muted)' }}>{user.role === 'doctor' ? 'Doctor' : user.role === 'caregiver' ? 'Caregiver' : 'Patient'}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={() => alert('Open edit profile (stub)')} style={{ padding: '0.6rem 0.9rem', borderRadius: 10, background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>Edit Profile</button>
            <button onClick={downloadProfile} style={{ padding: '0.55rem 0.85rem', borderRadius: 10, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}>Download</button>
            <button onClick={() => { logout(); }} style={{ padding: '0.55rem 0.85rem', borderRadius: 10, background: 'transparent', border: '1px solid var(--danger, #d9534f)', color: 'var(--danger, #d9534f)', cursor: 'pointer' }}>Logout</button>
          </div>
        </header>

        <main style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <section style={{ background: 'var(--card)', padding: '1rem', borderRadius: 14, boxShadow: 'var(--shadow)' }}>
              <h2 style={{ margin: 0, color: 'var(--primary)' }}>Personal Information</h2>
              <div style={{ marginTop: '0.85rem' }}>
                {user.role === 'doctor' && (
                  <>
                    <InfoRow label="Doctor Name" value={doctorData.name} />
                    <InfoRow label="Doctor ID" value={doctorData.doctorId} />
                    <InfoRow label="Specialization" value={doctorData.specialization} />
                    <InfoRow label="Qualification" value={doctorData.qualification} />
                    <InfoRow label="Experience (yrs)" value={doctorData.experience} />
                    <InfoRow label="Contact" value={doctorData.contact} />
                    <InfoRow label="Clinic" value={doctorData.clinic} />
                    <InfoRow label="Registered" value={doctorData.registrationDate} />
                  </>
                )}

                {user.role === 'caregiver' && (
                  <>
                    <InfoRow label="Caregiver Name" value={caregiverData.name} />
                    <InfoRow label="Caregiver ID" value={caregiverData.caregiverId} />
                    <InfoRow label="Contact" value={caregiverData.contact} />
                    <InfoRow label="Experience (yrs)" value={caregiverData.experience} />
                    <InfoRow label="Assigned Patients" value={caregiverData.assignedPatients.join(', ')} />
                    <InfoRow label="Registered" value={caregiverData.registrationDate} />
                  </>
                )}

                {user.role === 'patient' && (
                  <>
                    <InfoRow label="Full Name" value={patientData.fullName} />
                    <InfoRow label="Patient ID" value={patientData.patientId} />
                    <InfoRow label="Age" value={patientData.age} />
                    <InfoRow label="Gender" value={patientData.gender} />
                    <InfoRow label="Blood Group" value={patientData.bloodGroup} />
                    <InfoRow label="Contact" value={patientData.contact} />
                    <InfoRow label="Emergency Contact" value={patientData.emergencyContact} />
                    <InfoRow label="Registered" value={patientData.registrationDate} />
                  </>
                )}
              </div>
            </section>

            <section style={{ background: 'var(--card)', padding: '1rem', borderRadius: 14, boxShadow: 'var(--shadow)' }}>
              <h2 style={{ margin: 0, color: 'var(--primary)' }}>Activity Timeline</h2>
              <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.6rem' }}>
                {(user.role === 'patient' ? patientData.timeline : user.role === 'doctor' ? doctorData.analytics : caregiverData.activitySummary).slice(0,5).map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 20, background: 'var(--primary)', marginTop: 6 }} />
                    <div style={{ color: 'var(--muted)' }}>{t.label || t}</div>
                    <div style={{ marginLeft: 'auto', color: 'var(--muted)' }}>{t.date || ''}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside style={{ display: 'grid', gap: '1rem' }}>
            <section style={{ background: 'var(--card)', padding: '1rem', borderRadius: 14, boxShadow: 'var(--shadow)' }}>
              <h3 style={{ margin: 0, color: 'var(--primary)' }}>Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
                {user.role === 'patient' && (
                  <>
                    <div style={{ background: 'var(--bg-elevated)', padding: 10, borderRadius: 10 }}>
                      <div style={{ color: 'var(--muted)', fontSize: 12 }}>Consultations</div>
                      <div style={{ fontWeight: 800, fontSize: 20 }}><Counter end={patientData.stats.consultations} /></div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', padding: 10, borderRadius: 10 }}>
                      <div style={{ color: 'var(--muted)', fontSize: 12 }}>Appointments</div>
                      <div style={{ fontWeight: 800, fontSize: 20 }}><Counter end={patientData.stats.appointments} /></div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', padding: 10, borderRadius: 10 }}>
                      <div style={{ color: 'var(--muted)', fontSize: 12 }}>Medicines</div>
                      <div style={{ fontWeight: 800, fontSize: 20 }}><Counter end={patientData.stats.medicinesTaken} /></div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', padding: 10, borderRadius: 10 }}>
                      <div style={{ color: 'var(--muted)', fontSize: 12 }}>Recovery %</div>
                      <div style={{ fontWeight: 800, fontSize: 20 }}><Counter end={patientData.stats.recoverySuccessRate} format={(v)=>v + '%'} /></div>
                    </div>
                  </>
                )}

                {user.role === 'doctor' && (
                  Object.entries(doctorData.stats).map(([k,v]) => (
                    <div key={k} style={{ background: 'var(--bg-elevated)', padding: 10, borderRadius: 10 }}>
                      <div style={{ color: 'var(--muted)', fontSize: 12 }}>{k.replace(/([A-Z])/g,' $1')}</div>
                      <div style={{ fontWeight: 800, fontSize: 20 }}><Counter end={v} /></div>
                    </div>
                  ))
                )}

                {user.role === 'caregiver' && (
                  Object.entries(caregiverData.stats).map(([k,v]) => (
                    <div key={k} style={{ background: 'var(--bg-elevated)', padding: 10, borderRadius: 10 }}>
                      <div style={{ color: 'var(--muted)', fontSize: 12 }}>{k.replace(/([A-Z])/g,' $1')}</div>
                      <div style={{ fontWeight: 800, fontSize: 20 }}><Counter end={v} /></div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section style={{ background: 'var(--card)', padding: '1rem', borderRadius: 14, boxShadow: 'var(--shadow)' }}>
              <h3 style={{ margin: 0, color: 'var(--primary)' }}>Security</h3>
              <div style={{ marginTop: 10 }}>
                <InfoRow label="Last Login" value={common.lastLogin} />
                <div style={{ paddingTop: 8 }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 6 }}>Recent devices</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {common.loginHistory.map((h, i) => (
                      <div key={i} style={{ padding: '0.4rem 0.6rem', background: 'var(--bg-elevated)', borderRadius: 8, fontSize: 12 }}>{h}</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Profile;
