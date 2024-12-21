const { SlashCommandBuilder } = require("discord.js");

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
    var members = ["John", "Steve", "Alex", "Arthur", "Jacob", 
        "Sthefany", "Emma", "Christian", "Tony", "Joseph", "Rafael", "Keira"];
    
    var member = members[Math.floor(Math.random()*members.length)];
    await interaction.reply(`Who in the crew ${question}?: ${member}`);
  },
};