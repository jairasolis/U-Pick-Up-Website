import React, { useState, useEffect } from 'react';
import './AddEvent.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios'; // Import Axios

const localizer = momentLocalizer(moment);

export default function AddEvent() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);

  useEffect(() => {
    // Fetch events from your API when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events'); // Assuming your API endpoint is '/api/events'
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const saveEvent = async () => {
    try {
      if (eventTitle && selectedDate) {
        if (selectEvent) {
          const updatedEvent = { ...selectEvent, title: eventTitle };
          await axios.put(`/api/events/${selectEvent.id}`, updatedEvent); // Assuming you have an API endpoint for updating events
          const updatedEvents = events.map((event) =>
            event === selectEvent ? updatedEvent : event
          );
          setEvents(updatedEvents);
        } else {
          const newEvent = {
            title: eventTitle,
            start: selectedDate,
            end: moment(selectedDate).add(1, 'hours').toDate(),
          };
          await axios.post('/api/events', newEvent); // Assuming you have an API endpoint for creating events
          setEvents([...events, newEvent]);
        }
        setShowModal(false);
        setEventTitle('');
        setSelectEvent(null);
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const deleteEvent = async () => {
    try {
      if (selectEvent) {
        await axios.delete(`/api/events/${selectEvent.id}`); // Assuming you have an API endpoint for deleting events
        const updatedEvents = events.filter((event) => event !== selectEvent);
        setEvents(updatedEvents);
        setShowModal(false);
        setEventTitle('');
        setSelectEvent(null);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSelectedSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
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
          selectable={true}
          onSelectSlot={handleSelectedSlot}
          onSelectEvent={handleSelectedEvent}
        />

        {showModal && (
          <div className="modal" style={{display:'block', backgroundColor:'rgba(0,0,0,0,5', position:'fixed',top:0, bottom:0,left:0,right:0}}>  
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectEvent ? 'Edit Event' : 'Add Event'}
                  </h5>
                  <button type="button" className="btn-close" 
                    onClick={() => {
                      setShowModal(false);
                      setEventTitle('');
                      setSelectEvent(null);
                    }}
                  />
                </div>
                <div className="modal-body">
                  <label htmlFor="eventTitle" className='form-label'>Event Title:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='eventTitle'
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  {selectEvent && (
                    <button 
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={deleteEvent}
                    >
                      Delete Event
                    </button>
                  )}
                  <button type="button" onClick={saveEvent} className='btn btn-primary'>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
