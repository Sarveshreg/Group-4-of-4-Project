
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  let [profileData, setProfileData] = useState(null);
  let [createdEvents, setCreatedEvents] = useState(null);
  let [RsvpEvents, setRsvpEvents] = useState(null);
  let [error, setError] = useState(null);
  let [rsvpError, setRsvpError] = useState(false);
  let [rsvpCancel, setRsvpCancel] = useState(false);
  let [eventCancel, setEventCancel] = useState(false);
  let token=useSelector((state)=>state.auth.token);
  let id=useSelector((state)=>state.auth.user.id);
  let navigate = useNavigate();
  let API_Link=import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${API_Link}users/${id}`,{
          method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`     //provide the token 
        }}); 
        let data=await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch user profile');
      }
    };

    const fetchCreatedEvents = async () => {
      try {
        const response = await fetch(`${API_Link}users/${id}/events`,{
          method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`     //provide the token 
        }}); 
        let data=await response.json();
        if(!data.message){
        setCreatedEvents(data);
        }
        else{
          setCreatedEvents(null);
        }
      } catch (error) {
        setError(error.message || 'Failed to fetch user profile');
      }
    };

    const fetchRsvpEvent = async () => {
      try {
        const response = await fetch(`${API_Link}rsvp`,{
          method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`     //provide the token 
        }}); 
        let data=await response.json();
        if(!data.message){
          setRsvpEvents(data);
        }
      } catch (error) {
        setError(error.message || 'Failed to fetch user profile');
      }
    };

    fetchProfileData();
    fetchCreatedEvents();
    fetchRsvpEvent();

    return () => {
      
    };
  }, [rsvpError,rsvpCancel,eventCancel]);

  let eventDetail=(n)=>{
    navigate(`/event/${n}`)
  }

  let cancelRsvp= async (eventId)=>{
    setRsvpError(true);
    try {
      let response= await fetch(`${API_Link}rsvp/${eventId}`,{
      method:"DELETE",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`     //provide the token 
      },
      })
      let result=await response.json();
      if(result.eventID==eventId){
        setRsvpError(false);
        setRsvpCancel(true);
      }
      else{
        //
      }
      
    } catch (error) {
        console.error(error);
    }
  }

  let deleteEvent=async(eventId)=>{
    setEventCancel(false)
    try {
      let response= await fetch(`${API_Link}events/${eventId}`,{
        method:"DELETE",
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`     //provide the token 
        },
        })
        let result=await response.json();
        if(result.result){
          alert("Event deleted!");
          setEventCancel(true)
        }

    } catch (error) {
      console.log(error)
    }
  }

  if(!token){
    return(
      <h2>Access Denied</h2>
    )
  }

  return (
    <div className='main'>
      <h1>User Profile</h1>
      {/* {!token && <p>No token</p>} */}
      {error && <div>Error: {error}</div>}
      {profileData && (
        <div>
          <div className='user_detail_card'>
            <img src={profileData.ProfilePic} alt="prifile image" height={200} width={200} />
            <p><span className='user_detail'>Email: </span> {profileData.Email}</p>
            <p><span className='user_detail'>First Name: </span>{profileData.FirstName}</p>
            <p><span className='user_detail'>Last Name: </span>{profileData.LastName}</p>
            <p><span className='user_detail'>Location: </span>{profileData.ZipCode}</p>
          </div>
          {/* Display events created */}
          <h3>Events Created</h3>
          <ul className='event_list'>
            {!createdEvents && <p>NO Event Created!</p>}
            {createdEvents && createdEvents.map(event => (
              <li className='list_title' key={event.id}>{event.EventTitle}<button className="cancel" onClick={(e)=>deleteEvent(event.id)}>Delete</button> <button className="btn" onClick={(e)=>eventDetail(event.id)}>Detail</button></li>
            ))}
          </ul>

          {/* Display events RSVP'd */}
          <h3>Events RSVP'd</h3>
          {rsvpError && <p>Unable to cancel RSVP!</p>}
          {rsvpCancel && <p>RSVP Cancelled!</p>}
          <ul className='event_list'>
            {RsvpEvents && RsvpEvents.map(event => (
              <li className='list_title' key={event.eventID}>{event.event.EventTitle} {(event.event.CreatorId!=id) && <button className="cancel" onClick={(e)=>{cancelRsvp(event.eventID)}}>Cancel RSVP</button>} <button className="btn" onClick={(e)=>eventDetail(event.eventID)}>Detail</button></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Profile() {
//   const [profileData, setProfileData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get('/api/profile/123'); // Replace '123' with the actual user ID
//         setProfileData(response.data);
//       } catch (error) {
//         setError(error.message || 'Failed to fetch user profile');
//       }
//     };

//     fetchProfileData();

//     return () => {
      
//     };
//   }, []);

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {error && <div>Error: {error}</div>}
//       {profileData && (
//         <div>
//           <p>Username: {profileData.username}</p>
//           <p>Email: {profileData.email}</p>
//           <p>Location: {profileData.location}</p>

//           {/* Display events created */}
//           <h3>Events Created</h3>
//           <ul>
//             {profileData.eventsCreated.map(event => (
//               <li key={event.id}>{event.name}</li>
//             ))}
//           </ul>

//           {/* Display events RSVP'd */}
//           <h3>Events RSVP'd</h3>
//           <ul>
//             {profileData.eventsRSVPd.map(event => (
//               <li key={event.id}>{event.name}</li>
//             ))}
//           </ul>

//           {/* Display current connections */}
//           <h3>Current Connections</h3>
//           <ul>
//             {profileData.connections.map(connection => (
//               <li key={connection.id}>{connection.name}</li>
//             ))}
//           </ul>

//           {/* Display connection requests */}
//           <h3>Connection Requests</h3>
//           <ul>
//             {profileData.connectionRequests.map(request => (
//               <li key={request.id}>{request.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;
