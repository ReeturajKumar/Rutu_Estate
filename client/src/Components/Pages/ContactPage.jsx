import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setmessage] = useState('');

  const subject = encodeURIComponent(`Regarding ${listing.name}`);
  const body = encodeURIComponent(message);

  const onChange = (e) => {
    setmessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
        <p>Contact <span className='font-semibold'>{landlord.username.toUpperCase()}</span> for <span className='font-semibold' >{listing.name.toUpperCase()}</span>
        </p>
        <textarea name='message' id='message' rows="5" value={message} onChange={onChange}
        placeholder='Enter your message here...' className='w-full border-3 rounded-lg'></textarea>
        <Link to={`mailto:${landlord.email}?subject=${subject}&body=${body}`} className='bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95'>
            Send message
          </Link>
        </div>
      )}
    </>
  );
}
