import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} from "discord.js";


module.exports = {
    data: new SlashCommandBuilder()
        .setName("track")
        .setDescription("Track a player")
        .addStringOption((str) =>
            str
                .setName("identifier")
                .setDescription("Username or UUID of the player")
                .setRequired(true)
        )
        .setDMPermission(true),
    global: false,
    execute(interaction: ChatInputCommandInteraction, client: Client) {
        const identifier = interaction.options.getString('identifier', true);
        

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${identifier}`)
                .setDescription("Fetching...")
                .setColor("#2b2d31")
                .setThumbnail(`http://cravatar.eu/helmhead/${identifier}/128.png`),
            ],
            ephemeral: false,
        })
        .then(async () => {
            const player = await client.hypixelClient.players.getStatus(identifier);
            console.log(player);
            interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(`${identifier}`)
                    .setDescription(
                        [
                            `**Status**: ${player.online ? "🟢 Online" : "🔴 Offline"}`,
                                 `${player.online ? `**Gamemode**: ${player.gameType.toUpperCase()}, ${player.mode.toUpperCase()}` : ""}`
                        ].join("\n")
                    )
                    .setColor("#2b2d31")
                    .setThumbnail(`http://cravatar.eu/helmhead/${identifier}/128.png`)
,
                ]
            })
        })
    },
};