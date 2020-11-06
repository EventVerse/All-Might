const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<:no:767754183444398101> Musíš mít oprávnění k úpravě zpráv aby si mohl začít giveaway.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send('<:no:767754183444398101> Musíš označit platný kanál!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('<:no:767754183444398101> Musíš uvést platnou dobu trvání!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('<:no:767754183444398101> Musíš uvést platný počet výherců!!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send('<:no:767754183444398101> Musíš uvést platnou cenu!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "<@&760165732406263888>\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "<@&760165732406263888>\n\n" : "")+"🎉🎉 **GIVEAWAY SKONČILA** 🎉🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "Reaguj pomocí 🎉 aby ses zúčastnil!",
            winMessage: "Gratulujeme, {winners}! Vyhrál si **{prize}**!",
            embedFooter: "Giveawaye",
            noWinner: "Giveaway zrušena, nedostatek přihlášených lidí.",
            hostedBy: "Udělal : {user}",
            winners: "Vítěz(ové):",
            endedAt: "Skončila v:",
            units: {
                seconds: "sekundy",
                minutes: "minuty",
                hours: "hodiny",
                days: "dny",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway začala v ${giveawayChannel}!`);

};