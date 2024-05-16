import React, { useState } from 'react';
import '../CSS/Listing.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from './../../firebase';

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    sell: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 1,
    discountPrice: 1,
    imageUrl: [],
  });
  const [imageUploadError, setImageUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImage = async (e) => {
    if (files.length > 0 && files.length + formData.imageUrl.length <= 6) {
      setUploading(true);
      setImageUploadError('');
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrl: [...prevFormData.imageUrl, ...urls],
          }));
          setImageUploadError('');
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2mb max size!)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDelete = (index) => (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrl: prevFormData.imageUrl.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
    console.log('Form submitted:', formData);
  };

  return (
    <main className='container'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            value={formData.address}
            onChange={handleChange}
          />

          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sell' className='w-5' checked={formData.sell} onChange={handleChange} />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' checked={formData.rent} onChange={handleChange} />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' checked={formData.parking} onChange={handleChange} />
              <span>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' checked={formData.furnished} onChange={handleChange} />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' checked={formData.offer} onChange={handleChange} />
              <span>Offer</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <p>Bedroom</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                value={formData.bathrooms}
                onChange={handleChange}
              />
              <p>Bathroom</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1'
                required
                className='p-3 border border-gray-300 rounded-lg'
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='1'
                required
                className='p-3 border border-gray-300 rounded-lg'
                value={formData.discountPrice}
                onChange={handleChange}
              />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-700 ml-2'>The First image will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />

            <button
              type='button'
              onClick={handleImage}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
          {formData.imageUrl.length > 0 &&
            formData.imageUrl.map((url, index) => (
              <div key={url} className='flex justify-between p-3 border items-center'>
                <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg uppercase hover:opacity-95' />
                <button
                  type='button'
                  disabled={uploading}
                  onClick={handleDelete(index)}
                  className='p-3 text-red-700 rounded-lg hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button type='submit' className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
