import React, { useState } from 'react';
import SectionIcon from '../components/SectionIcon';

const Caregiver = () => {
  const [caregivers, setCaregivers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      relation: 'Daughter',
      phone: '+1 (555) 123-4567',
      email: 'sarah@example.com',
      role: 'Primary Caregiver',
      permissions: {
        viewMedicines: true,
        viewAdhrence: true,
        receiveAlerts: true,
        manageMedicines: false,
        contactDoctor: true
      },
      status: 'Active',
      joinDate: 'Nov 15, 2025'
    }
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 72,
      conditions: ['Hypertension', 'Diabetes Type 2', 'Osteoporosis'],
      totalMedicines: 5,
      adherenceRate: 92,
      lastUpdate: '2 hours ago',
      criticalAlerts: 1
    }
  ]);

  const [showAddCaregiverForm, setShowAddCaregiverForm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newCaregiver, setNewCaregiver] = useState({
    name: '',
    relation: '',
    phone: '',
    email: '',
    role: 'Secondary Caregiver'
  });

  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Handle add caregiver
  const handleAddCaregiver = () => {
    if (newCaregiver.name && newCaregiver.email && newCaregiver.phone) {
      setCaregivers([...caregivers, {
        id: caregivers.length + 1,
        ...newCaregiver,
        permissions: {
          viewMedicines: true,
          viewAdhrence: true,
          receiveAlerts: true,
          manageMedicines: false,
          contactDoctor: false
        },
        status: 'Pending',
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      }]);
      setNewCaregiver({ name: '', relation: '', phone: '', email: '', role: 'Secondary Caregiver' });
      setShowAddCaregiverForm(false);
    }
  };

  // Handle send invite
  const handleSendInvite = () => {
    if (inviteEmail && selectedPatient) {
      alert(`Invitation sent to ${inviteEmail} to manage ${selectedPatient.name}`);
      setInviteEmail('');
      setSelectedPatient(null);
      setShowInviteForm(false);
    }
  };

  // Toggle permissions
  const togglePermission = (caregiverId, permission) => {
    setCaregivers(caregivers.map(cg =>
      cg.id === caregiverId
        ? {
            ...cg,
            permissions: {
              ...cg.permissions,
              [permission]: !cg.permissions[permission]
            }
          }
        : cg
    ));
  };

  // Remove caregiver
  const removeCaregiver = (id) => {
    if (window.confirm('Are you sure you want to remove this caregiver?')) {
      setCaregivers(caregivers.filter(cg => cg.id !== id));
    }
  };

  return (
    <div style={{ background: '#f8fafc', color: '#222', fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', padding: '2rem 1rem', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0', marginBottom: '0.5rem' }}>Caregiver Management</h1>
        <p style={{ fontSize: '1.1rem', margin: '0', color: '#e0e7ff' }}>Manage caregivers and monitor patient health with team collaboration</p>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Why Caregivers Matter */}
        <section style={{ background: '#fff', padding: '2rem', borderRadius: '12px', marginBottom: '3rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <SectionIcon icon="👨‍⚕️" label="Why Caregiver Support Matters" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ padding: '1.5rem', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
              <h4 style={{ color: '#2563eb', marginTop: '0', marginBottom: '0.5rem' }}>📊 Real-Time Monitoring</h4>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Caregivers receive instant alerts when medications are missed, ensuring immediate intervention and better health outcomes.</p>
            </div>
            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <h4 style={{ color: '#b45309', marginTop: '0', marginBottom: '0.5rem' }}>❤️ Better Health Outcomes</h4>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Studies show that patients with active caregiver involvement have 30-40% better medication adherence and fewer hospitalizations.</p>
            </div>
            <div style={{ padding: '1.5rem', background: '#dcfce7', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
              <h4 style={{ color: '#15803d', marginTop: '0', marginBottom: '0.5rem' }}>🤝 Shared Responsibility</h4>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Reduces caregiver burden and stress while maintaining patient independence through collaborative management.</p>
            </div>
          </div>
        </section>

        {/* Current Caregivers */}
        <section style={{ background: '#fff', padding: '2rem', borderRadius: '12px', marginBottom: '3rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#222', margin: '0' }}>🏥 Your Caregivers</h2>
            <button
              onClick={() => setShowAddCaregiverForm(!showAddCaregiverForm)}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#1e40af'}
              onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              + Add Caregiver
            </button>
          </div>

          {/* Add Caregiver Form */}
          {showAddCaregiverForm && (
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#2563eb', marginTop: '0', marginBottom: '1rem' }}>Add New Caregiver</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newCaregiver.name}
                  onChange={(e) => setNewCaregiver({ ...newCaregiver, name: e.target.value })}
                  style={{ padding: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
                />
                <select
                  value={newCaregiver.relation}
                  onChange={(e) => setNewCaregiver({ ...newCaregiver, relation: e.target.value })}
                  style={{ padding: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
                >
                  <option value="">Select Relation</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Professional">Professional Caregiver</option>
                </select>
                <input
                  type="email"
                  placeholder="Email"
                  value={newCaregiver.email}
                  onChange={(e) => setNewCaregiver({ ...newCaregiver, email: e.target.value })}
                  style={{ padding: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newCaregiver.phone}
                  onChange={(e) => setNewCaregiver({ ...newCaregiver, phone: e.target.value })}
                  style={{ padding: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleAddCaregiver}
                  style={{
                    background: '#22c55e',
                    color: '#fff',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Add Caregiver
                </button>
                <button
                  onClick={() => setShowAddCaregiverForm(false)}
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Caregivers List */}
          {caregivers.length > 0 ? (
            caregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                style={{
                  background: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  border: `2px solid ${caregiver.status === 'Active' ? '#22c55e' : '#fbbf24'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#222', fontWeight: 700, margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                    {caregiver.name} <span style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.85rem' }}>({caregiver.role})</span>
                  </h4>
                  <p style={{ color: '#666', margin: '0.3rem 0', fontSize: '0.95rem' }}>
                    👥 Relation: {caregiver.relation} | 📞 {caregiver.phone} | 📧 {caregiver.email}
                  </p>
                  <p style={{ color: '#666', margin: '0.3rem 0', fontSize: '0.9rem' }}>
                    📅 Joined: {caregiver.joinDate} | Status: <span style={{ color: caregiver.status === 'Active' ? '#22c55e' : '#f59e0b', fontWeight: 600 }}>{caregiver.status}</span>
                  </p>

                  {/* Permissions */}
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontWeight: 600, color: '#2563eb', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Permissions:</p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {Object.entries(caregiver.permissions).map(([permission, hasAccess]) => (
                        <label key={permission} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                          <input
                            type="checkbox"
                            checked={hasAccess}
                            onChange={() => togglePermission(caregiver.id, permission)}
                            style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                          />
                          <span style={{ color: '#555' }}>
                            {permission === 'viewMedicines' && '👁️ View Medicines'}
                            {permission === 'viewAdhrence' && '📊 View Adherence'}
                            {permission === 'receiveAlerts' && '🔔 Receive Alerts'}
                            {permission === 'manageMedicines' && '✏️ Manage Medicines'}
                            {permission === 'contactDoctor' && '📞 Contact Doctor'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeCaregiver(caregiver.id)}
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginLeft: '1rem'
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: '#999', textAlign: 'center', padding: '2rem', fontSize: '1rem' }}>No caregivers added yet. Add one to start receiving support!</p>
          )}
        </section>

        {/* Patients Under Care */}
        <section style={{ background: '#fff', padding: '2rem', borderRadius: '12px', marginBottom: '3rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#222', margin: '0' }}>👨‍🏫 Patients You Care For</h2>
            <button
              onClick={() => setShowInviteForm(!showInviteForm)}
              style={{
                background: '#22c55e',
                color: '#fff',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#16a34a'}
              onMouseOut={(e) => e.currentTarget.style.background = '#22c55e'}
            >
              + Invite Patient
            </button>
          </div>

          {/* Invite Form */}
          {showInviteForm && (
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#22c55e', marginTop: '0', marginBottom: '1rem' }}>Invite Patient to Med-Sync</h3>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="email"
                  placeholder="Patient's Email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  style={{ padding: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
                />
                <select
                  value={selectedPatient?.id || ''}
                  onChange={(e) => setSelectedPatient(patients.find(p => p.id === parseInt(e.target.value)))}
                  style={{ padding: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'inherit', fontSize: '0.95rem' }}
                >
                  <option value="">Select Patient</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleSendInvite}
                  style={{
                    background: '#22c55e',
                    color: '#fff',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Send Invitation
                </button>
                <button
                  onClick={() => setShowInviteForm(false)}
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Patients List */}
          {patients.length > 0 ? (
            patients.map((patient) => (
              <div
                key={patient.id}
                style={{
                  background: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <h4 style={{ color: '#222', fontWeight: 700, margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>👤 {patient.name}</h4>
                    <p style={{ color: '#666', margin: '0.3rem 0', fontSize: '0.95rem' }}>Age: {patient.age} years</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#222', fontWeight: 700, margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>Medical Conditions</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {patient.conditions.map((condition, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#dbeafe',
                            color: '#0369a1',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 600
                          }}
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#fff', borderRadius: '8px' }}>
                    <p style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.5rem', margin: '0' }}>{patient.adherenceRate}%</p>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.3rem 0' }}>Adherence Rate</p>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#fff', borderRadius: '8px' }}>
                    <p style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.3rem', margin: '0' }}>{patient.totalMedicines}</p>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.3rem 0' }}>Active Medicines</p>
                  </div>
                  <div>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.3rem 0' }}>
                      ⏱️ Last Update: {patient.lastUpdate}
                    </p>
                    {patient.criticalAlerts > 0 && (
                      <p style={{ color: '#dc2626', fontWeight: 600, margin: '0.5rem 0', fontSize: '0.9rem' }}>
                        🚨 {patient.criticalAlerts} Critical Alert(s)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#999', textAlign: 'center', padding: '2rem', fontSize: '1rem' }}>No patients assigned yet.</p>
          )}
        </section>

        {/* Medical Best Practices for Caregivers */}
        <section style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <SectionIcon icon="📚" label="Best Practices for Caregivers" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ padding: '1.5rem', background: '#f0f9ff', borderRadius: '8px' }}>
              <h4 style={{ color: '#2563eb', marginTop: '0', fontSize: '1rem' }}>💊 Medication Management</h4>
              <ul style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Maintain updated medication list with dosages</li>
                <li>Check medications before and after meals</li>
                <li>Monitor for side effects or reactions</li>
                <li>Keep pharmacy contact information</li>
                <li>Understand drug interactions</li>
              </ul>
            </div>
            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '8px' }}>
              <h4 style={{ color: '#b45309', marginTop: '0', fontSize: '1rem' }}>🏥 Health Monitoring</h4>
              <ul style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Monitor blood pressure regularly</li>
                <li>Track blood glucose levels (if diabetic)</li>
                <li>Watch for signs of infection or illness</li>
                <li>Maintain health records</li>
                <li>Schedule regular doctor appointments</li>
              </ul>
            </div>
            <div style={{ padding: '1.5rem', background: '#dcfce7', borderRadius: '8px' }}>
              <h4 style={{ color: '#15803d', marginTop: '0', fontSize: '1rem' }}>❤️ Emotional Support</h4>
              <ul style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Listen and provide emotional support</li>
                <li>Encourage participation in activities</li>
                <li>Watch for signs of depression</li>
                <li>Maintain patient dignity and independence</li>
                <li>Connect with support groups</li>
              </ul>
            </div>
            <div style={{ padding: '1.5rem', background: '#f3e8ff', borderRadius: '8px' }}>
              <h4 style={{ color: '#7c3aed', marginTop: '0', fontSize: '1rem' }}>🚨 Emergency Preparedness</h4>
              <ul style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Know emergency contact numbers</li>
                <li>Keep emergency information visible</li>
                <li>Know CPR and first aid</li>
                <li>Have emergency medication list</li>
                <li>Know when to call 911</li>
              </ul>
            </div>
            <div style={{ padding: '1.5rem', background: '#fee2e2', borderRadius: '8px' }}>
              <h4 style={{ color: '#7f1d1d', marginTop: '0', fontSize: '1rem' }}>⚠️ Warning Signs</h4>
              <ul style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Chest pain or severe headache</li>
                <li>Difficulty breathing</li>
                <li>Confusion or memory loss</li>
                <li>Fever {`>`} 101°F (38.3°C)</li>
                <li>Severe weakness or falls</li>
              </ul>
            </div>
            <div style={{ padding: '1.5rem', background: '#ecfdf5', borderRadius: '8px' }}>
              <h4 style={{ color: '#065f46', marginTop: '0', fontSize: '1rem' }}>🧘 Self-Care for Caregivers</h4>
              <ul style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li>Take breaks and rest regularly</li>
                <li>Seek respite care support</li>
                <li>Join caregiver support groups</li>
                <li>Maintain your own health</li>
                <li>Seek professional help if needed</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Caregiver;
