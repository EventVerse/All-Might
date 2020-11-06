const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Musíš mít permise na úpravu zpráv pro reroll.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Musíš uvést platné ID zprávy!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Nelze nalézt giveaway pro `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('Giveaway vylosovala nového vítěze!!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway z ID zprávy ${giveaway.messageID} neskončila`)){
            message.channel.send('Tahle giveaway neskončila!');
        } else {
            console.error(e);
            message.channel.send('Nastal nečekaný problém...');
        }
    });

};
