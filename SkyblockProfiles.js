const playerNameInput = document.getElementById('playerNameInput');
const fetchDataButton = document.getElementById('fetchDataButton');
const profileTableDiv = document.getElementById('Profiletable');

fetchDataButton.addEventListener('click', () => {
    const playerName = playerNameInput.value;

    fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`)
    .then(playerNameResponse => playerNameResponse.json())
        .then(IDResult => {
            const PlayerUUID = IDResult.id;

            return fetch(`https://api.hypixel.net/v2/skyblock/profiles?key=7516f1c9-2688-4183-b377-74aec707a6e5&uuid=${PlayerUUID}`);
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

