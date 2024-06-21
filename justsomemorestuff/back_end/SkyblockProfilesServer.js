require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

//Enable CORS for all routes
app.use(cors());

// Serve static files from the frontend directory.
app.use(express.static(path.join(__dirname, '../front_end')));

// Route for serving SkyblockPlayerStats.html
app.get('/skyblock-player-stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../front_end/SkyblockPlayerStats.html'));
});

// API route for fetching player profile
app.get('/api/profile/:name', async (req, res) => {
  const Name = req.params.name;
  const key = process.env.API_KEY;

  try {
    // convert the player name to a uuid
    const NameToUUID = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${Name}`)
    const uuid = NameToUUID.data.id;
    console.log('your player uuid is:', uuid)
    

      // Fetch profiles data
      const profilesResponse = await axios.get('https://api.hypixel.net/v2/skyblock/profiles', {
        params: { key: key, uuid: uuid }
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
      const profileResponse = await axios.get('https://api.hypixel.net/v2/skyblock/profile', {
        params: { key: key, profile: selectedProfileUUID }
      });
     
      let riftinventoryBase64 = profileResponse.data.profile.members[uuid].rift.inventory.inv_contents;

      Base64StringForFormating = String(riftinventoryBase64);

      console.log('unformatted string is: ',Base64StringForFormating);

      // Extract the Base64 string from the JSON response
      let regex = /'([^']*)'/;
      let match = Base64StringForFormating.match(regex);

      console.log('match is:',match);

      // Check if a match was found and extract the string
      let formattedBase64 = match ? match[1] : null;

      // Output the result
      console.log('formattedBase64 is:',formattedBase64);  
          

      res.json(profileResponse.data); // Send profile data as JSON response
    } else {
      res.status(404).send('No selected profile found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send(error.message); // Send error message as response
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
