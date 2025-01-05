const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Database = require("better-sqlite3");

const db = new Database("database.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("members")
    .setDescription("Lists out members of the crew."),

  async execute(interaction) {

    const members = db.prepare("SELECT name FROM members").all();
    if (members.length > 0) {
        const membersList = members.map(member => member.name).join("\n");
        const embed = new EmbedBuilder()
            .setTitle("Crew Members List")
            .setDescription(membersList);
        await interaction.reply({ embeds: [embed] });
    } else {
        await interaction.reply("No members found in list");
    }
  },
};