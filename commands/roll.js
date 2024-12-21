const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls a dice."),

  async execute(interaction) {
    var diceImages = ["https://static.thenounproject.com/png/1194688-200.png","https://static.thenounproject.com/png/1194691-200.png","https://static.thenounproject.com/png/1194684-200.png",
        "https://static.thenounproject.com/png/1194689-200.png","https://static.thenounproject.com/png/1194690-200.png", "https://static.thenounproject.com/png/1194690-200.png"];
    
    var selected = diceImages[Math.floor(Math.random()*diceImages.length)];
    await interaction.reply("https://tenor.com/view/dice-roll-dice-roll-the-dice-cube-game-gif-6495545147822062773");
    setTimeout(async () => {
        await interaction.editReply(selected);
      }, 2000); // 3000ms = 2 seconds
  },
};