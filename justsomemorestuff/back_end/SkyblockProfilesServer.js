require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
//for decompressing the base64 to gzip
const zlib = require('zlib');
const fs = require('fs');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Route for serving SkyblockPlayerStats.html
app.get('/skyblock-player-stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/SkyblockPlayerStats.html'));
});

// API route for fetching player profile
app.get('/api/profile/:uuid', async (req, res) => {
  const PlayerName = req.params.uuid;
  const key = process.env.API_KEY;
  

  try {
    // Fetch player UUID from player name
    const NameToUUIDResponse = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${PlayerName}`);

    if (!NameToUUIDResponse.data || !NameToUUIDResponse.data.id) {
      return res.status(404).send('Player not found.');
    }

    const playerUUID = NameToUUIDResponse.data.id;

    // Fetch profiles data
    const profilesResponse = await axios.get('https://api.hypixel.net/skyblock/profiles', {
      params: { key: key, uuid: playerUUID }
    });

    const data = profilesResponse.data;

    // Function to get the UUID of the currently selected profile
    function getCurrentSelectedProfileId(data) {
      for (const profile of data.profiles) {
        if (profile.selected) {
          return profile.profile_id;
        }
      }
      return null;
    }

    // Get UUID of currently selected profile
    const selectedProfileUUID = getCurrentSelectedProfileId(data);

    if (selectedProfileUUID) {
      // Fetch profile data for the selected profile
      const profileResponse = await axios.get('https://api.hypixel.net/skyblock/profile', {
        params: { key: key, profile: selectedProfileUUID }
      });
    }
    // Example Base64 encoded gzip data
    const base64Data = res.profileResponse.profile.member[PlayerName].rift.inventory.inv_content

    // Step 1: Decode Base64 string to Buffer
    const gzipBuffer = Buffer.from(base64Data, 'base64');

    // Step 2: Decompress the gzip Buffer
    zlib.gunzip(gzipBuffer, (err, decompressedBuffer) => {
        if (err) {
            console.error('Error during decompression:', err);
            return;
        }

        // Step 3: Handle the decompressed data
        const decompressedData = decompressedBuffer.toString('utf-8');

        res.json({ decompressedData }); // Send profile data as JSON response

        console.log('Data has been decompressed');
    });
  }
  // errors
 catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send(error.message); // Send error message as response
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
