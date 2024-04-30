// Get the input box, button, and div elements
const playerNameInput = document.getElementById('playerNameInput');
const fetchDataButton = document.getElementById('fetchDataButton');
const profileTableDiv = document.getElementById('Profiletable');

// Add an event listener to the button
fetchDataButton.addEventListener('click', () => {
    // Get the player name from the input box
    const playerName = playerNameInput.value;

    // Fetch player data using the player name
    fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`)
    .then(playerNameResponse => playerNameResponse.json())
        .then(IDResult => {
            // Get the PlayerUUID from the response
            const PlayerUUID = IDResult.id;

            // Fetch Hypixel data using the PlayerUUID
            return fetch(`https://api.hypixel.net/v2/skyblock/profiles?key=d0190f16-1c0e-4953-9f95-924d9c1b8844&uuid=${PlayerUUID}`);
        })
        .then(response => response.json())
        .then(data => {
            // Find the selected profile
            const selectedProfile = data.profiles.find(profile => profile.selected);

            // Check if a selected profile was found
            if (selectedProfile) {
                // Process the data from the selected profile
                console.log('Selected Profile:', selectedProfile);
                // Your code to process the selected profile goes here

                // Example: Displaying information from the selected profile
                // let profileInfo = `Profile name: ${selectedProfile.name}`;
                // profileTableDiv.innerHTML = profileInfo;
            } else {
                console.error('No selected profile found');
            }
        })
        .catch(error => {
            // Handle any errors that may occur during the fetch requests
            console.error('An error occurred:', error);
        });
});
