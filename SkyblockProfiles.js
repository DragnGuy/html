const playerNameInput = document.getElementById('playerNameInput');
const fetchDataButton = document.getElementById('fetchDataButton');
const profileTableDiv = document.getElementById('Profiletable');
const key = '';

fetchDataButton.addEventListener('click', () => {
    const PlayerUUID = playerNameInput.value;

    fetch(`https://api.hypixel.net/v2/skyblock/profiles?key=${key}&uuid=${PlayerUUID}`)
        .then(res => res.json())
        .then(data => {
            function getCurrentSelectedProfileId(data) {
                // Iterate over the profiles
                for (var profileId in data.profiles) {
                    if (data.profiles.hasOwnProperty(profileId)) {
                        var profile = data.profiles[profileId];
                        // Check if the profile is selected
                        if (profile.selected === true) {
                            // Return the profile id of the selected profile
                            return profile.profile_id;
                        }
                    }
                }
                // Return null if no selected profile found
                return null;
            }

            var selectedProfileUUID = getCurrentSelectedProfileId(data);

            // Check if a selected profile UUID was found
            if (selectedProfileUUID) {
                return fetch(`https://api.hypixel.net/v2/skyblock/profile?key=${key}&profile=${selectedProfileUUID}`);
            } else {
                throw new Error('No selected profile found.');
            }
        })
        .then(response => response.json())
        .then(info => {
            profileid = info.profile.profile_id;
            console.log('your profile id is', profileid);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
