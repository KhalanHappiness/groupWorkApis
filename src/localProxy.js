// local-proxy.js
// The local proxy creates a server that acts as a middleman. My frontend makes requests to the local server, which then makes the request to findwork.dev and returns the response.
const express = require('express');
//This imports the Express.js framework, which is a popular web application framework for Node.js.
const cors = require('cors');
//This imports the CORS (Cross-Origin Resource Sharing) middleware package.

const axios = require('axios');
//We're using it to make HTTP requests from our server to the FindWork API.
const app = express();
//This creates a new Express application instance.
const PORT = 3000;
//Defines which port our server will listen on.

// Enable CORS for all routes
app.use(cors());

// Serve your static files the HTML CSS and Javascript
app.use(express.static('public'));

// creates Proxy endpoint to access the FindWork API
app.get('/proxy/jobs', async (req, res) => {
  try {
    const search = req.query.search || '';

    //Makes a GET request to the FindWork API using axios.
    const response = await axios.get(
      `https://findwork.dev/api/jobs/?search=${encodeURIComponent(search)}`,
      //encodeURIComponent(search) ensures the search query is properly URL-encoded.
      {
        //We include the Authorization header with the API token.
        headers: {
          'Authorization': 'Token b41a2503911de9f433317e7d6b97a14de8c16f07'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    //Log the error message to the console for debugging
    //Send a 500 (Internal Server Error) status code
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Local proxy server running at http://localhost:${PORT}`);
  //Starts the server, making it listen on the specified port (3000).
});