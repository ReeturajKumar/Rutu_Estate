import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../CSS/Profile.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../Firebase';
import { updateUserStart, UpdateuserSuccess, UpdateuserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../../redux/userSlice';

export default function ProfilePage() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [fileperc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(UpdateuserFailure(data.message));
        return;
      }
      dispatch(UpdateuserSuccess(data));
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      dispatch(UpdateuserFailure(error.message));
    }
  };


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  return (
    <div className='profile-container'>
      <h1 className='profile-title'>Profile</h1>
      <form onSubmit={handleSubmit} className='profile-form'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='profile-avatar'
        />
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
        <input
          type='text'
          placeholder='Your Username'
          defaultValue={currentUser.username}
          id='username'
          className='profile-input'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Your email'
          defaultValue={currentUser.email}
          id='email'
          className='profile-input'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Your password'
          id='password'
          className='profile-input'
          onChange={handleChange}
        />
        <button disabled={loading} className='btn'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <div className='flex-container'>
        <span onClick={handleDeleteUser} className='delete-account'>Delete account</span>
        <span className='sign-out'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 pt-1'>
        {updateSuccess ? `Updated Successfully` : ''}
      </p>
    </div>
  );
}
