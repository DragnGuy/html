fetch("https://api.hypixel.net/v2/resources/skyblock/election")
    .then(response => response.json())
    .then(res => {
        const data = res.mayor;
        let rows = '';
        const mayor = res.mayor;
        let mayorperks = '';
        if (mayor.perks && mayor.perks.length > 0) {
            mayor.perks.forEach(perk => {
                mayorperks += `<h3>${perk.name}:</h3>${perk.description}<br>`;
        })};
        rows += `<tr>
        <td>${res.mayor.name}</td>
        <td>${res.mayor.key}</td>
        <td>${mayorperks}</td>
        <td>${res.mayor.election.year}</td>
        </tr>`
        document.getElementById('Currentmayor').innerHTML = rows;
    })
    .catch(error => console.log(error));