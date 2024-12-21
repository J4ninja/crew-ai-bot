const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flip")
    .setDescription("Flips a coin."),

  async execute(interaction) {
    await interaction.reply(
      "https://tenor.com/view/quarter-coin-flip-heads-tails-gif-14158378"
    );

    setTimeout(async () => {
      var coin = Math.floor(Math.random() * 101);
      if (coin > 50) {
        await interaction.editReply(
          "https://image.pngaaa.com/139/894139-middle.png"
        );
      } else if (coin == 50) {
            await interaction.editReply("It landed on its side!");
      } else {
        await interaction.editReply(
            "https://image.pngaaa.com/735/2325735-middle.png"
          );
      }
    }, 3100); // 3.1 secs

  },
};
