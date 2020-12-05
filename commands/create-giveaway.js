const { MessageEmbed } = require(discord.js);
const ms = require('ms');

module.exports = {
name: "gcreate",
usage: "gcreate [channel] [duration] [winners] [prize]",
run: async (client, message, args) => {
	//declaration of setup messages
	var msg = null;
	const filter = u => u === message.author;

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<:no:767754183444398101> Musíš mít oprávnění k úpravě zpráv aby si mohl začít giveaway.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentioned
    if(!giveawayChannel){
        const embed = new MessageEmbed()
        	.setColor("#00f100")
        	.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), "http://eventverse.eu")
			.setTitle("Nastavení Giveawaye")
			.setDescription("Označ kanál nebo napiš ID kanálu, ve kterém se bude giveaway konat.")
			.setFooter(`Setup initiated with: ${client.user.tag}, cancelled after 30 seconds.`, client.user.avatarURL({ dynamic: true})
			.setTimestamp();
		msg = await message.channel.send(embed);
		const amsg = await message.channel.awaitMessages(filter, {limit: 1, time: 30000});
		amsg.delete();
		if (!amsg || amsg.content.toLowerCase() === "cancel") {
          	return msg.edit("<:no:767754183444398101> Příkaz zrušen!", {embed: null});
		} else {
			giveawayChannel = amsg.mentions.channels.first() | message.guild.channels.cache.get(amsg);
		}
		if (!giveawayChannel) {
        	return message.channel.send('<:no:767754183444398101> Musíš označit platný kanál!');
		}
    }

    // Giveaway duration
	let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
		const embed = new MessageEmbed()
        	.setColor("#00f100")
        	.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), "http://eventverse.eu")
			.setTitle("Nastavení Giveawaye")
			.setDescription("Napiš dobu trvání giveawaye.")
			.setFooter(`Setup initiated with: ${client.user.tag}, cancelled after 30 seconds.`, client.user.avatarURL({ dynamic: true})
			.setTimestamp();
		if (!msg) {
			msg = await message.channel.send(embed);
		} else {
			msg.edit(embed);
		}
		const amsg = await message.channel.awaitMessages(filter, {limit: 1, time: 30000});
		amsg.delete();
		if (!amsg || amsg.content.toLowerCase() === "cancel") {
          	return msg.edit("<:no:767754183444398101> Příkaz zrušen!", {embed: null});
		} else {
			try {
				giveawayDuration = ms(parseInt(amsg));
			} catch (e) {
				return msg.edit("<:no:767754183444398101> Musíš uvést platnou dobu trvání!", {embed: null});
				console.error(e);
			}
		}
		if (!giveawayDuration) {
        	return message.channel.send('<:no:767754183444398101> Musíš uvést platnou dobu trvání!');
		}
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
		const embed = new MessageEmbed()
        	.setColor("#00f100")
        	.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), "http://eventverse.eu")
			.setTitle("Nastavení Giveawaye")
			.setDescription("Napiš počet výherců.")
			.setFooter(`Setup initiated with: ${client.user.tag}, cancelled after 30 seconds.`, client.user.avatarURL({ dynamic: true})
			.setTimestamp();
		if (!msg) {
			msg = await message.channel.send(embed);
		} else {
			msg.edit(embed);
		}
		const amsg = await message.channel.awaitMessages(filter, {limit: 1, time: 30000});
		amsg.delete();
		if (!amsg || amsg.content.toLowerCase() === "cancel") {
          	return msg.edit("<:no:767754183444398101> Příkaz zrušen!", {embed: null});
		} else {
			try {
				giveawayNumberWinners = parseInt(amsg);
			} catch (e) {
				return msg.edit("<:no:767754183444398101> Musíš uvést platný počet výherců!", {embed: null});
				console.error(e);
			}
		}
		if (!giveawayNumberWinners) {
        	return message.channel.send('<:no:767754183444398101> Musíš uvést platný počet výherců!');
		}
        //return message.channel.send('<:no:767754183444398101> Musíš uvést platný počet výherců!!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
		const embed = new MessageEmbed()
        	.setColor("#00f100")
        	.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }), "http://eventverse.eu")
			.setTitle("Nastavení Giveawaye")
			.setDescription("Napiš výhru.")
			.setFooter(`Setup initiated with: ${client.user.tag}, cancelled after 30 seconds.`, client.user.avatarURL({ dynamic: true})
			.setTimestamp();
		if (!msg) {
			msg = await message.channel.send(embed);
		} else {
			msg.edit(embed);
		}
		const amsg = await message.channel.awaitMessages(filter, {limit: 1, time: 30000});
		amsg.delete();
		if (!amsg || amsg.content.toLowerCase() === "cancel") {
          	return msg.edit("<:no:767754183444398101> Příkaz zrušen!", {embed: null});
		} else {
			giveawayPrize = amsg.content;
		}
		if (!giveawayPrize) {
        	return message.channel.send('<:no:767754183444398101> Musíš uvést platnou cenu!');
		}
        //return message.channel.send('<:no:767754183444398101> Musíš uvést platnou cenu!');
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

}
}
