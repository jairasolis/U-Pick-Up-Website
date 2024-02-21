import React, { useState, useEffect } from 'react';
import './Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const StudentCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://admin-api.example.com/api/events'); // Replace with the admin's API endpoint
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className='calendar-page'>
      <div style={{height:'500px'}}> 
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: '50px'}}
          selectable={false}
        />
      </div>
      <div className='events-container'>
        <h2>Announcements</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.event_title} - {moment(event.event_date).format('MMMM Do YYYY, h:mm a')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentCalendar;
