const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("website")
    .setDescription("Sends a link to the Echo Crew Website."),

  async execute(interaction) {
    
    const webEmbed = new EmbedBuilder()
        .setTitle("Echo Crew Website")
        .setURL('https://j4ninja.github.io/Echo-Crew-Website/')
    await interaction.reply({embeds: [webEmbed]});
  },
};