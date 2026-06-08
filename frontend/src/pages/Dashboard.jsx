import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';

const doctorPatients = [
  {
    id: 1,
    name: 'Asha Patel',
    age: 54,
    gender: 'Female',
    disease: 'Hypertension',
    status: 'recovering',
    condition: 'Stable',
    medicalHistory: 'Hypertension, mild arthritis, allergy to penicillin.',
    medicines: ['Amlodipine 5mg', 'Atorvastatin 20mg', 'Aspirin 75mg'],
    routine: 'Morning walk, blood pressure check, medication post-breakfast.',
    recoveryProgress: 72,
    criticality: 'Moderate',
    changes: [
      { day: 'Day 1', note: 'Started medication plan.' },
      { day: 'Day 4', note: 'Blood pressure stabilized.' },
      { day: 'Day 7', note: 'Reported less dizziness.' }
    ]
  },
  {
    id: 2,
    name: 'Rahul Singh',
    age: 39,
    gender: 'Male',
    disease: 'Type 2 Diabetes',
    status: 'under medication',
    condition: 'Monitoring',
    medicalHistory: 'Diabetes, obesity, family history of heart disease.',
    medicines: ['Metformin 500mg', 'Glimepiride 2mg', 'Multivitamin'],
    routine: 'Diet monitoring, evening exercise, insulin tracking.',
    recoveryProgress: 54,
    criticality: 'Medium',
    changes: [
      { day: 'Day 1', note: 'Diet plan started.' },
      { day: 'Day 5', note: 'Glucose reading improved.' },
      { day: 'Day 9', note: 'Patient reported fatigue.' }
    ]
  },
  {
    id: 3,
    name: 'Renuka Joshi',
    age: 68,
    gender: 'Female',
    disease: 'Chronic Kidney Disease',
    status: 'critical',
    condition: 'Needs review',
    medicalHistory: 'CKD stage 3, hypertension, osteoporosis.',
    medicines: ['Losartan 50mg', 'Calcium supplement', 'Erythropoietin injections'],
    routine: 'Dialysis reviews, fluid intake management, blood panel monitoring.',
    recoveryProgress: 43,
    criticality: 'High',
    changes: [
      { day: 'Day 1', note: 'Fluid intake reduced.' },
      { day: 'Day 3', note: 'Dialysis schedule confirmed.' },
      { day: 'Day 6', note: 'Blood potassium remained elevated.' }
    ]
  }
];

const caregiverPatients = [
  {
    id: 101,
    name: 'Asha Patel',
    age: 54,
    gender: 'Female',
    disease: 'Hypertension',
    status: 'recovering',
    condition: 'Stable',
    medicalHistory: 'Hypertension, mild arthritis, allergy to penicillin.',
    medicines: ['Amlodipine 5mg', 'Atorvastatin 20mg', 'Aspirin 75mg'],
    recoveryProgress: 72,
    severity: 'Moderate',
    updates: ['Blood pressure normal', 'Appetite steady', 'Medication on time'],
    remainingDays: 4,
    routine: 'Morning walk, fluid balance, light yoga.',
    nutrition: 'Balanced low-sodium meals',
    hydration: '8/10',
    exercise: '75% target completed'
  },
  {
    id: 102,
    name: 'Rahul Singh',
    age: 39,
    gender: 'Male',
    disease: 'Type 2 Diabetes',
    status: 'under medication',
    condition: 'Monitoring',
    medicalHistory: 'Diabetes, obesity, family history of heart disease.',
    medicines: ['Metformin 500mg', 'Glimepiride 2mg', 'Multivitamin'],
    recoveryProgress: 54,
    severity: 'Medium',
    updates: ['Evening glucose stable', 'Missed afternoon insulin once'],
    remainingDays: 6,
    routine: 'Diet tracking, post-meal walk, hydration checks.',
    nutrition: 'Low-glycemic meals',
    hydration: '7/10',
    exercise: '65% target completed'
  },
  {
    id: 103,
    name: 'Renuka Joshi',
    age: 68,
    gender: 'Female',
    disease: 'Chronic Kidney Disease',
    status: 'critical',
    condition: 'Needs review',
    medicalHistory: 'CKD stage 3, hypertension, osteoporosis.',
    medicines: ['Losartan 50mg', 'Calcium supplement', 'Erythropoietin injections'],
    recoveryProgress: 43,
    severity: 'High',
    updates: ['Dialysis today', 'Low energy reported', 'Fluid restricted'],
    remainingDays: 2,
    routine: 'Dialysis check-ins, medication reminders, hydration monitoring.',
    nutrition: 'Low-potassium diet',
    hydration: '5/10',
    exercise: '45% target completed'
  }
];

