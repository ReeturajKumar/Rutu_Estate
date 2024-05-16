import React from 'react'
import '../CSS/Listing.css'

export default function CreateListing() {
  return (
    <main class='container'>
   <h1 class='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form class='flex flex-col sm:flex-row gap-4'>
      <div class="flex flex-col gap-4 flex-1">
        <input type='text' placeholder='Name' class='border p-3 rounded-lg ' id='name'  maxLength='62' minLength='10' required/>
        <textarea placeholder='Description' class='border p-3 rounded-lg ' id='desc'></textarea>
        <input type='text' placeholder='address' class='border p-3 rounded-lg ' id='address' required/>
  
        <div class=" flex gap-6 flex-wrap">
          <div class="elex gap-2">
            <input type='checkbox' id='sell' class='w-5'/>
            <span>Sell</span>
          </div>
          <div class="elex gap-2">
            <input type='checkbox' id='rent' class='w-5'/>
            <span>Rent</span>
          </div>
          <div class="elex gap-2">
            <input type='checkbox' id='parking' class='w-5'/>
            <span>Parking Spot</span>
          </div>
          <div class="elex gap-2">
            <input type='checkbox' id='furnished' class='w-5'/>
            <span>Furnished</span>
          </div>
          <div class="elex gap-2">
            <input type='checkbox' id='offer' class='w-5'/>
            <span>Offer</span>
          </div>
        </div>
  
        <div class="flex flex-wrap gap-6">
          <div class="flex items-center gap-2">
            <input type='number' id='bedrooms' min='1' max='10' required class='p-3 border border-gray-300 rounded-lg'/>
            <p>Bedroom</p>
          </div>
          <div class="flex items-center gap-2">
            <input type='number' id='bathrooms' min='1' max='10' required class='p-3 border border-gray-300 rounded-lg'/>
            <p>Bathroom</p>
          </div>
          <div class="flex items-center gap-2">
            <input type='number' id='regularPrice' min='1' max='10' required class='p-3 border border-gray-300 rounded-lg'/>
            <div className='flex flex-col items-center'>
            <p>Regular Price</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input type='number' id='discountPrice' min='1' max='10' required class='p-3 border border-gray-300 rounded-lg'/>
            <div className='flex flex-col items-center'>
            <p>Discounted Price</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'>Images:
         <span className='font-normal text-gray-700 ml-2'>The First image will be the cover (max 6) </span>
        </p>
        <div className='flex gap-4'>
          <input className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple />
          <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
        </div>
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
      </div>
    </form>
</main>
  )
}
