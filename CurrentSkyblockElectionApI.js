fetch("https://api.hypixel.net/v2/resources/skyblock/election")
    .then(response => response.json())
    .then(res => {
        const data = res.mayor;
        let rows = '';
        const candidate1 = res.current.candidates[0];
        let candidate1perks = '';
        if (candidate1.perks && candidate1.perks.length > 0) {
            candidate1.perks.forEach(perk => {
                candidate1perks += `<h3>${perk.name}:</h3>${perk.description}<br>`;
        })};
        rows += `<tr>
        <td>${res.current.candidates[0].name}</td>
        <td>${res.current.candidates[0].key}</td>
        <td>${candidate1perks}</td>
        <td>${res.current.candidates[0].votes}</td>
        </tr>`

        const candidate2 = res.current.candidates[1];
        let candidate2perks = '';
        if (candidate2.perks && candidate2.perks.length > 0) {
            candidate2.perks.forEach(perk => {
                candidate2perks += `<h3>${perk.name}:</h3>${perk.description}<br>`;
        })};
        rows += `<tr>
        <td>${res.current.candidates[1].name}</td>
        <td>${res.current.candidates[1].key}</td>
        <td>${candidate2perks}</td>
        <td>${res.current.candidates[1].votes}</td>
        </tr>`;

        const candidate3 = res.current.candidates[2];
        let candidate3perks = '';
        if (candidate3.perks && candidate3.perks.length > 0) {
            candidate3.perks.forEach(perk => {
                candidate3perks += `<h3>${perk.name}:</h3>${perk.description}<br>`;
        })};
        rows += `<tr>
        <td>${res.current.candidates[2].name}</td>
        <td>${res.current.candidates[2].key}</td>
        <td>${candidate3perks}</td>
        <td>${res.current.candidates[2].votes}</td>
        </tr>`;

        const candidate4 = res.current.candidates[3];
        let candidate4perks = '';
        if (candidate4.perks && candidate4.perks.length > 0) {
            candidate4.perks.forEach(perk => {
                candidate4perks += `<h3>${perk.name}:</h3>${perk.description}<br>`;
        })};
        rows += `<tr>
        <td>${res.current.candidates[3].name}</td>
        <td>${res.current.candidates[3].key}</td>
        <td>${candidate4perks}</td>
        <td>${res.current.candidates[3].votes}</td>
        </tr>`;

        const candidate5 = res.current.candidates[4];
        let candidate5perks = '';
        if (candidate5.perks && candidate4.perks.length > 0) {
            candidate5.perks.forEach(perk => {
                candidate5perks += `<h3>${perk.name}:</h3>${perk.description}<br>`;
        })};
        rows += `<tr>
        <td>${res.current.candidates[4].name}</td>
        <td>${res.current.candidates[4].key}</td>
        <td>${candidate5perks}</td>
        <td>${res.current.candidates[4].votes}</td>
        </tr>`;

        document.getElementById('CurrentRunningCandidatesTable').innerHTML = rows;
    })
    .catch(error => console.log(error));