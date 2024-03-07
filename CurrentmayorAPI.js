fetch("https://api.hypixel.net/v2/resources/skyblock/election")
    .then(response => response.json())
    .then(res => {
        const data = res.mayor;
        let rows = '';
        const candidate1 = res.mayor.election.candidates[0];
        let candidate1perks = '';
        if (candidate1.perks && candidate1.perks.length > 0) {
            candidate1.perks.forEach(perk => {
                candidate1perks += `<h3>${perk.name}:</h3>${perk.description}<br>`;
        })};
        rows += `<tr>
        <td>${res.mayor.election.candidates[0].name}</td>
        <td>${res.mayor.election.candidates[0].key}</td>
        <td>${candidate1perks}</td>
        <td>${res.mayor.election.candidates[0].votes}</td>
        </tr>`
        document.getElementById('Currentmayor').innerHTML = rows;
    })
    .catch(error => console.log(error));