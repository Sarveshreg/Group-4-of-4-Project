



import React, { useEffect, useState } from 'react';
import EventMap from './EventMap'; 
import axios from 'axios';

function Home() {
  const [events, setEvents] = useState([]);
  let API_Link=import.meta.env.VITE_API_LINK;


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_Link+'events');
        setEvents(response.data); // Adjust based on your actual API response structure
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (

    <div className='main'>
      <h1>Events Near You</h1>

      {/* Ensure events are passed down as props */}
      <EventMap events={events} />
    </div>
  );
}

export default Home;


