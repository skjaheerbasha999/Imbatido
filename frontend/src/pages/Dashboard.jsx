import React, { useState } from 'react';
import SectionIcon from '../components/SectionIcon';

const Dashboard = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Aspirin', dose: '100mg', time: '08:00 AM', taken: true },
    { id: 2, name: 'Metformin', dose: '500mg', time: '12:00 PM', taken: true },
    { id: 3, name: 'Lisinopril', dose: '10mg', time: '08:00 PM', taken: false },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({ name: '', dose: '', time: '' });

  const handleMarkAsTaken = (id) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dose && newMedicine.time) {
      setMedicines([...medicines, { 
        id: medicines.length + 1, 
        ...newMedicine, 
        taken: false 
      }]);
      setNewMedicine({ name: '', dose: '', time: '' });
      setShowAddForm(false);
    }
  };

  const takenCount = medicines.filter(m => m.taken).length;
  const adherenceRate = Math.round((takenCount / medicines.length) * 100);

  return (
    <div style={{background:'#f8fafc', color:'#222', fontFamily:'Inter, Arial, sans-serif', minHeight:'100vh', paddingBottom:'3rem'}}>
      {/* Header */}
      <section style={{background:'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', padding:'2rem 1rem', color:'#fff', textAlign:'center'}}>
        <h1 style={{fontSize:'2.5rem', fontWeight:800, margin:'0', marginBottom:'0.5rem'}}>Dashboard</h1>
        <p style={{fontSize:'1.1rem', margin:'0', color:'#e0e7ff'}}>Manage your medications and track adherence</p>
      </section>

      {/* Stats Overview */}
      <section style={{maxWidth:'1200px', margin:'3rem auto', padding:'0 1rem'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1.5rem', marginBottom:'3rem'}}>
          <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', textAlign:'center'}}>
            <div style={{fontSize:'2.5rem', fontWeight:800, color:'#2563eb', marginBottom:'0.5rem'}}>{medicines.length}</div>
            <p style={{color:'#666', fontWeight:600, margin:'0'}}>Total Medicines</p>
          </div>
          <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', textAlign:'center'}}>
            <div style={{fontSize:'2.5rem', fontWeight:800, color:'#22c55e', marginBottom:'0.5rem'}}>{takenCount}/{medicines.length}</div>
            <p style={{color:'#666', fontWeight:600, margin:'0'}}>Today's Progress</p>
          </div>
          <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', textAlign:'center'}}>
            <div style={{fontSize:'2.5rem', fontWeight:800, color:'#0369a1', marginBottom:'0.5rem'}}>{adherenceRate}%</div>
            <p style={{color:'#666', fontWeight:600, margin:'0'}}>Adherence Rate</p>
          </div>
          <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', textAlign:'center'}}>
            <div style={{fontSize:'2rem', margin:'0', marginBottom:'0.5rem'}}>🎯</div>
            <p style={{color:'#666', fontWeight:600, margin:'0'}}>On Track</p>
          </div>
        </div>
      </section>

      {/* Medicine List */}
      <section style={{maxWidth:'1200px', margin:'0 auto', padding:'0 1rem', marginBottom:'3rem'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
          <h2 style={{fontSize:'1.8rem', fontWeight:700, color:'#2563eb', margin:'0'}}>Today's Medicines</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{background:'#22c55e', color:'#fff', border:'none', padding:'0.8rem 1.5rem', borderRadius:'6px', fontWeight:600, cursor:'pointer', transition:'all 0.3s ease'}}
            onMouseOver={(e) => e.currentTarget.style.background = '#16a34a'}
            onMouseOut={(e) => e.currentTarget.style.background = '#22c55e'}
          >
            + Add Medicine
          </button>
        </div>

        {/* Add Medicine Form */}
        {showAddForm && (
          <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginBottom:'2rem'}}>
            <h3 style={{color:'#2563eb', marginBottom:'1.5rem'}}>Add New Medicine</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1rem', marginBottom:'1rem'}}>
              <input
                type="text"
                placeholder="Medicine Name"
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                style={{padding:'0.8rem', borderRadius:'6px', border:'1px solid #e5e7eb', fontFamily:'inherit', fontSize:'1rem'}}
              />
              <input
                type="text"
                placeholder="Dose (e.g., 100mg)"
                value={newMedicine.dose}
                onChange={(e) => setNewMedicine({...newMedicine, dose: e.target.value})}
                style={{padding:'0.8rem', borderRadius:'6px', border:'1px solid #e5e7eb', fontFamily:'inherit', fontSize:'1rem'}}
              />
              <input
                type="time"
                value={newMedicine.time}
                onChange={(e) => setNewMedicine({...newMedicine, time: e.target.value})}
                style={{padding:'0.8rem', borderRadius:'6px', border:'1px solid #e5e7eb', fontFamily:'inherit', fontSize:'1rem'}}
              />
            </div>
            <div style={{display:'flex', gap:'1rem'}}>
              <button
                onClick={handleAddMedicine}
                style={{background:'#22c55e', color:'#fff', border:'none', padding:'0.8rem 1.5rem', borderRadius:'6px', fontWeight:600, cursor:'pointer'}}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                style={{background:'#e5e7eb', color:'#222', border:'none', padding:'0.8rem 1.5rem', borderRadius:'6px', fontWeight:600, cursor:'pointer'}}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Medicine Cards */}
        <div style={{display:'grid', gap:'1rem'}}>
          {medicines.map(medicine => (
            <div 
              key={medicine.id}
              style={{
                background:'#fff', 
                padding:'1.5rem', 
                borderRadius:'10px', 
                boxShadow:'0 2px 8px rgba(0,0,0,0.04)',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                border:`2px solid ${medicine.taken ? '#22c55e' : '#e5e7eb'}`
              }}
            >
              <div>
                <h3 style={{color:'#2563eb', margin:'0 0 0.5rem 0', fontSize:'1.2rem'}}>{medicine.name}</h3>
                <div style={{display:'flex', gap:'1rem', color:'#666', fontSize:'0.95rem'}}>
                  <span>💊 {medicine.dose}</span>
                  <span>⏰ {medicine.time}</span>
                </div>
              </div>
              <button
                onClick={() => handleMarkAsTaken(medicine.id)}
                style={{
                  background:medicine.taken ? '#22c55e' : '#e5e7eb',
                  color:medicine.taken ? '#fff' : '#222',
                  border:'none',
                  padding:'0.8rem 1.5rem',
                  borderRadius:'6px',
                  fontWeight:600,
                  cursor:'pointer',
                  transition:'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (!medicine.taken) {
                    e.currentTarget.style.background = '#d1d5db';
                  }
                }}
                onMouseOut={(e) => {
                  if (!medicine.taken) {
                    e.currentTarget.style.background = '#e5e7eb';
                  }
                }}
              >
                {medicine.taken ? '✓ Taken' : 'Mark as Taken'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{maxWidth:'1200px', margin:'0 auto', padding:'0 1rem', marginBottom:'3rem'}}>
        <h2 style={{fontSize:'1.8rem', fontWeight:700, color:'#2563eb', marginBottom:'2rem'}}>Quick Actions</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1.5rem'}}>
          <div style={{background:'#e0f2fe', padding:'2rem', borderRadius:'10px', textAlign:'center', cursor:'pointer', transition:'all 0.3s ease'}}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>📊</div>
            <h3 style={{color:'#0369a1', marginBottom:'0.3rem'}}>View Reports</h3>
            <p style={{color:'#0c4a6e', fontSize:'0.9rem'}}>Check weekly adherence reports</p>
          </div>
          <div style={{background:'#fce7f3', padding:'2rem', borderRadius:'10px', textAlign:'center', cursor:'pointer', transition:'all 0.3s ease'}}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>👨‍⚕️</div>
            <h3 style={{color:'#be185d', marginBottom:'0.3rem'}}>Contact Doctor</h3>
            <p style={{color:'#831843', fontSize:'0.9rem'}}>Send reports to your doctor</p>
          </div>
          <div style={{background:'#f0fdf4', padding:'2rem', borderRadius:'10px', textAlign:'center', cursor:'pointer', transition:'all 0.3s ease'}}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>⚙️</div>
            <h3 style={{color:'#15803d', marginBottom:'0.3rem'}}>Settings</h3>
            <p style={{color:'#14532d', fontSize:'0.9rem'}}>Customize your preferences</p>
          </div>
          <div style={{background:'#fefce8', padding:'2rem', borderRadius:'10px', textAlign:'center', cursor:'pointer', transition:'all 0.3s ease'}}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>💬</div>
            <h3 style={{color:'#b45309', marginBottom:'0.3rem'}}>Support</h3>
            <p style={{color:'#78350f', fontSize:'0.9rem'}}>Get help from our team</p>
          </div>
        </div>
      </section>

      {/* Caregiver Info */}
      <section style={{maxWidth:'1200px', margin:'0 auto', padding:'0 1rem', marginBottom:'3rem'}}>
        <h2 style={{fontSize:'1.8rem', fontWeight:700, color:'#2563eb', marginBottom:'2rem'}}>Caregivers</h2>
        <div style={{background:'#fff', padding:'2rem', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          <p style={{color:'#666', marginBottom:'1.5rem'}}>Allow your caregivers to monitor your medication adherence:</p>
          <button style={{background:'#2563eb', color:'#fff', border:'none', padding:'0.8rem 2rem', borderRadius:'6px', fontWeight:600, cursor:'pointer', transition:'all 0.3s ease'}}
            onMouseOver={(e) => e.currentTarget.style.background = '#1e40af'}
            onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
          >
            Add Caregiver
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
