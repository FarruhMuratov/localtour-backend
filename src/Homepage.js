import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from './firebase.js';
import Dashboard from './Auth/Dashboard';

function Homepage() {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handlePhoneSignIn = async () => {
    try {
      console.log('Phone number:', phoneNumber);
      console.log('Auth instance:', auth);
      
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: (response) => {
          console.log('reCAPTCHA solved:', response);
        }
      });
      
      console.log('Sending SMS...');
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      console.log('SMS sent successfully', confirmation);
      
    } catch (error) {
      console.error('Detailed error:', error.code, error.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Authentication</h1>
      
      {user ? (
        <Dashboard user={user} />
      ) : (
        <div>
          <button onClick={handleGoogleSignIn} style={{ display: 'block', margin: '10px 0' }}>
            Sign in with Google
          </button>
          
          <input 
            type="tel" 
            placeholder="Phone Number" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ display: 'block', margin: '10px 0', padding: '8px' }}
          />
          <button onClick={handlePhoneSignIn} style={{ display: 'block', margin: '10px 0' }}>
            Sign in with Phone
          </button>
          
          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
