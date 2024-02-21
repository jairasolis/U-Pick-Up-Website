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
      const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/events');
      console.log(response.data);
      setEvents(response.data.map(event => ({
        id: event.id,
        title: event.event_title,
        start: new Date(event.event_date),
        end: new Date(event.event_date),
      })));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className='calendar-page'>
      <div className='calendar-container'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ width: '100%', height: '100%' }}
          selectable={false}
        />
      </div>
    </div>
  );
};

export default StudentCalendar;
