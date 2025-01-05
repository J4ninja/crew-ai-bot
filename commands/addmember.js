const { SlashCommandBuilder } = require("discord.js");
const Database = require("better-sqlite3");
const db = new Database("database.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addmember")
    .setDescription("Adds a new member to the database.")
    .addStringOption(option =>
      option.setName("name")
        .setDescription("The name of the member")
        .setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString("name");

    const insert = db.prepare("INSERT INTO members (name) VALUES (?)");
    insert.run(name);

    await interaction.reply(`Member added: "${name}"`);
  },
};