import { Collection } from "discord.js";
import { Client as HypixelClient } from 'hypixel.ts'

// SUMMARY: Extends the client to show "client.commands", "client.events", and some other as valid properties from Client
declare module "discord.js" {
    interface Client {
        commands: Collection<unknown, any>;
        subCommands: Collection<unknown, any>;
        events: Collection<unknown, any>;
        config: Object<unknown, any>;
        hypixelClient: HypixelClient; 
    }
}

export {};