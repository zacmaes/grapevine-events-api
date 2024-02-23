import express from 'express';
import events from './events.mjs';
import cors from 'cors';

const app = express();
const port = 8081;  // Port to listen on

// Use CORS middleware
app.use(cors());

// Get all events
app.get('/events', (req, res) => {
    res.status(200).json(events);
});

// Get events by name
app.get('/events/:name', (req, res) => {
    const { name } = req.params;  // uses parameter destructuring to get the name parameter from the request

    const eventName = name.replace(/-/g, ' ').toLowerCase();  // Replace hyphens with spaces and convert to lowercase

    const matchingEvents = events.filter(event => event.name.toLowerCase() === eventName);  // Filter events to include all that match the given name, case-insensitively

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