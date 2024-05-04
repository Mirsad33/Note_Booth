const express = require('express');
const app = express();
const PORT = 3333;
const apiRoutes = require('./routes/api_routes');
// const fs = require('fs');
const path = require('path'); // Import the path module


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use API Routes
app.use('/api', apiRoutes);

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// DELETE route handler
// app.delete('/api/notes/:id', (req, res) => {
//     const idToDelete = req.params.id;

//     res.send(`Deleted note with ID ${idToDelete}`);
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
