const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("love")
    .setDescription("Sends love compatibility between you and specified user.")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("The user to check compatibility with")
        .setRequired(true)),

  async execute(interaction) {
    const loveRate = Math.floor(Math.random() * 101);
    const heartImagePath = path.join(__dirname, "../images/heart.png");
    const heartImage = new AttachmentBuilder(heartImagePath);

    const user = interaction.options.getUser("user");
    const content = `Love Compatibility between ${interaction.user} and ${user} is ${loveRate}%`;

    if (loveRate >= 70) {
      await interaction.reply({ content, files: [heartImage] });
    } else {
      await interaction.reply({ content });
    }
  },
};