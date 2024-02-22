import express from 'express';
import events from './events.mjs';

const app = express();
const port = 8081;


// Get all events
app.get('/events', (req, res) => {
    res.status(200).json(events);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});