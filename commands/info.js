const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("info")
    .setDescription("Get some basic information about me"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const infoEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle("Banky")
      .setDescription("Here's some basic information about myself")
      .addFields(
        {
          name: "My Prefix",
          value: "/ (Slash Commands)",
          inline: false,
        },
        {
          name: "My Developer",
          value: "Kanha#8221",
          inline: false,
        },
        {
          name: "I was developed on",
          value: "April 8th 2023",
          inline: false,
        }
      )
      .setFooter({
        text: "Invite me to your server by using the /invite command",
      });

    const inviteButton = new discord.ButtonBuilder()
      .setLabel("Invite Me")
      .setStyle(discord.ButtonStyle.Link)
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=935229681718952008&permissions=8&scope=bot%20applications.commands"
      );

    const voteButton = new discord.ButtonBuilder()
      .setLabel("Vote Me on top.gg")
      .setStyle(discord.ButtonStyle.Link)
      .setURL("https://top.gg/");

    const supportButton = new discord.ButtonBuilder()
      .setLabel("Join my Support Server")
      .setStyle(discord.ButtonStyle.Link)
      .setURL("https://discord.gg/zEz8Mz4kTB");

    const buttonRow = new discord.ActionRowBuilder().addComponents(
      inviteButton,
      voteButton,
      supportButton
    );

    await interaction.reply({
      embeds: [infoEmbed],
      components: [buttonRow],
    });
  },
};
