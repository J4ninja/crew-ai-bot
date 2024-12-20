const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Database = require("better-sqlite3");

const db = new Database("database.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Replies with random quote from the crew."),

  async execute(interaction) {
    const quote = db.prepare("SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1").get();
    const quoteEmbed = new EmbedBuilder()
        .setTitle(quote.text)
        .setDescription("-" + quote.author);
    await interaction.reply({embeds: [quoteEmbed]});
  },
};