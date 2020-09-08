import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listEvents } from './graphql/queries';
import { createEvent as createEventMutation, deleteEvent as deleteEventMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const apiData = await API.graphql({ query: listEvents });
    setEvents(apiData.data.listEvents.items);
  }

  async function createEvent() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createEventMutation, variables: { input: formData } });
    setEvents([ ...events, formData ]);
    setFormData(initialFormState);
  }

  async function deleteEvent({ id }) {
    const newEventsArray = events.filter(event => event.id !== id);
    setEvents(newEventsArray);
    await API.graphql({ query: deleteEventMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Events App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Event name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Event description"
        value={formData.description}
      />
      <button onClick={createEvent}>Create Event</button>
      <div style={{marginBottom: 30}}>
        {
          events.map(event => (
            <div key={event.id || event.name}>
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <button onClick={() => deleteEvent(event)}>Delete event</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);