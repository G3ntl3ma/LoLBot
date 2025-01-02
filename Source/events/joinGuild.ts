import { Events, Guild } from "discord.js";
import { getGuild } from "../DB/DBHandler";

module.exports = {
  name: Events.GuildCreate,
  async execute(guild: Guild) {
    //Set a default output channel for the Games

    try {
      const guildConfig = await getGuild();
      const config = new guildConfig({
        _id: guild.id,
        out: guild.systemChannelId,
        timezone: "Etc/GMT+0",
      });
      await config.save();
      console.log("New Server has been successfully added!");
    } catch {
      console.log("Guild already added");
    }
  },
};