const caregiverDoctors = [
  {
    name: 'Dr. Meera Shah',
    specialization: 'General Physician',
    notes: 'Coordinate follow-up for blood pressure and hydration checks.',
    plan: 'Weekly review with medication adjustment after lab results.',
    appointment: 'Tomorrow at 10:00 AM'
  },
  {
    name: 'Dr. Sameer Rao',
    specialization: 'Endocrinologist',
    notes: 'Review glucose logs and support dietary coaching.',
    plan: 'Bi-weekly telehealth check-in to update insulin regimen.',
    appointment: 'Friday at 2:30 PM'
  }
];

const caregiverReminders = [
  { id: 1, patient: 'Rahul Singh', medicine: 'Metformin 500mg', time: '08:00 PM', status: 'Due soon' },
  { id: 2, patient: 'Asha Patel', medicine: 'Amlodipine 5mg', time: '09:00 AM', status: 'On time' },
  { id: 3, patient: 'Renuka Joshi', medicine: 'Erythropoietin injection', time: '12:00 PM', status: 'Missed' }
];

const caregiverAlerts = [
  { label: 'Missed Medication', detail: 'Renuka missed her noon injection and needs immediate follow-up.', type: 'critical' },
  { label: 'Doctor Visit', detail: 'Dr. Sameer Rao requested a glucose log review.', type: 'warning' },
  { label: 'Hydration Alert', detail: 'Asha needs an extra hydration check after exercise.', type: 'info' }
];

const caregiverDiet = {
  recommended: ['Leafy greens', 'Lean protein', 'Low sodium soups'],
  avoid: ['Processed sugar', 'High-sodium snacks', 'Caffeinated drinks'],
  nutritionPlan: 'Plant-forward meals with protein at every meal and lower sodium intake.',
  hydration: '8 glasses goal',
  fitness: '30-minute daily walk or gentle stretching',
  progress: 82
};

const patientMedicines = [
  { id: 1, name: 'Aspirin', dose: '100mg', time: '08:00 AM', taken: true },
  { id: 2, name: 'Metformin', dose: '500mg', time: '12:00 PM', taken: true },
  { id: 3, name: 'Lisinopril', dose: '10mg', time: '08:00 PM', taken: false }
];

