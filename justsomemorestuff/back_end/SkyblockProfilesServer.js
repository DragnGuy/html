require('dotenv').config();
const express = require('express');
const pako = require('pako');
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
     
      let inventoryBase64 = profileResponse.data.profile.members[uuid].inventory.inv_contents;

      // get the base64 string from the inventoryBase64 response
      let base64 = inventoryBase64.data; 
      let Base64StringForFormating = String(base64);

      //function for deciding base64 string
      function decodeAndDecompress(Base64StringForFormating) {
          // Convert Base64 string to binary data
          let binaryString = atob(Base64StringForFormating);

          // Convert binary string to Uint8Array
          let len = binaryString.length;
          let bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
              bytes[i] = binaryString.charCodeAt(i);
          }

          // Decompress the data using pako
          let decompressedData = pako.inflate(bytes);

          // Convert decompressed data to a string (assuming it's text data)
          let decompressedString = new TextDecoder().decode(decompressedData);
          return decompressedString;
      }
      let rundecode = decodeAndDecompress(Base64StringForFormating);

      let CompleteString = (rundecode);
      console.log("complete string", CompleteString);
      let formattedstring = CompleteString.slice(1);  // the slice is deleting the first line in the response
      console.log("formatted string", formattedstring);







      res.json(CompleteString); // Send profile decompressd data as JSON response
      // previously the backend sent all the profile data to the front end using "res.json(profileResponse);"
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
