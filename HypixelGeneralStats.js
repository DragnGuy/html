async function sendReq(url) {
    console.log("Sending request...");
    const response = await fetch(url);
    console.log("Response:");
    return await response.json();
}

app.post('/', async (req, res) => {
    const playerName = req.body.playerName;

    const url = `https://api.mojang.com/users/profiles/minecraft/${playerName}?`;
    try {
        const identification = await sendReq(url);

        if (identification && "id" in identification) {
            const uuid = identification["id"];
            const apiKey = "cd36c2f1-dca3-49f2-ad12-46015bb5712c";
            const hypixelUrl = `https://api.hypixel.net/v2/player?key=${apiKey}&uuid=${uuid}`;

            const data = await sendReq(hypixelUrl);

            if (data && "success" in data) {
                const player = data.player;

                const player_name = player.playername || "ACTUAL ERROR";
                const display_name = player.displayname || "ACTUAL ERROR";

                let rank = "Default";
                if (player.prefix) {
                    rank = player.prefix;
                } else if (player.newPackageRank) {
                    rank = player.newPackageRank;
                }

                const onetimeachievements_count = player.achievementsOneTime ? player.achievementsOneTime.length : 0;

                const playerStats = [
                    { "Info Type": "Player Name", "Info": player_name },
                    { "Info Type": "Display Name", "Info": display_name },
                    { "Info Type": "Rank", "Info": rank },
                    { "Info Type": "One Time Achievements", "Info": onetimeachievements_count }
                ];

                const bedwars_stats = player.stats.Bedwars || {};
                const total_played_bedwars_games = bedwars_stats.games_played_bedwars || 0;
                const total_bedwars_deaths = bedwars_stats.deaths_bedwars || 0;
                const total_final_deaths = bedwars_stats.final_deaths_bedwars || 0;
                const total_bedwars_kills = bedwars_stats.kills_bedwars || 0;
                const total_bedwars_final_kills = bedwars_stats.final_kills_bedwars || 0;

                const bedwarsStats = [
                    { "Info Type": "Total Bedwars Games Played", "Info": total_played_bedwars_games },
                    { "Info Type": "Total Deaths", "Info": total_bedwars_deaths },
                    { "Info Type": "Total final deaths", "Info": total_final_deaths },
                    { "Info Type": "total kills", "Info": total_bedwars_kills },
                    { "Info Type": "Total final kills", "Info": total_bedwars_final_kills }
                ];

                res.render('result.html', { playerStats, bedwarsStats });
            } else {
                const error_message = "Error in API response. Debugging information:";
                res.render('stats.html', { error_message, debugging_info: data });
            }
        } else {
            const error_message = "Error: Player not found. Please try again.";
            res.render('stats.html', { error_message });
        }
    } catch (error) {
        console.error("Error occurred:", error.message);
        const error_message = "Error occurred: " + error.message;
        res.render('stats.html', { error_message });
    }
});

