
import React from 'react';
import SectionIcon from '../components/SectionIcon';



const Contact = () => {
  return (
    <div style={{background:'#fff', color:'#222', fontFamily:'Inter, Arial, sans-serif'}}>
      <section className="section card" style={{background:'#f8fafc', borderRadius:'12px', margin:'2rem auto', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
        <SectionIcon icon="📞" label="Contact Us" />
        <form style={{display:'flex',flexDirection:'column',gap:'1rem',maxWidth:'400px',margin:'0 auto'}}>
          <input type="text" placeholder="Your Name" style={{padding:'0.7rem',borderRadius:'6px',border:'1px solid #e5e7eb',background:'#fff',color:'#222'}} />
          <input type="email" placeholder="Your Email" style={{padding:'0.7rem',borderRadius:'6px',border:'1px solid #e5e7eb',background:'#fff',color:'#222'}} />
          <textarea placeholder="Message" rows={4} style={{padding:'0.7rem',borderRadius:'6px',border:'1px solid #e5e7eb',background:'#fff',color:'#222'}} />
          <button type="submit" className="cta-btn" style={{background:'#22c55e', color:'#fff', border:'none'}}>Send</button>
        </form>
        <SectionIcon icon="✉️" label="Other Ways to Reach Us" />
        <div style={{marginTop:'2rem',textAlign:'center'}}>
          <p>Email: <a href="mailto:info@medsync.com" style={{color:'#2563eb'}}>info@medsync.com</a></p>
          <p>Phone: <a href="tel:+1234567890" style={{color:'#2563eb'}}>+1 234 567 890</a></p>
          <SectionIcon icon="🌐" label="Social Media" />
          <div style={{marginTop:'1rem'}}>
            <a href="#" style={{marginRight:'1rem', color:'#2563eb'}}>Twitter</a>
            <a href="#" style={{marginRight:'1rem', color:'#2563eb'}}>LinkedIn</a>
            <a href="#" style={{color:'#2563eb'}}>Facebook</a>
          </div>
        </div>
      </section>
      <footer style={{textAlign:'center',color:'#2563eb',marginTop:'2rem',padding:'1rem 0'}}>
        &copy; {new Date().getFullYear()} Med-Sync. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
