const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("weekly")
    .setDescription("Claim your weekly reward"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let amount = Math.floor(Math.random() * 20000) + 2000;

    let data;
    try {
      data = await schema.findOne({
        userId: interaction.user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: interaction.user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    let timeout = 604800000;

    if (timeout - (Date.now() - data.weeklyTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.weeklyTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.weeklyTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const weeklyEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You recieved a weekly reward of **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [weeklyEmbed],
      });
    }
  },
};
