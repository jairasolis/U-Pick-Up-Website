import React, { useState, useEffect } from 'react';
import './AddEvent.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

export default function AddEvent() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/events');
      console.log(response.data);
      // transform the fetched events para mag-matchy matchy sa react-big-calendar format
      const transformedEvents = response.data.map(event => ({
        id: event.id,
        title: event.event_title,
        start: new Date(event.event_date), 
        end: new Date(event.event_date), 
      }));
      setEvents(transformedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const saveEvent = async () => {
    try {
      if (eventTitle && selectedDate) {
        if (selectEvent) {
          const updatedEvent = { ...selectEvent, title: eventTitle };
          await axios.put(`https://u-pick-up-y7qnw.ondigitalocean.app/api/events/${selectEvent.id}`, updatedEvent);
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
          await axios.post('https://u-pick-up-y7qnw.ondigitalocean.app/api/events', newEvent);
          setEvents([...events, newEvent]);
        }
        setShowModal(true);
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
        await axios.delete(`https://u-pick-up-y7qnw.ondigitalocean.app/api/events/${selectEvent.id}`);
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
  setShowModal(prevShowModal => {
    console.log(prevShowModal); // This will log the previous value of showModal
    return true; // Set showModal to true
  });
  setSelectedDate(slotInfo.start);
  setSelectEvent(null);
};

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventTitle('');
    setSelectEvent(null);
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
          <div className="modal" onClick={handleModalClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectEvent ? 'Edit Event' : 'Add Event'}
                  </h5>
                  <button type="button" className="btn-close" onClick={handleModalClose} />
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
