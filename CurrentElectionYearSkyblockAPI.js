fetch("https://api.hypixel.net/v2/resources/skyblock/election")
    .then(response => response.json())
    .then(res => {
        const data = res.mayor;
        let items = '';
       
        items += `<li>Year ${res.mayor.election.year}</li>`

        document.getElementById('CurrentSkyblockYear').innerHTML = items;
    })
    .catch(error => console.log(error));