const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Database = require("better-sqlite3");

const db = new Database("database.db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("games")
    .setDescription("Picks out the game to play from game list.")
    .addStringOption(option =>
      option.setName("addgame")
        .setDescription("Add a game to the list")
        .setRequired(false))
    .addStringOption(option =>
      option.setName("removegame")
        .setDescription("Remove a game from the list")
        .setRequired(false))
    .addStringOption(option =>
      option.setName("list")
        .setDescription("List all games")
        .setRequired(false)
        .addChoices(
          { name: 'all', value: 'all' }
        )
    ),

  async execute(interaction) {
    const addGame = interaction.options.getString("addgame");
    const removeGame = interaction.options.getString("removegame");
    const listGames = interaction.options.getString("list");

    if (addGame) {
      const insert = db.prepare("INSERT INTO games (title) VALUES (?)");
      insert.run(addGame);
      await interaction.reply(`Game "${addGame}" added to the list.`);
    } else if (removeGame) {
      const remove = db.prepare("DELETE FROM games WHERE title = ?");
      const info = remove.run(removeGame);
      if (info.changes > 0) {
        await interaction.reply(`Game "${removeGame}" removed from the list.`);
      } else {
        await interaction.reply(`Game "${removeGame}" not found in the list.`);
      }
    } else if (listGames === 'all') {
      const games = db.prepare("SELECT title FROM games").all();
      if (games.length > 0) {
        const gameList = games.map(game => game.title).join("\n");
        const embed = new EmbedBuilder()
          .setTitle("Games List")
          .setDescription(gameList);
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply("No games found in the list.");
      }
    } else {
      const game = db.prepare("SELECT title FROM games ORDER BY RANDOM() LIMIT 1").get();
      if (game) {
        await interaction.reply(`You should play: ${game.title}`);
      } else {
        await interaction.reply("No games found in the list.");
      }
    }
  },
};