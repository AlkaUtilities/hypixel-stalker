import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} from "discord.js";


module.exports = {
    data: new SlashCommandBuilder()
        .setName("player_count")
        .setDescription("Get current player counts accross all games")
        .setDMPermission(true),
    global: false,
    execute(interaction: ChatInputCommandInteraction, client: Client) {
        interaction.reply({
            embeds: [
                new EmbedBuilder().setTitle("Fetching...").setColor("#2b2d31"),
            ],
            ephemeral: false,
        })
        .then(async () => {
            const playerCount = await client.hypixelClient.others.fetchCurrentPlayerCounts();
            interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Current Player Count")
                        .setDescription(
                            `**Player Count**: ${playerCount.playerCount}`)
                            .setColor("#2b2d31")
                ]
            })
        })
    },
};