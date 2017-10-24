const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

//   CONSOLE    //
client.on("ready", () => {
  console.log(`IMMA FIRING LAZERS ${client.users.size} users. ${client.channels.size} channels. ${client.guilds.size} servers.`); 
  client.user.setGame(`on meth`);
});
client.on("guildCreate", guild => {
  console.log(`SERVER NEW: ${guild.name} (id: ${guild.id}). ${guild.memberCount} users`);
  client.user.setGame(`on meth`);
});
client.on("guildDelete", guild => {
  console.log(`SERVER DEL: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on meth`);
});

//   COMMANDS   //
client.on("message", async message => {
  if(message.author.bot || message.content.indexOf(config.prefix) !== 0) return;
// define arguments and commands
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

//help
  if(command === "help") {
    const msg = await message.channel.send("one sec boo");
    msg.edit({ "embed": { "description": "*This bot is still in beta. The following commands are availible.*", "fields":  [ 
    { "name": "general commands", "value": "`/help`        brings up this menu\n`/ping`        returns server latency" },
    { "name": "*Planned features*", "value": "```Pokemon capture system\nWhois function\nAvatar function\nAuto-role\nTimed automated messages\nResponses to mentions via intents\n```" } ], 
    "footer": { "icon_url": "https://cdn.discordapp.com/avatars/360476941305905152/65ae71eba48c064c83f78344f12cf089.png", "text": "lulzbawt by sky#9631" } } });
     if(message.member.roles.some(r=>["+ lulz", "+ mod"].includes(r.name)) ){
     msg.edit({ "embed": { "description": "*This bot is still in beta. The following commands are availible.*", "fields": [ 
     { "name": "general commands", "value": "`/help`        brings up this menu\n`/ping`        returns server latency" }, 
     { "name": "+ mod commands", "value": "`/mute` mutes (disables input) a user server-wide\n`/unmute` unmutes a muted user" }, 
     { "name": "*Planned features*", "value": "```Pokemon capture system\nWhois function\nAvatar function\nAuto-role\nTimed automated messages\nResponses to mentions via intents\n```" } ], 
     "footer": { "icon_url": "https://cdn.discordapp.com/avatars/360476941305905152/65ae71eba48c064c83f78344f12cf089.png", "text": "lulzbawt by sky#9631" } } });}
     if(message.member.roles.some(r=>["+ lulz"].includes(r.name)) ){
     msg.edit({ "embed": { "description": "*This bot is still in beta. The following commands are availible.*", "fields": [ 
     { "name": "general commands", "value": "`/help` brings up this menu\n`/ping` returns server latency" }, 
     { "name": "+ mod commands", "value": "`/mute`      mutes (disables input) a user server-wide\n`/unmute`  unmutes a muted user" }, 
     { "name":"+ lulz commands", "value":"`/say`    `/embed`    `/purge`" }, 
     { "name": "*Planned features*", "value": "```Pokemon capture system\nWhois function\nAvatar function\nAuto-role\nTimed automated messages\nResponses to mentions via intents\n```" } ], 
     "footer": { "icon_url": "https://cdn.discordapp.com/avatars/360476941305905152/65ae71eba48c064c83f78344f12cf089.png", "text": "lulzbawt by sky#9631" } } });}
    console.log(`HELP REQ: ${message.author.tag}`);
  }  

//ping
  if(command === "ping") {
    const msg = await message.channel.send("mkay");
    msg.edit(`Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    console.log(`PING REQ: ${message.author.tag}`);
  }
//avatar
  if(command === "avatar") {
    let member = message.mentions.members.first();
    if(!member) return;
    message.channel.send({"embed": { "url": member.user.avatarURL, "color": 4457741, "footer": { "icon_url": "https://cdn.discordapp.com/avatars/360476941305905152/65ae71eba48c064c83f78344f12cf089.png", "text": "lulzbawt by sky#9631" }, "image": { "url": member.user.avatarURL }, "author": { "name": member.user.tag, "url": member.user.avatarURL, "icon_url": member.user.avatarURL } } });
    console.log(`AVATAR: ${member.user.tag} was retrieved by ${message.author.tag}`);
  }
//whois  
  if(command === "whois") {
    let member = message.mentions.members.first();
    var muted = "no";
    if(message.member.roles.some(r=>["Muted"].includes(r.name)) ) muted = "yes";
    if(!member) return;
    message.channel.send({"embed": { "color": 2683730,
    "footer": { "icon_url": "https://cdn.discordapp.com/avatars/360476941305905152/65ae71eba48c064c83f78344f12cf089.png", "text": "lulzbawt by sky#9631" },
    "thumbnail": { "url": member.user.avatarURL },
    "author": { "name": member.user.tag, "icon_url": member.user.avatarURL },
    "fields": [ 
      {"name": ".nickname",
        "value": member.nickname,
        "inline": true },
      {"name": ".id",
        "value": member.user.id,
        "inline": true },
      {"name": ".presence",
        "value": member.user.presence.status,
        "inline": true },
      {"name": ".mute",
        "value": muted,
        "inline": true },
      {"name": ".createdTimestamp",
        "value": member.user.createdTimestamp,
        "inline": true },
      {"name": ".createdAt",
        "value": member.user.createdAt,
        "inline": true },
      {"name": ".joinedTimestamp",
        "value": member.joinedTimestamp,
        "inline": true },
      {"name": ".joinedAt",
        "value": member.joinedAt,
        "inline": true },
      {"name": ".lastMessageID",
        "value": member.user.lastMessageID,
        "inline": true }
    ] } });
    console.log(`WHOIS: ${member.user.tag} was retrieved by ${message.author.tag}`);
  }
//say
  if(command === "say") {
    const sayMessage = args.join(" ");
    if(!message.member.roles.some(r=>["+ lulz"].includes(r.name)) || !sayMessage ) return;
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
    console.log(`USED SAY: ${message.author.tag}: ${sayMessage}`);
  }
//change bot status
  if(command === "status") {
    var newStatus = args.join(" ");
    if(!message.member.roles.some(r=>["+ lulz"].includes(r.name)) || !newStatus ) return;
    client.user.setGame(`${newStatus}`);
    console.log(`STAT CHANGE: ${member.user.tag} changed status to ${newStatus}`);
  }
//embed
  if(command === "embed") {
    if(!message.member.roles.some(r=>["+ lulz"].includes(r.name)) ) return;
    const eMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send({embed: {
      color: 15158332,
      description: eMessage
    }});
    console.log(`EMBEDED: ${message.author.tag}: ${eMessage}`);
  }
//mute
  if(command === "mute") {
    if(!message.member.roles.some(r=>["+ lulz","+ mod"].includes(r.name)) ) return;
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("plz mention a valid user kthx");
    if(!member.kickable) 
      return message.reply("can't mute");
    if(member.roles.some(r=>["Muted"].includes(r.name)) ) 
      return message.reply("they're already muted, tard");
    // define mute
    let muted = message.guild.roles.find("name", "Muted");
    await member.addRole(muted)
      .catch(error => message.channel.send(`Sorry ${message.author} I couldn't mute because of : ${error}`));
    message.channel.send(`${member.user.tag} has been muted by ${message.author.tag}`);
    console.log(`MUTE: ${member.user.tag} has been unmuted by ${message.author.tag}`);
  }
//unmute  
  if(command === "unmute") {
    if(!message.member.roles.some(r=>["+ lulz","+ mod"].includes(r.name)) ) return;
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("plz mention a valid user kthx");
    if(!member.kickable) 
      return message.reply("can't unmute");
    if(!member.roles.some(r=>["Muted"].includes(r.name)) ) 
      return message.reply("that person isn't muted, retard");
    let muted = message.guild.roles.find("name", "Muted");
    await member.removeRole(muted)
      .catch(error => message.channel.send(`Sorry ${message.author} I couldn't unmute because of : ${error}`));
    message.channel.send(`${member.user.tag} has been unmuted by ${message.author.tag}`);
    console.log(`UNMUTE: ${member.user.tag} has been unmuted by ${message.author.tag}`);
  }

//special commands follow  

//rabbit
  if(command === "rabbit") {
    const msg = await message.channel.send("<http://rabb.it/habeeb.it/>");
    var eMessage = args.join(" ");
    if(!eMessage) eMessage = "Come stream with me";
    message.delete().catch(O_o=>{}); 
    if(message.member.roles.some(r=>["GUWOP"].includes(r.name)) ){ msg.edit({ "embed": { 
      "description": "**Streaming [here](https://rabb.it/jalszn) right now.**",
      "url": "https://rabb.it/jalszn", "color": 5183664,
      "footer": { "icon_url": "https://cdn.discordapp.com/avatars/360476941305905152/65ae71eba48c064c83f78344f12cf089.png", "text": "lulzbawt by sky#9631" }, 
      "thumbnail": { "url": "https://profile-pictures.rabb.it/j5rx4qtq.jpg" }, 
      "author": { "name": `${message.author.tag}`, "url": "https://rabb.it/jalszn", "icon_url": `${message.author.avatarURL}` }, 
      "fields": [ { "name": "<:35:368703260804120578>:regional_indicator_n: :regional_indicator_i: :b: :b: :regional_indicator_a:", "value":` ${eMessage}` } ] 
      } } ); }
    if(message.member.roles.some(r=>["+ lulz"].includes(r.name)) ){ msg.edit({ "embed": { 
      "description": "**Streaming [here](https://rabb.it/habeeb.it) right now.**",
      "url": "https://rabb.it/habeeb.it", "color": 5183664,
      "footer": { "icon_url": "https://cdn.discordapp.com/avatars/360476941305905152/65ae71eba48c064c83f78344f12cf089.png", "text": "lulzbawt by sky#9631" }, 
      "thumbnail": { "url": "https://profile-pictures.rabb.it/j8kofuhm.jpg" }, 
      "author": { "name": `${message.author.tag}`, "url": "https://rabb.it/habeeb.it", "icon_url": `${message.author.avatarURL}` }, 
      "fields": [ { "name": "<:37:368706719280398339> :regional_indicator_w: :regional_indicator_r: :regional_indicator_y: :regional_indicator_y: :regional_indicator_y: ", "value": `${eMessage}` } ] 
      } } ); }
  }

//end commands
});

//     LOGIN     //
client.login(config.token);

//      END       //
