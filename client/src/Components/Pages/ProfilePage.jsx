import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../redux/firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
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
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
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
          <button onClick={() => handleListingDelete  (listing._id)} className='text-red-700 uppercase'>Delete</button>
          <Link to={`/update-listing/${listing._id}`}>
          <button className='text-green-700 uppercase'>Edit</button>
          </Link>
        </div>
    </div>)}
      </div>}
    </div>
  );
}
