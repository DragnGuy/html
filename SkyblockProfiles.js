const playerNameInput = document.getElementById('playerNameInput');
const fetchDataButton = document.getElementById('fetchDataButton');
const profileTableDiv = document.getElementById('Profiletable');
const key = '9805cf45-c807-4dbf-a630-1eca5e0ed25e'
fetchDataButton.addEventListener('click', () => {
    const PlayerUUID = playerNameInput.value;

    fetch(`https://api.hypixel.net/v2/skyblock/profiles?key=${key}&uuid=${PlayerUUID}`)
        .then(res => res.json())
        .then(data => {
            const selectedProfile = data.profiles.find(profile => profile.selected);

            if (selectedProfile) {
                console.log('Selected Profile:', selectedProfile);

            } else {
                console.error('No selected profile found');
            }
            })

            .then(
                fetch(`https://api.hypixel.net/v2/skyblock/profile?key=${key}&profile=${selectedProfile}`))
                .then(response => response.json())
                .then(info => {
                    cutename = info.cute_name;
                })


        .catch(error => {
            console.error('An error occurred:', error);
        });  
})
