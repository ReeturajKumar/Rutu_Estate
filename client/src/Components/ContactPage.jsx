import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        if (!res.ok) {
          throw new Error('Failed to fetch landlord data');
        }
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const subject = `Regarding ${listing.name}`;
  const body = message;

  return (
    <>
      {error && <p className='text-red-500'>{error}</p>}
      {landlord ? (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username.toLowerCase()}</span> for{' '}
            <span className='font-semibold'>{listing.name.toUpperCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='5'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
            className='bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      ) : (
        <p>Loading landlord details...</p>
      )}
    </>
  );
}
