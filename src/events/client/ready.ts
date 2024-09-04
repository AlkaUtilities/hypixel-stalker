
import chalk from "chalk";
import { Client } from "discord.js";
import { load_commands } from "../../handlers/command_handler";
import { start_tracker } from "../../functions/tracker_loop";

module.exports = {
    name: "ready",
    once: true,
    execute(client: Client) {
        console.log(
            chalk.green(
                `[CLIENT] Logged in as ${chalk.yellow(client.user?.tag)}`
            )
        );

        load_commands(client, true).then(() => {
            if (process.argv[2] === "--test") process.exit(0);
        });
    },
};
