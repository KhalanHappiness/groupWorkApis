// local-proxy.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve your static files
app.use(express.static('public'));

// Proxy endpoint for FindWork API
app.get('/proxy/jobs', async (req, res) => {
  try {
    const search = req.query.search || '';
    const response = await axios.get(
      `https://findwork.dev/api/jobs/?search=${encodeURIComponent(search)}`,
      {
        headers: {
          'Authorization': 'Token b41a2503911de9f433317e7d6b97a14de8c16f07'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Local proxy server running at http://localhost:${PORT}`);
});