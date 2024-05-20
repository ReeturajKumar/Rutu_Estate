import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../CSS/Profile.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../../firebase.js';

import { updateUserStart, UpdateuserSuccess, UpdateuserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, logoutUserStart, logoutUserFailure, logoutSuccess } from '../../redux/userSlice';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [fileperc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false)
  const [userListing, setuserListing] = useState([])
  const dispatch = useDispatch();

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


  const handleSignOut = async() => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch ('/api/auth/logout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutSuccess(data));
    } catch (error) {
      dispatch(logoutUserFailure(data.message));
    }
  }


  const handleShowListings = async () => {
    try {
      setShowListingError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false) {
        setShowListingError(true);
        return
      }
      setuserListing(data)
    } catch (error) {
      setShowListingError(true)
    }
  }



  const handleDeleteListing = async (lisingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${lisingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        return;
      }
      setuserListing((prev) => prev.filter((listing) => listing._id !== lisingId))
    } catch (error) {
      console.log(error.message)
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
            <span className='text-slate-700'>{`Uploading ${fileperc}%`}
            </span>
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
        <Link className='btn2' to={"/create-listing"}>
          Create Listing
        </Link>
      </form>

      <div className='flex-container'>
        <span onClick={handleDeleteUser} className='delete-account'>Delete account</span>
        <span onClick={handleSignOut} className='sign-out'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 pt-1'>
        {updateSuccess ? `Updated Successfully` : ''}
      </p>
      <button onClick={handleShowListings} className='text-green-700 w-full'> Show Listing
      </button>
      <p className='text-red-700 mt-5'>{showListingError ? 'Error showing listings' : ''}</p>

      {userListing && userListing.length >0 && 
      <div className=" flex flex-col gap-5">
        <h1 className='text-center mt-7 text-3xl font-semibold'>Your Listing</h1>
      {userListing.map((listing) => <div key={listing._id}
       className='border rounded-lg p-3 flex justify-between items-center gap-5' >
        <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrl[0]} alt='' className='h-20 w-20 object-contain'/>
        </Link>
        <Link className='text-slate-700 font-semibold flex-1 truncate' to={`/listing/${listing._id}`}>
          <p >{listing.name}</p>
        </Link>
        <div className="flex flex-col item-center">
          <button onClick={() => handleDeleteListing (listing._id)} className='text-red-700 uppercase'>Delete</button>
          <Link to={`/update-listing/${listing._id}`}>
          <button className='text-green-700 uppercase'>Edit</button>
          </Link>
        </div>
    </div>)}
      </div>}
    </div>
  );
}
