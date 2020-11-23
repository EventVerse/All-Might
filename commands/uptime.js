const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "uptime",
  aliases: ["u"],
  description: "This command checks the uptime of the bot",
  run: async(client, message) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("<:PepeSmile:762773910919839794> | Môj uptime si vie pozrieť iba môj diktátor.")
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;


    const embed = new MessageEmbed()
        .setTitle("<:ZabickaSurfar:762931278202011689> | **Uptime**")
        .setDescription(`**Uptime:**\n\`${days} day(s) ${hours} hours ${minutes} minutes ${seconds} seconds\``)
    message.channel.send(embed)
    }
}

// .reply(`Uptime: \`${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds\``)
