import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setsidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  console.log(listing)

  useEffect(() => {
    const urlparams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlparams.get('searchTerm');
    const typefromUrl = urlparams.get('type');
    const parkingfromUrl = urlparams.get('parking');
    const furnishedfromUrl = urlparams.get('furnished');
    const offerfromUrl = urlparams.get('offer');
    const sortfromUrl = urlparams.get('sort');
    const orderfromUrl = urlparams.get('order');

    if (
      searchTermFromUrl ||
      typefromUrl ||
      parkingfromUrl ||
      furnishedfromUrl ||
      offerfromUrl ||
      sortfromUrl ||
      orderfromUrl
    ) {
      setsidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typefromUrl || 'all',
        parking: parkingfromUrl === 'true',
        furnished: furnishedfromUrl === 'true',
        offer: offerfromUrl === 'true',
        sort: sortfromUrl || 'created_at',
        order: orderfromUrl || 'desc',
      });
    }

    const fetchListing = async () => {
      setLoading(true);
      try {
        const searchQuery = new URLSearchParams(sidebardata).toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [window.location.search]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (type === 'checkbox') {
      setsidebardata({ ...sidebardata, [id]: checked });
    } else if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setsidebardata({ ...sidebardata, sort, order });
    } else if (type === 'radio' && id === 'type') {
      setsidebardata({ ...sidebardata, type: value });
    } else {
      setsidebardata({ ...sidebardata, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebardata);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b-2 p-7 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <label className="whitespace-nowrap font-semibold" htmlFor="searchTerm">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-3">
              <input
                type="radio"
                id="type"
                name="type"
                value="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-3">
              <input
                type="radio"
                id="type"
                name="type"
                value="sell"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === 'sell'}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-3">
              <input
                type="radio"
                id="type"
                name="type"
                value="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <span>Rent</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-semibold" htmlFor="sort_order">Sort:</label>
            <select
              onChange={handleChange}
              value={`${sidebardata.sort}_${sidebardata.order}`}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="created_at_desc">Oldest</option>
              <option value="created_at_asc">Latest</option>
            </select>
          </div>
          <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95">Search</button>
        </form>
      </div>
      <div className="flex flex-col p-7 w-full">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">Listing results:</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {listing.length > 0 ? (
              <ul>
                {listing.map((item) => (
                  <li key={item.id} className="border-b p-3">
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No listings found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
