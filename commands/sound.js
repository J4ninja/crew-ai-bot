const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const path = require('path'); // Ensure path module is imported
const fs = require('fs'); // To read audio files dynamically

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sound")
        .setDescription("Plays a random sound or selected one")
        .addStringOption(option => 
            option
                .setName("audio")
                .setDescription("Choose a specific audio file")
                .setRequired(false)
                .addChoices(
                    { name: 'Bitch', value: "bitch.mp3" },
                    { name: 'Corn', value: "corn.mp3" },
                    { name: 'Cum', value: "cum.mp3" },
                    { name: 'DIO', value: "DIO.mp3" },
                    { name: 'Ghetto', value: "ghetto.mp3" },
                    { name: 'Goku Drip', value: "GOKUDRIP.mp3" },
                    { name: 'Hoe', value: "hoe.mp3" },
                    { name: 'Nico', value: "nico.mp3" },
                    { name: 'Oh no', value: "ohno.mp3" },
                    { name: 'Omae Wa', value: "omae.mp3" },
                    { name: 'Pizza', value: "pizza.mp3" },
                    { name: 'Pussy', value: "pussy.mp3" },
                    { name: 'Slap', value: "slap.mp3" },
                    { name: 'Smell', value: "smell.mp3" },
                    { name: 'Stop', value: "stop.mp3" },
                    { name: 'Wow', value: "wow.mp3" },
                    { name: 'Xue', value: "xue.mp3" },
                    { name: 'ZA WARULDO', value: "ZAWARULDO.mp3" },
                )
        ),

    async execute(interaction) {
        const { member, guild } = interaction;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: "You need to be in a voice channel to use this command!", ephemeral: true });
        }

        const selectedAudio = interaction.options.getString("audio");
        const audioDir = path.join(__dirname, '../audio');

        try {
            let audioFile;

            if (selectedAudio) {
                // Use selected audio file
                audioFile = path.join(audioDir, selectedAudio);
            } else {
                // Pick a random file from the audio directory
                const audioFiles = fs.readdirSync(audioDir).filter(file => file.endsWith('.mp3'));
                if (audioFiles.length === 0) {
                    return interaction.reply({ content: "No audio files found in the directory.", ephemeral: true });
                }
                audioFile = path.join(audioDir, audioFiles[Math.floor(Math.random() * audioFiles.length)]);
            }

            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: guild.voiceAdapterCreator,
            });

            // Create and play the audio resource
            const audioPlayer = createAudioPlayer();
            const resource = createAudioResource(audioFile);

            audioPlayer.play(resource);
            connection.subscribe(audioPlayer);

            // Confirm the command
            await interaction.reply({ content: `Playing audio` });

            // Handle player events (optional)
            audioPlayer.on('idle', () => {
                connection.destroy(); // Disconnect after the audio ends
            });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: "There was an error playing the audio.", ephemeral: true });
        }
    }
};