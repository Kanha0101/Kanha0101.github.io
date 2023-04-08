const discord = require("discord.js");
const yts = require("yt-search");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Search a video on YouTube")
    .addStringOption((option) =>
      option
        .setName("search_query")
        .setDescription("Enter your search query")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const searchQuery = interaction.options.getString("search_query");
    const result = await yts(searchQuery);
    const videos = result.videos.slice(0, 1);
    videos.forEach(async function (v) {
      await interaction.reply({
        content: `${v.url}\n Channel Name - **${
          v.author.name
        }**\n Views - **${v.views.toLocaleString()}**\n< Video Duration - **${
          v.duration.timestamp
        }**\n Uploaded - **${v.ago}**`,
      });
    });
  },
};
