import React, { useState, useEffect } from 'react';
import './AddEvent.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';


const localizer = momentLocalizer(moment);

const AddEvent = () => {
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
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
  
        if (selectEvent) {
          const updatedEvent = {
            event_title: eventTitle,
            event_date: formattedDate,
          };
          await axios.put(`https://u-pick-up-y7qnw.ondigitalocean.app/api/events/${selectEvent.id}`, updatedEvent);
        } else {
          const newEvent = {
            event_title: eventTitle,
            event_date: formattedDate,
          };
          await axios.post("https://u-pick-up-y7qnw.ondigitalocean.app/api/events", newEvent);
        }
  
        // Refetch events after saving/updating
        fetchEvents();
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
    setShowModal(true);
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
      <div className='calendar-container'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ width: '100%', height: '100%' }}
          selectable={true}
          onSelectSlot={handleSelectedSlot}
          onSelectEvent={handleSelectedEvent}
        />

{showModal && (
          <div className="modal">  
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
                  <label htmlFor="eventTitle" className='form-label'>Set Announcements:</label>
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
export default AddEvent
