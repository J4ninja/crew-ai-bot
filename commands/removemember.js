const { SlashCommandBuilder } = require("discord.js");
const Database = require("better-sqlite3");
const db = new Database("database.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removemember")
    .setDescription("Removes a member to the database.")
    .addStringOption(option =>
      option.setName("name")
        .setDescription("The name of the member")
        .setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString("name");

    // Check if the member exists
    const member = db.prepare("SELECT * FROM members WHERE name = ?").get(name);

    if (member) {
      // Delete the member if they exist
      const deleteMember = db.prepare("DELETE FROM members WHERE name = ?");
      deleteMember.run(name);
      await interaction.reply(`Member removed: "${name}"`);
    } else {
      await interaction.reply(`Member not found: "${name}"`);
    }
  },
};