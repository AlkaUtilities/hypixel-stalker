import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} from "discord.js";

import { start_tracker, intervalId } from "../../functions/tracker_loop";


module.exports = {
    data: new SlashCommandBuilder()
        .setName("track")
        .setDescription("Tracks player status")
        .addStringOption((str) =>
            str
                .setName("identifier")
                .setDescription("Username or UUID of the player")
                .setRequired(true)
        )
        .addNumberOption((num) =>
            num
                .setName("interval")
                .setDescription("Check interval")
                .setMinValue(1)
                .setRequired(false)
        )
        .addUserOption((usr) =>
            usr
                .setName("mention")
                .setDescription("Who to mention when a user goes online/offline")
                .setRequired(false)
        )
        .setDMPermission(false),
    global: false,
    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        await interaction.reply({
            content: `Starting tracker...`
        })

        if (intervalId) {
            return await interaction.editReply({ content: `There is already a tracker currently running, (${intervalId})` })
        }

        const identifier = interaction.options.getString('identifier', true);

        // if user did not set the interval, set it to 1
        const interval = interaction.options.getNumber('interval', false) ?? 1;

        const mention = interaction.options.getUser('mention', false);

        await start_tracker(identifier, Math.floor(interval * 1000), interaction.channelId, mention?.id);

        await interaction.editReply({
            content: `Tracker started. (\`${intervalId}\`)`
        })
    },
};
