import React from 'react';
import { FaGithub, FaLinkedin, FaPortrait } from 'react-icons/fa';

const sections = [
  {
    title: 'Rutu Estate',
    items: ['Our Services', 'Post your Property', 'Customer Service', 'Builders in India', 'Rent Receipt', 'Customer Service']
  },
  {
    title: 'Company',
    items: ['Partners', 'Blog', 'Careers with us', 'Term & Conditions', 'Safety guide']
  },
  {
    title: 'Legal',
    items: ['Claims', 'Privacy', 'Policies', 'Contact us', 'About us']
  }
];

const items = [
  {
    name: 'Portfolio',
    icon: FaPortrait,
    link: ''
  },
  {
    name: 'Github',
    icon: FaGithub,
    link: ''
  }
];

export default function Footer() {
  return (
    <footer>
      <div className="w-full mt-24 bg-slate-200 text-black-300 py-8 px-2">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h5 className="font-bold uppercase p-3">{section.title}</h5>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i} className="py-1 px-4 text-black-500 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 pt-8 md:pt-2">
            <p className="font-bold uppercase">Subscribe to our newsletter</p>
            <p className='py-4'>
              The latest updates, articles, and resources sent to your inbox weekly
            </p>
            <form className='flex flex-col sm:flex-row relative'>
              <input type='email' placeholder='Enter your email address'  className='w-full p-3 mr-4 rounded-md mb-4'/>
              <button className='p-2 mb-5'>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-black-500">
          <p className='py-5 ml-auto'>
            2024 RUTU ESTATE, LLC. All rights reserved @Reeturaj Kumar
          </p>
        </div>
      </div>
    </footer>
  );
}
