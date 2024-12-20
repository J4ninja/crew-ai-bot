const { SlashCommandBuilder } = require("discord.js");
const Database = require("better-sqlite3");
const db = new Database("database.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addquote")
    .setDescription("Adds a new quote to the database.")
    .addStringOption(option =>
      option.setName("text")
        .setDescription("The text of the quote")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("author")
        .setDescription("The author of the quote")
        .setRequired(true)),

  async execute(interaction) {
    const text = interaction.options.getString("text");
    const author = interaction.options.getString("author");

    const insert = db.prepare("INSERT INTO quotes (text, author) VALUES (?, ?)");
    insert.run(text, author);

    await interaction.reply(`Quote added: "${text}" - ${author}`);
  },
};