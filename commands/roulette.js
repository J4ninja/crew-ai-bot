const { SlashCommandBuilder } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("play russian roulette")
    .addIntegerOption(option =>
        option.setName("odds")
          .setDescription("Increase the odds of getting shot (1-5) bullets out of 6 chambers")
          .setRequired(false)
          .setMinValue(1)
          .setMaxValue(5)),

  async execute(interaction) {

    await interaction.deferReply();


    await interaction.editReply(
        "https://imgur.com/aCcPPPe"
      );


    setTimeout(async () => {
        const odds = interaction.options.getInteger("odds") || 1; 
        const randomNumber = Math.floor(Math.random() * 6) + 1;

        if (randomNumber <= odds) {
            const canvas = Canvas.createCanvas(400,200);
            const ctx = canvas.getContext('2d');
        
            const background = await Canvas.loadImage('./images/shoot.jpg');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
            const user = interaction.user;
            const avatar = await Canvas.loadImage(user.displayAvatarURL( {extension: 'jpg'}));
        
            ctx.beginPath();
            ctx.arc(300, 100, 75, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
        
            ctx.drawImage(avatar, 200, 0, 200, canvas.height);
            const buffer = canvas.toBuffer('image/jpeg'); // Specify the format
            await interaction.editReply({ content: "You got shot!", files: [{ attachment: buffer, name: 'shoot.jpg' }] });
        } else
        {
            await interaction.editReply("You survived!");
        }
    }, 3000); // 5 secs    
    
    
   
  },
};