import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import '../CSS/Profile.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../Firebase';

export default function ProfilePage() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [fileperc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error('Error uploading file:', error);
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
            setFileError(false); 
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
            setFileError(true);
          });
      }
    );
  };
  

  return (
    <div className='profile-container'>
      <h1 className='profile-title'>Profile</h1>
      <form className='profile-form'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className='profile-avatar' />
        <p className='text-sm self-center'>
          {fileError ? (
            <span className='text-red-700'>Image size is must be less than 2mb</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className='text-green-700'>Successfully Uploaded !</span>
          ) : (
            ''
          )}
        </p>
        <input type='text' placeholder='Your Username' id='username' className='profile-input' />
        <input type='text' placeholder='Your email' id='email' className='profile-input' />
        <input type='text' placeholder='Your password' id='password' className='profile-input' />
        <button className='btn'>Update</button>
      </form>

      <div className='flex-container'>
        <span className='delete-account'>Delete account</span>
        <span className='sign-out'>Sign out</span>
      </div>
    </div>
  );
}