const Dashboard = () => {
  const { user } = useAuth();
  const { mode } = useTheme();
  const role = user?.role || 'patient';
  const isDark = mode === 'dark';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPatientId, setSelectedPatientId] = useState(role === 'caregiver' ? caregiverPatients[0].id : 1);
  const [medicines, setMedicines] = useState(patientMedicines);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({ name: '', dose: '', time: '' });

  const filteredDoctorPatients = doctorPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(patient.id).includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCaregiverPatients = caregiverPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(patient.id).includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedPatient = role === 'doctor'
    ? filteredDoctorPatients.find((patient) => patient.id === selectedPatientId) || filteredDoctorPatients[0] || doctorPatients[0]
    : role === 'caregiver'
      ? filteredCaregiverPatients.find((patient) => patient.id === selectedPatientId) || filteredCaregiverPatients[0] || caregiverPatients[0]
      : null;

  const totalPatients = doctorPatients.length;
  const recoveringCount = doctorPatients.filter((p) => p.status === 'recovering').length;
  const recoveredCount = doctorPatients.filter((p) => p.recoveryProgress >= 90).length;
  const underMedicationCount = doctorPatients.filter((p) => p.status === 'under medication').length;
  const criticalCount = doctorPatients.filter((p) => p.status === 'critical').length;
  const takenCount = medicines.filter((m) => m.taken).length;
  const adherenceRate = Math.round((takenCount / medicines.length) * 100);
  const assignedDoctorsCount = caregiverDoctors.length;
  const activeMonitoringCount = caregiverPatients.filter((patient) => patient.severity !== 'Stable' && patient.severity !== 'Low').length;

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-role', role);
    } catch (e) {}
    return () => {
      try { document.documentElement.removeAttribute('data-role'); } catch (e) {}
    };
  }, [role]);

  const handleMarkAsTaken = (id) => {
    setMedicines(medicines.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med)));
  };

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dose && newMedicine.time) {
      setMedicines([
        ...medicines,
        { id: medicines.length + 1, ...newMedicine, taken: false }
      ]);
      setNewMedicine({ name: '', dose: '', time: '' });
      setShowAddForm(false);
    }
  };

  const doctorName = user?.name || 'Dr. Meera Shah';
  const specialization = user?.specialization || 'General Physician';
  const caregiverName = user?.name || 'Priya Sharma';
  const caregiverId = user?.id || 'CGR-001';
  const activeCases = totalPatients - recoveredCount;

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="reveal" style={{ background: `linear-gradient(135deg, var(--primary) 0%, rgba(0,0,0,0.18) 100%)`, padding: '2rem 1rem', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0', marginBottom: '0.5rem' }}>
          {role === 'doctor' ? 'Doctor Dashboard' : role === 'caregiver' ? 'Caregiver Dashboard' : 'Patient Dashboard'}
        </h1>
        <p style={{ fontSize: '1.1rem', margin: '0', color: 'rgba(255,255,255,0.9)' }}>
          {role === 'doctor'
            ? 'Clinical overview, patient management, and recovery monitoring'
            : role === 'caregiver'
              ? 'Monitor both patients and doctors in a single care coordination workspace'
              : 'Manage your medications and track adherence'}
        </p>
      </section>

      {role === 'doctor' ? (
        <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1rem' }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Doctor Name</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary)' }}>{doctorName}</h2>
            </div>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Specialization</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--accent)' }}>{specialization}</h2>
            </div>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Total Patients</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary)' }}>{totalPatients}</h2>
            </div>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Active Cases</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--accent)' }}>{activeCases}</h2>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or ID"
                  style={{ flex: '1 1 220px', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '0.95rem' }}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', minWidth: '180px', fontSize: '0.95rem' }}
                >
                  <option value="all">All Patients</option>
                  <option value="recovering">Recovering</option>
                  <option value="under medication">Under Medication</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Patient Management</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {filteredDoctorPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatientId(patient.id)}
                    style={{
                      textAlign: 'left',
                      borderRadius: '18px',
                      background: patient.id === selectedPatient.id ? 'rgba(37,99,235,0.1)' : 'var(--surface)',
                      border: patient.id === selectedPatient.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                      padding: '1rem 1.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700 }}>{patient.name}</p>
                        <p style={{ margin: '0.35rem 0 0 0', color: '#555' }}>ID: {patient.id} · {patient.age} yrs · {patient.gender}</p>
                      </div>
                      <span style={{ fontSize: '0.9rem', color: patient.status === 'critical' ? '#dc2626' : patient.status === 'recovering' ? '#16a34a' : '#2563eb', fontWeight: 700, textTransform: 'capitalize' }}>{patient.status}</span>
                    </div>
                  </button>
                ))}

                {filteredDoctorPatients.length === 0 && (
                  <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--surface)'.replace('var(--surface)','var(--surface)'), color: 'var(--muted)'.replace('var(--muted)','var(--muted)') }}>
                    No patients match your filter. Adjust search or status to continue.
                  </div>
                )}
              </div>
            </div>

            <aside style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Notifications</h3>
                {[
                  { label: 'Missed medication alert', detail: 'Patient Rahul Singh missed evening dose', severity: 'critical' },
                  { label: 'Upcoming appointment', detail: 'Asha Patel has a follow-up tomorrow', severity: 'info' },
                  { label: 'Health update', detail: 'Renuka Joshi needs review for potassium levels', severity: 'warning' }
                ].map((item) => {
                  const alertBg = isDark
                    ? (item.severity === 'critical' ? 'rgba(239, 68, 68, 0.15)' : item.severity === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)')
                    : (item.severity === 'critical' ? '#fee2e2' : item.severity === 'warning' ? '#fef3c7' : '#eff6ff');

                  const alertColor = isDark
                    ? (item.severity === 'critical' ? '#fca5a5' : item.severity === 'warning' ? '#fde047' : '#93c5fd')
                    : (item.severity === 'critical' ? '#991b1b' : item.severity === 'warning' ? '#92400e' : '#1e40af');

                  const detailColor = isDark
                    ? 'rgba(255, 255, 255, 0.75)'
                    : 'var(--muted)';

                  return (
                    <div key={item.label} style={{ background: alertBg, borderRadius: '16px', padding: '1rem', marginBottom: '1rem', border: isDark ? `1px solid ${alertColor}40` : 'none' }}>
                      <p style={{ margin: '0 0 0.4rem 0', fontWeight: 700, color: alertColor }}>{item.label}</p>
                      <p style={{ margin: 0, color: detailColor }}>{item.detail}</p>
                    </div>
                  );
                })}
              </div>
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Appointment Summary</h3>
                <p style={{ margin: 0, color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), lineHeight: 1.8 }}>3 appointments scheduled this week. Check patient notes before follow-ups and confirm treatment changes.</p>
              </div>
            </aside>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Patient Details</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'rgba(37,99,235,0.05)' }}>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)') }}>Name</p>
                  <h4 style={{ margin: 0 }}>{selectedPatient.name}</h4>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                  {[
                    { label: 'Patient ID', value: selectedPatient.id },
                    { label: 'Age', value: selectedPatient.age },
                    { label: 'Gender', value: selectedPatient.gender },
                    { label: 'Disease', value: selectedPatient.disease }
                  ].map((item) => (
                    <div key={item.label} style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                      <p style={{ margin: 0, color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>{item.label}</p>
                      <p style={{ margin: '0.5rem 0 0 0', fontWeight: 700 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Medical History</p>
                  <p style={{ margin: 0, color: 'var(--text)'.replace('var(--text)','var(--text)'), lineHeight: 1.8 }}>{selectedPatient.medicalHistory}</p>
                </div>
                <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Prescribed Medicines</p>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text)'.replace('var(--text)','var(--text)'), lineHeight: 1.8 }}>
                    {selectedPatient.medicines.map((med) => <li key={med}>{med}</li>)}
                  </ul>
                </div>
                <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Daily Routine</p>
                  <p style={{ margin: 0, color: 'var(--text)'.replace('var(--text)','var(--text)'), lineHeight: 1.8 }}>{selectedPatient.routine}</p>
                </div>
                <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--surface)'.replace('var(--surface)','var(--surface)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Recovery Progress</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, background: 'var(--panel)'.replace('var(--panel)','var(--panel)'), borderRadius: '999px', overflow: 'hidden', height: '14px' }}>
                      <div style={{ width: `${selectedPatient.recoveryProgress}%`, background: 'var(--primary)', height: '100%' }} />
                    </div>
                    <span style={{ margin: 0, fontWeight: 700 }}>{selectedPatient.recoveryProgress}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Recovery Monitoring</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {selectedPatient.changes.map((change) => (
                    <div key={change.day} style={{ padding: '1rem', borderRadius: '16px', background: 'var(--surface)'.replace('var(--surface)','var(--surface)'), border: '1px solid var(--border)' }}>
                      <p style={{ margin: '0 0 0.4rem 0', fontWeight: 700 }}>{change.day}</p>
                      <p style={{ margin: 0, color: 'var(--muted)'.replace('var(--muted)','var(--muted)') }}>{change.note}</p>
                    </div>
                  ))}
                  <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Treatment Effectiveness</p>
                    <p style={{ margin: 0, color: 'var(--text)'.replace('var(--text)','var(--text)'), lineHeight: 1.8 }}>Monitoring improvements and treatment response daily to ensure the care plan is optimized and safe.</p>
                  </div>
                </div>
              </div>
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Patient Status</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[
                    { label: 'Condition', value: selectedPatient.condition },
                    { label: 'Criticality', value: selectedPatient.criticality },
                    { label: 'Treatment Note', value: selectedPatient.status === 'critical' ? 'Immediate review required' : 'Continue current plan' }
                  ].map((item) => (
                    <div key={item.label} style={{ background: 'var(--card)'.replace('var(--card)','var(--card)'), padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                      <p style={{ margin: '0 0 0.4rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>{item.label}</p>
                      <p style={{ margin: 0, color: 'var(--text)'.replace('var(--text)','var(--text)'), fontWeight: 700 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Charts & Trends</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.75rem 0', fontWeight: 700 }}>Recovery Trends</p>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', height: '120px' }}>
                    {[40, 55, 70, 72, 78, 82, 88].map((value, idx) => (
                      <div key={idx} style={{ flex: 1, background: 'rgba(37,99,235,0.12)', borderRadius: '12px', height: `${value}%`, position: 'relative' }}>
                        <span style={{ position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--text)'.replace('var(--text)','var(--text)') }}>{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.75rem 0', fontWeight: 700 }}>Medication Adherence</p>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {['Amlodipine', 'Metformin', 'Losartan'].map((label, idx) => (
                      <div key={label} style={{ display: 'grid', gap: '0.4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>
                          <span>{label}</span>
                          <span>{80 + idx * 5}%</span>
                        </div>
                        <div style={{ background: 'var(--panel)'.replace('var(--panel)','var(--panel)'), borderRadius: '999px', height: '10px' }}>
                          <div style={{ width: `${80 + idx * 5}%`, height: '100%', background: 'var(--primary)', borderRadius: '999px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Disease Distribution</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Hypertension', value: 34, color: '#3b82f6' },
                    { label: 'Diabetes', value: 25, color: '#f59e0b' },
                    { label: 'CKD', value: 18, color: '#9333ea' }
                  ].map((item) => (
                    <div key={item.label} style={{ flex: '1 1 140px', padding: '1rem', borderRadius: '16px', background: 'var(--surface)'.replace('var(--surface)','var(--surface)'), border: '1px solid var(--border)' }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: 700, color: 'var(--text)'.replace('var(--text)','var(--text)') }}>{item.label}</p>
                      <p style={{ margin: 0, color: item.color, fontWeight: 700 }}>{item.value}%</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Progress Tracker</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Patients Recovering</p>
                    <p style={{ margin: 0, fontWeight: 700, color: '#16a34a' }}>{recoveringCount}</p>
                  </div>
                  <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Fully Recovered</p>
                    <p style={{ margin: 0, fontWeight: 700, color: '#2563eb' }}>{recoveredCount}</p>
                  </div>
                  <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Critical Cases</p>
                    <p style={{ margin: 0, fontWeight: 700, color: '#dc2626' }}>{criticalCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : role === 'caregiver' ? (
        <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1rem' }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Caregiver</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary)' }}>{caregiverName}</h2>
            </div>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Caregiver ID</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--accent)' }}>{caregiverId}</h2>
            </div>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Assigned Patients</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary)' }}>{caregiverPatients.length}</h2>
            </div>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Assigned Doctors</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--accent)' }}>{assignedDoctorsCount}</h2>
            </div>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <p style={{ margin: '0 0 1rem 0', color: 'var(--muted)', fontWeight: 600 }}>Active Monitoring Cases</p>
              <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary)' }}>{activeMonitoringCount}</h2>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search patient by name or ID"
                  style={{ flex: '1 1 220px', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '0.95rem' }}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', minWidth: '180px', fontSize: '0.95rem' }}
                >
                  <option value="all">All Patients</option>
                  <option value="recovering">Recovering</option>
                  <option value="under medication">Under Medication</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Patient Monitoring</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {filteredCaregiverPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatientId(patient.id)}
                    style={{
                      textAlign: 'left',
                      borderRadius: '18px',
                      background: patient.id === selectedPatient.id ? 'rgba(5,150,105,0.1)' : 'var(--surface)',
                      border: patient.id === selectedPatient.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                      padding: '1rem 1.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700 }}>{patient.name}</p>
                        <p style={{ margin: '0.35rem 0 0 0', color: '#555' }}>ID: {patient.id} · {patient.age} yrs · {patient.gender}</p>
                      </div>
                      <span style={{ fontSize: '0.9rem', color: patient.severity === 'High' ? '#dc2626' : patient.severity === 'Medium' ? '#f59e0b' : '#16a34a', fontWeight: 700 }}>{patient.severity}</span>
                    </div>
                    <p style={{ margin: '0.85rem 0 0 0', fontSize: '0.95rem', color: 'var(--muted)'.replace('var(--muted)','var(--muted)') }}>{patient.disease} · {patient.status}</p>
                  </button>
                ))}

                {filteredCaregiverPatients.length === 0 && (
                  <div style={{ padding: '1.5rem', borderRadius: '18px', background: 'var(--surface)'.replace('var(--surface)','var(--surface)'), color: 'var(--muted)'.replace('var(--muted)','var(--muted)') }}>
                    No patients match your filter.
                  </div>
                )}
              </div>
            </div>

            <aside style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Medication Reminders</h3>
                {caregiverReminders.map((reminder) => (
                  <div key={reminder.id} style={{ padding: '1rem', borderRadius: '16px', background: 'var(--surface)'.replace('var(--surface)','var(--surface)'), border: '1px solid var(--border)', marginBottom: '1rem' }}>
                    <p style={{ margin: 0, fontWeight: 700 }}>{reminder.patient}</p>
                    <p style={{ margin: '0.35rem 0 0 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)') }}>{reminder.medicine} • {reminder.time}</p>
                    <span style={{ marginTop: '0.75rem', display: 'inline-flex', padding: '0.4rem 0.75rem', borderRadius: '999px', background: reminder.status === 'Missed' ? '#fee2e2' : '#d1fae5', color: reminder.status === 'Missed' ? '#b91c1c' : '#065f46', fontSize: '0.85rem' }}>{reminder.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Alerts</h3>
                {caregiverAlerts.map((alert) => {
                  const alertBg = isDark
                    ? (alert.type === 'critical' ? 'rgba(239, 68, 68, 0.15)' : alert.type === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)')
                    : (alert.type === 'critical' ? '#fee2e2' : alert.type === 'warning' ? '#fef3c7' : '#eff6ff');

                  const alertColor = isDark
                    ? (alert.type === 'critical' ? '#fca5a5' : alert.type === 'warning' ? '#fde047' : '#93c5fd')
                    : (alert.type === 'critical' ? '#991b1b' : alert.type === 'warning' ? '#92400e' : '#1e40af');

                  const detailColor = isDark
                    ? 'rgba(255, 255, 255, 0.75)'
                    : 'var(--muted)';

                  return (
                    <div key={alert.label} style={{ padding: '1rem', borderRadius: '16px', background: alertBg, border: isDark ? `1px solid ${alertColor}40` : '1px solid var(--border)', marginBottom: '1rem' }}>
                      <p style={{ margin: '0 0 0.4rem 0', fontWeight: 700, color: alertColor }}>{alert.label}</p>
                      <p style={{ margin: 0, color: detailColor }}>{alert.detail}</p>
                    </div>
                  );
                })}
              </div>
            </aside>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Diet & Wellness</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.4rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Recommended Foods</p>
                  <p style={{ margin: 0, color: 'var(--text)'.replace('var(--text)','var(--text)') }}>{caregiverDiet.recommended.join(', ')}</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.4rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Foods to Avoid</p>
                  <p style={{ margin: 0, color: 'var(--text)'.replace('var(--text)','var(--text)') }}>{caregiverDiet.avoid.join(', ')}</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--surface)'.replace('var(--surface)','var(--surface)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.4rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Nutrition Plan</p>
                  <p style={{ margin: 0, color: 'var(--text)'.replace('var(--text)','var(--text)') }}>{caregiverDiet.nutritionPlan}</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.4rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Hydration Status</p>
                  <p style={{ margin: 0, fontWeight: 700, color: '#16a34a' }}>{caregiverDiet.hydration}</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.4rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Fitness Guidance</p>
                  <p style={{ margin: 0, color: 'var(--text)'.replace('var(--text)','var(--text)') }}>{caregiverDiet.fitness}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Doctor Information</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {caregiverDoctors.map((doctor) => (
                  <div key={doctor.name} style={{ padding: '1rem', borderRadius: '16px', background: 'var(--surface)'.replace('var(--surface)','var(--surface)'), border: '1px solid var(--border)' }}>
                    <p style={{ margin: '0 0 0.4rem 0', fontWeight: 700 }}>{doctor.name}</p>
                    <p style={{ margin: '0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)') }}>{doctor.specialization}</p>
                    <p style={{ margin: '0.75rem 0 0 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Notes</p>
                    <p style={{ margin: '0.35rem 0 0 0', color: 'var(--text)'.replace('var(--text)','var(--text)') }}>{doctor.notes}</p>
                    <p style={{ margin: '0.85rem 0 0 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Upcoming</p>
                    <p style={{ margin: '0.35rem 0 0 0', color: 'var(--text)'.replace('var(--text)','var(--text)') }}>{doctor.appointment}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Health Analytics</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 700 }}>Recovery Trend</p>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-end', height: '110px' }}>
                    {[60, 65, 70, 75, 82].map((value, idx) => (
                      <div key={idx} style={{ flex: 1, background: 'rgba(5,150,105,0.14)', borderRadius: '12px', minHeight: '20px', height: `${value}%` }} />
                    ))}
                  </div>
                </div>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 700 }}>Medication Adherence</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), marginBottom: '0.8rem' }}>
                    <span>Average</span><span>92%</span>
                  </div>
                  <div style={{ background: 'var(--panel)'.replace('var(--panel)','var(--panel)'), borderRadius: '999px', height: '12px' }}>
                    <div style={{ width: '92%', height: '100%', background: 'var(--primary)', borderRadius: '999px' }} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Care Summary</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.3rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Patient Recovery</p>
                  <p style={{ margin: 0, fontWeight: 700 }}>{caregiverDiet.progress}% overall wellness progress</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.3rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Appointment Tracking</p>
                  <p style={{ margin: 0, fontWeight: 700 }}>5 upcoming visits</p>
                </div>
                <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--card)'.replace('var(--card)','var(--card)'), border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 0.3rem 0', color: 'var(--muted)'.replace('var(--muted)','var(--muted)'), fontSize: '0.9rem' }}>Emergency Readiness</p>
                  <p style={{ margin: 0, fontWeight: 700 }}>Alerts configured for all active patients</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1rem' }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="glass reveal" style={{ padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>{medicines.length}</div>
              <p style={{ color: 'var(--text)', fontWeight: 600, margin: '0' }}>Total Medicines</p>
            </div>
            <div className="glass reveal" style={{ padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem' }}>{takenCount}/{medicines.length}</div>
              <p style={{ color: 'var(--text)', fontWeight: 600, margin: '0' }}>Today's Progress</p>
            </div>
            <div className="glass reveal" style={{ padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>{adherenceRate}%</div>
              <p style={{ color: 'var(--text)', fontWeight: 600, margin: '0' }}>Adherence Rate</p>
            </div>
            <div className="glass reveal" style={{ padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', margin: '0', marginBottom: '0.5rem' }}>🎯</div>
              <p style={{ color: 'var(--text)', fontWeight: 600, margin: '0' }}>On Track</p>
            </div>
          </section>

          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', margin: '0' }}>Today's Medicines</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#16a34a'}
                onMouseOut={(e) => e.currentTarget.style.background = '#22c55e'}
              >
                + Add Medicine
              </button>
            </div>

            {showAddForm && (
              <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Add New Medicine</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                    style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)'.replace('var(--border)','var(--border)'), fontFamily: 'inherit', fontSize: '1rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Dose (e.g., 100mg)"
                    value={newMedicine.dose}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dose: e.target.value })}
                    style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)'.replace('var(--border)','var(--border)'), fontFamily: 'inherit', fontSize: '1rem' }}
                  />
                  <input
                    type="time"
                    value={newMedicine.time}
                    onChange={(e) => setNewMedicine({ ...newMedicine, time: e.target.value })}
                    style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)'.replace('var(--border)','var(--border)'), fontFamily: 'inherit', fontSize: '1rem' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={handleAddMedicine}
                    style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    style={{ background: 'var(--panel)'.replace('var(--panel)','var(--panel)'), color: 'var(--text)'.replace('var(--text)','var(--text)'), border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gap: '1rem' }}>
              {medicines.map((medicine) => (
                <div
                  key={medicine.id}
                  style={{
                    background: 'var(--card)',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: `2px solid ${medicine.taken ? 'var(--accent)' : 'var(--border)'}`
                  }}
                >
                  <div>
                    <h3 style={{ color: 'var(--primary)', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{medicine.name}</h3>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted)', fontSize: '0.95rem' }}>
                      <span>💊 {medicine.dose}</span>
                      <span>⏰ {medicine.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMarkAsTaken(medicine.id)}
                    style={{
                      background: medicine.taken ? '#22c55e' : 'var(--panel)',
                      color: medicine.taken ? '#fff' : 'var(--text)',
                      border: 'none',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '6px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      if (!medicine.taken) {
                        e.currentTarget.style.opacity = '0.82';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!medicine.taken) {
                        e.currentTarget.style.opacity = '1';
                      }
                    }}
                  >
                    {medicine.taken ? '✓ Taken' : 'Mark as Taken'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2563eb', marginBottom: '2rem' }}>Analytics & Statistics</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)', color: '#fff' }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: '0.9' }}>Consistency Score</p>
                <div style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>87%</div>
                <p style={{ margin: '0', fontSize: '0.85rem', opacity: '0.9' }}>Average adherence this month</p>
                <div style={{ marginTop: '1rem', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '87%', background: 'var(--card)'.replace('var(--card)','var(--card)'), borderRadius: '2px' }} />
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)', color: '#fff' }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: '0.9' }}>Medicines Taken</p>
                <div style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>{takenCount}/{medicines.length}</div>
                <p style={{ margin: '0', fontSize: '0.85rem', opacity: '0.9' }}>Today properly taken</p>
                <div style={{ marginTop: '1rem', fontSize: '2rem' }}>✓</div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)', color: '#fff' }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: '0.9' }}>Current Streak</p>
                <div style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>12</div>
                <p style={{ margin: '0', fontSize: '0.85rem', opacity: '0.9' }}>Consecutive days</p>
                <p style={{ marginTop: '0.5rem', fontSize: '1.2rem' }}>🔥</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(250, 112, 154, 0.4)', color: '#fff' }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: '0.9' }}>Missed Doses</p>
                <div style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>2</div>
                <p style={{ margin: '0', fontSize: '0.85rem', opacity: '0.9' }}>This month</p>
                <p style={{ marginTop: '0.5rem', fontSize: '1.2rem' }}>⚠️</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
