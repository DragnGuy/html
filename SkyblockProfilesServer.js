require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Allow CORS for all domains (you can restrict it in production)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to fetch profile data
app.get('/api/profile/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const key = process.env.API_KEY;

  try {
    const profilesResponse = await axios.get(`https://api.hypixel.net/v2/skyblock/profiles`, {
      params: {
        key: key,
        uuid: uuid
      }
    });

    const data = profilesResponse.data;

    function getCurrentSelectedProfileId(data) {
      for (var profileId in data.profiles) {
        if (data.profiles.hasOwnProperty(profileId)) {
          var profile = data.profiles[profileId];
          if (profile.selected === true) {
            return profile.profile_id;
          }
        }
      }
      return null;
    }

    const selectedProfileUUID = getCurrentSelectedProfileId(data);

    if (selectedProfileUUID) {
      const profileResponse = await axios.get(`https://api.hypixel.net/v2/skyblock/profile`, {
        params: {
          key: key,
          profile: selectedProfileUUID
        }
      });
      res.json(profileResponse.data);
    } else {
      res.status(404).send('No selected profile found.');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
