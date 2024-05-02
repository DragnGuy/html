const playerNameInput = document.getElementById('playerNameInput');
const fetchDataButton = document.getElementById('fetchDataButton');
const profileTableDiv = document.getElementById('Profiletable');

fetchDataButton.addEventListener('click', () => {
    const playerName = playerNameInput.value;

    fetch(`https://https://api.mojang.com/users/profiles/minecraft/${playerName}`)
    .then(playerNameResponse => playerNameResponse.json())
        .then(IDResult => {
            const PlayerUUID = IDResult.id;

            return fetch(`https://api.hypixel.net/v2/skyblock/profiles?key=d0190f16-1c0e-4953-9f95-924d9c1b8844&uuid=${PlayerUUID}`);
        })
        .then(response => response.json())
        .then(data => {
            const selectedProfile = data.profiles.find(profile => profile.selected);

            if (selectedProfile) {
                console.log('Selected Profile:', selectedProfile);

            } else {
                console.error('No selected profile found');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
});   

