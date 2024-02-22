import express from 'express';
import events from './events.mjs';

const app = express();
const port = 8081;


// Get all events
app.get('/events', (req, res) => {
    res.status(200).json(events);
});

// Get events by name
app.get('/events/:name', (req, res) => {
    const { name } = req.params;  //  uses parameter destructuring to get the name parameter from the request

    const eventName = name.replace(/-/g, ' ');  // Replace hyphens with spaces
    
    const matchingEvents = events.filter(event => event.name === eventName);  // Filter events to include all that match the given name

    if (matchingEvents.length === 0) {
        return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(matchingEvents);
});

// Handle non existent routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handling server errors
app.use((err, req, res, next) => {
    console.error(err); // Log error to the server's console
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});