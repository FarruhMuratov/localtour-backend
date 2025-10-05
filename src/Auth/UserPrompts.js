import React, { useState, useEffect } from 'react';
import './UserPrompts.css';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function UserPrompts() {
  const [prompts, setPrompts] = useState([]);
  const [promptInput, setPromptInput] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handlePromptSubmit = async () => {
    if (promptInput.trim() && user) {
      setPrompts([...prompts, { question: promptInput, answer: 'Loading...' }]);
      
      try {
        // Use different URLs for development vs production
        const askGeminiUrl = process.env.NODE_ENV === 'development' 
          ? 'http://127.0.0.1:5001/localtour-backend/us-central1/ask_gemini'
          : 'https://ask-gemini-rps5274z2q-uc.a.run.app';
        
        const extractHintsUrl = process.env.NODE_ENV === 'development' 
          ? 'http://127.0.0.1:5001/localtour-backend/us-central1/extract_hints'
          : 'https://extract-hints-rps5274z2q-uc.a.run.app';
        
        // Get full answer from Gemini
        const answerResponse = await fetch(
          `${askGeminiUrl}?prompt=${encodeURIComponent(promptInput)}`
        );
        const answer = await answerResponse.text();
        
        // Extract hints from the answer
        const hintsResponse = await fetch(
          `${extractHintsUrl}?answer=${encodeURIComponent(answer)}`
        );
        const hints = await hintsResponse.text();
        
        // Save hints to Firestore
        await addDoc(collection(db, 'userChats'), {
          userId: user.uid,
          question: promptInput,
          hints: hints,
          timestamp: new Date()
        });
        
        // Update UI with full answer
        setPrompts(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { question: promptInput, answer };
          return updated;
        });
      } catch (error) {
        console.error('Error:', error);
        setPrompts(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { question: promptInput, answer: 'Error getting response' };
          return updated;
        });
      }
      
      setPromptInput('');
    }
  };

  return (
    <div className="user-prompts">
      <div className="prompt-input">
        <input 
          type="text"
          placeholder="What do you wanna know?"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
        />
        <button onClick={handlePromptSubmit}>Submit</button>
      </div>

      <div className="prompts-list">
        <h3>Your Prompts:</h3>
        {prompts.map((item, index) => (
          <div key={index} className="prompt-item">
            <p><strong>Q:</strong> {item.question}</p>
            <p><strong>A:</strong> {item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPrompts;

