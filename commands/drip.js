const { SlashCommandBuilder } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("drip")
    .setDescription("adds drip to specified user.")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("The user to get drip")
        .setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    await interaction.deferReply();

    const canvas = Canvas.createCanvas(400,450);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/drip.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(user.displayAvatarURL( {extension: 'jpg'}));

    ctx.beginPath();
    ctx.arc(200, 100, 90, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, 100, 0, 200, 200);
    const buffer = canvas.toBuffer('image/jpeg'); // Specify the format
    await interaction.editReply({ files: [{ attachment: buffer, name: 'drip.jpg' }] });
  },
};