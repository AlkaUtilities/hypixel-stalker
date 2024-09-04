import dotenv from "dotenv";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import chalk from "chalk";
import { load_events } from "./handlers/event_handler";
import anticrash from "./handlers/anticrash";
import config from "./config";
import { Client as HypixelClient } from "hypixel.ts";

dotenv.config({ path: __dirname + "\\..\\.env" });

const { Guilds, GuildMembers, GuildMessages, GuildPresences, DirectMessages } =
    GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [
        Guilds,
        GuildMembers,
        GuildMessages,
        GuildPresences,
        DirectMessages,
    ],
    partials: [User, Message, GuildMember, ThreadMember],
});

const hypixelClient = new HypixelClient({ apiKey: process.env.HYPIXEL_API }).start();

if (process.env.ANTICRASH) anticrash(client, process.env.ANTICRASH);

// Configs (objects)
client.config = config;
client.hypixelClient = hypixelClient;


// Collections (Discord.Collection)
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();

load_events(client);

client.login(process.env.TOKEN);

export { client };