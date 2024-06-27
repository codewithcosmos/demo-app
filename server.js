const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, 'client')));

// Default route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'index.html'));
});

// Route to serve features.html
app.get('/features', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'features.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
