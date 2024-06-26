const playerNameInput = document.getElementById('playerNameInput');
const fetchDataButton = document.getElementById('fetchDataButton');
const profileTableDiv = document.getElementById('profileTableDiv');

fetchDataButton.addEventListener('click', () => {
  const PlayerUUID = playerNameInput.value;

  fetch(`https://justsomemorestuff.com/api/profile/${PlayerUUID}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(info => {
      profileTableDiv.innerText = JSON.stringify(info, null, 2);
    })
    .catch(error => {
      console.error('Error:', error);
      profileTableDiv.innerText = `Error: ${error.message}`;
    });
});