const { SlashCommandBuilder } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shoot")
    .setDescription("shoots specified user")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("The user")
        .setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    await interaction.deferReply();

    const canvas = Canvas.createCanvas(400,200);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/shoot.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(user.displayAvatarURL( {extension: 'jpg'}));

    ctx.beginPath();
    ctx.arc(300, 100, 75, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, 200, 0, 200, canvas.height);
    const buffer = canvas.toBuffer('image/jpeg'); // Specify the format
    await interaction.editReply({ files: [{ attachment: buffer, name: 'shoot.jpg' }] });
  },
};