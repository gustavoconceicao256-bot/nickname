import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import "./keepAlive.js";

import ready from "./Eventos/ready.js";
import guildMemberUpdate from "./Eventos/guildMemberUpdate.js";
import { scanner } from "./utils/scanner.js";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once("ready", async () => {
    await ready(client);

    console.log("🤖 Scanner de nomes iniciado");

    for (const guild of client.guilds.cache.values()) {
        await scanner(guild);
    }

    setInterval(async () => {
        for (const guild of client.guilds.cache.values()) {
            await scanner(guild);
        }
    }, 60000);
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    await guildMemberUpdate(oldMember, newMember);
});

client.login(process.env.TOKEN);
