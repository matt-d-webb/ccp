import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listEvents } from './graphql/queries';
import { createEvent as createEventMutation, deleteEvent as deleteEventMutation } from './graphql/mutations';
import Header from './Header';
import EventCard from './EventCard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './App.css';

const initialFormState = { name: '', description: '' }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
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
    setEvents([...events, formData]);
    setFormData(initialFormState);
  }

  async function deleteEvent({ id }) {
    const newEventsArray = events.filter(event => event.id !== id);
    setEvents(newEventsArray);
    await API.graphql({ query: deleteEventMutation, variables: { input: { id } } });
  }

  return (
    <Container maxWidth="md">
      <Header title="Blog" />

      <Grid container spacing={1}>
        <TextField
          onChange={e => setFormData({ ...formData, 'name': e.target.value })}
          label="name"
          value={formData.name}
          placeholder="Event name"
          variant="outlined"
          size="small"
        />

        <TextField
          onChange={e => setFormData({ ...formData, 'description': e.target.value })}
          label="description"
          value={formData.description}
          placeholder="Event description"
          variant="outlined"
          size="small"
        />

        <Button variant="outlined" size="small" onClick={createEvent}>Create Event</Button>
        </Grid>
        <br />
        <Grid container spacing={1}>
          
          {
            events.map(event => (
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <EventCard key={event.id || event.name} name={event.name} description={event.description} />
                </Paper>
              </Grid>
            ))
          }
        </Grid>
        <AmplifySignOut />
 

    </Container>
  );
}

export default withAuthenticator(App);