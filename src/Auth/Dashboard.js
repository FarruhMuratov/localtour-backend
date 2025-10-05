import React, { useState, useEffect } from 'react';
import UserPrompts from './UserPrompts';
import './Dashboard.css';
import { storage, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

function Dashboard({ user }) {
  const [photoURL, setPhotoURL] = useState(user.photoURL || '');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (webp, jpeg, jpg, png)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      
      // Create storage reference
      const storageRef = ref(storage, `UserPhotos/${user.uid}/${file.name}`);
      
      // Upload file
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const url = await getDownloadURL(storageRef);
      
      // Update user profile
      await updateProfile(auth.currentUser, {
        photoURL: url
      });
      
      setPhotoURL(url);
      alert('Profile image updated!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="profile-section">
        <div className="profile-image-container">
          {photoURL ? (
            <img src={photoURL} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-placeholder">
              {(user.displayName || user.email || 'U')[0].toUpperCase()}
            </div>
          )}
          <label htmlFor="image-upload" className="upload-label">
            {uploading ? '⏳' : '📷'}
          </label>
          <input
            id="image-upload"
            type="file"
            accept=".webp,.jpeg,.jpg,.png"
            onChange={handleImageUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </div>
        <p className="welcome-text">Welcome, {user.displayName || user.phoneNumber || user.email}</p>
      </div>
      <UserPrompts />
    </div>
  );
}

export default Dashboard;