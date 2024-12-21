const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { OpenAI } = require("openai");
const { OPENAI_API_KEY, organizationId } = require("../config.json");

const openai = new OpenAI({
    organization: organizationId,
    apiKey: OPENAI_API_KEY
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dressup")
    .setDescription("AI generates an image of the crew with specified outfits.")
    .addStringOption(option =>
      option.setName("outfit")
        .setDescription("The outfit for the crew to dress in.")
        .setRequired(true)),

  async execute(interaction) {

    await interaction.deferReply();
    const outfit = interaction.options.getString("outfit");
    const imagePath = path.join(__dirname, "../images/CrewWeddingOriginal.png");
    const maskPath = path.join(__dirname, "../images/CrewWeddingMask.png");
    try {
        const response = await openai.images.edit({
          model: "dall-e-2",
          image: fs.createReadStream(imagePath),
          mask: fs.createReadStream(maskPath),
          prompt: `12 individuals wearing ${outfit}. Don't generate more people than heads in image.`,
          n: 1,
          size: "1024x1024",
        });
  
        const imageUrl = response.data[0].url;
  
        await interaction.editReply({
            content: `The crew wearing ${outfit}`,
            files: [{
                attachment: imageUrl,
                name: "generatedCrew.png"
            }]
        });
      } catch (error) {
        console.error(error);
        await interaction.editReply("There was an error generating the image.");
      }
  },
};