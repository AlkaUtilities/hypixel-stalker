import { client } from "../index";
import { ChannelType, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';

export let intervalId: NodeJS.Timeout | undefined = undefined; 

export async function start_tracker(identifier: string, intervalMs: number = 10000, channelId: string, mentionId: string | undefined) {
    const channel = client.channels.cache.get(channelId);

    if (!channel || channel.type !== ChannelType.GuildText) return -1;

    const message = await channel.send({
        embeds: [
            new EmbedBuilder()
            .setTitle(`Tracking ${identifier}`)
            .setDescription("Fetching...")
            .setColor("#2b2d31")
            .setThumbnail(`http://cravatar.eu/helmhead/${identifier}/128.png`),
        ],
    })

    let currStatus = false;

    async function update_status(prevStatus: boolean | undefined = undefined) {
        const player = await client.hypixelClient.players.getStatus(identifier);
        if (prevStatus !== undefined && prevStatus !== player.online) {
            const channel = client.channels.cache.get(channelId);
            if (channel && channel.type === ChannelType.GuildText) {
                channel.send({
                    content: `${mentionId ? `<@${mentionId}>` : ''} ${identifier} is ${player.online ? "online" : "offline"} ${player.online ? `at ${player.gameType} ${player.mode}` : ''}`
                })
            }
            currStatus = player.online;
        }
        await message.edit({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Tracking ${identifier}`)
                .setDescription(
                    [
                        `**Status**: ${player.online ? "🟢 Online" : "🔴 Offline"}`,
                        `**Gamemode**: ${player.gameType?.toUpperCase()}, ${player.mode?.toUpperCase()}`,
                        `**Last checked**: <t:${Date.now().toString().slice(0, 10)}:R>`
                    ].join("\n")
                )
                .setColor(player.online ? "#008000" : "#FF0000")
                .setFooter({ text: intervalId ? String(intervalId) : "-" })
                .setThumbnail(`http://cravatar.eu/helmhead/${identifier}/128.png`),
            ]
        })
        return player;
    }

    const init = await update_status(); // <-- did this because setInterval() waits the interval before running on the first iteration
    currStatus = init.online;
    const interval = setInterval(() => update_status(currStatus), intervalMs);
    intervalId = interval;
}

export async function stop_tracker(interaction: ChatInputCommandInteraction) {
    if (intervalId === undefined) {
        const message = interaction.reply({
            content: `There is no tracker running.`
        })
    } else {
        clearInterval(intervalId);
        intervalId = undefined;
        
        const message = interaction.reply({
            content: `Tracker stopped. (\`${intervalId}\`)`
        })
    }
    
}

/**
 * 1. send embed msg
 * 2. set the loop that check the player status
 * 3. update embed for every check
 * 
 * <t:1725457920:R>  discord formatting
 *    1725457992989  Date.now() result
 */