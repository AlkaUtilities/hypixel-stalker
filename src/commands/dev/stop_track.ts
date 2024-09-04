import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} from "discord.js";

import { stop_tracker } from "../../functions/tracker_loop";


module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop_track")
        .setDescription("Stop tracker")
        .setDMPermission(false),
    global: false,
    execute(interaction: ChatInputCommandInteraction, client: Client) {
        stop_tracker(interaction);
    },
};
