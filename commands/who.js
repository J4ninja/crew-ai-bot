const { SlashCommandBuilder } = require("discord.js");
const Database = require("better-sqlite3");
const db = new Database("database.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("who")
    .setDescription("Answers the specified question: Who in the crew ____")
    .addStringOption(option =>
      option.setName("question")
        .setDescription("The question to ask.")
        .setRequired(true)),

  async execute(interaction) {
    const question = interaction.options.getString("question");

    // Query the database for one random member
    const member = db.prepare("SELECT name FROM members ORDER BY RANDOM() LIMIT 1").get();

    if (member) {
      await interaction.reply(`Who in the crew ${question}?: ${member.name}`);
    } else {
      await interaction.reply("No members found in the database.");
    }
  },
};