import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import Listingitem from './Listingitem';
import Footer from './Footer';

export default function HomePage() {
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  SwiperCore.use([Navigation]);


  const fetchOfferListings = async () => {
    try {
      const res = await fetch('/api/listing/get?offer=true&limit=4');
      const data = await res.json();
      setOfferListings(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchRentListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=rent&limit=4');
      const data = await res.json();
      setRentListings(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchSaleListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=sell&limit=4');
      const data = await res.json();
      setSellListings(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Discover and <span className="text-slate-500">Secure</span> <br />
          Your Ideal Home Easily
        </h1>
        <div className="text-gray-400 text-s sm:text-sm">
          <p>
            Discover a seamless experience in finding your new home. Whether you're looking to buy or rent, our platform offers a wide selection<br/> of properties, user-friendly tools, and expert guidance to make your real estate journey smooth and stress-free.
          </p>
        </div>
        <Link to={'/search'} className="text-s sm:text-sm text-green-800 font-bold">
          Let's get Started...
        </Link>
      </div>
      <Swiper navigation>
        {offerListings.map((listing) =>(
        <SwiperSlide key={listing._id}>
          <div
          style={{
          background: `url(${listing.imageUrl[0]}) center no-repeat`,
          backgroundSize: "cover",
        }}
        className="h-[500px]"
      ></div>
    </SwiperSlide>
  ))}
</Swiper>
<div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
  {offerListings && offerListings.length > 0 && (
    <div className="">
      <div className="my-3">
        <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
        <Link className='text-sm text-green-800' to={"/search?offer=true"}>Show more offers</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {offerListings.map((listing) => (
          <Listingitem listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  )}
    {rentListings && rentListings.length > 0 && (
    <div className="">
      <div className="my-3">
        <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
        <Link className='text-sm text-green-800' to={"/search?type=rent"}>Show more places for rent</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {rentListings.map((listing) => (
          <Listingitem listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  )}
    {sellListings && sellListings.length > 0 && (
    <div className="">
      <div className="my-3">
        <h2 className='text-2xl font-semibold text-slate-600'>Recent place for sell</h2>
        <Link className='text-sm text-green-800' to={"/search?type=sell"}>Show more places for sell</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {sellListings.map((listing) => (
          <Listingitem listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  )}
</div>
<Footer/>
    </div>
  );
}
