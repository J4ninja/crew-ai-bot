const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("The magic 8ball will answer your question.")
    .addStringOption(option =>
      option.setName("question")
        .setDescription("Ask the magic 8ball a question.")
        .setRequired(true)),

  async execute(interaction) {

    var magicImages = ["../images/magic1.jpg", "../images/magic2.jpg", 
        "../images/magic3.jpg", "../images/magic4.jpg", "../images/magic5.jpg", 
        "../images/magic6.jpg", "../images/magic7.jpg", "../images/magic8.jpg"];
    var selectedImage = magicImages[Math.floor(Math.random()*magicImages.length)];
    const filePath = path.join(__dirname, selectedImage);
    const fileImage = new AttachmentBuilder(filePath);
    const question = interaction.options.getString("question");
    const content = `You Asked: ${question}`;
    await interaction.reply({ content, files: [fileImage] });
  },
};