const activities_list = [
    "http://eventverse.fun", 
    "by tomu#9436",
    "Official EventVerse bot", 
    "fowley je $imp"
    ];

module.exports = (client) => {
    console.log(`Ready as ${client.user.tag} to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
        client.user.setPresence({
            status : "online",
            activity : {
                name : activities_list[index],
                type : "COMPETING",
            }
        }); 
    }, 10000); 
};
