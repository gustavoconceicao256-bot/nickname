import {
Client,
GatewayIntentBits
} from "discord.js";

import dotenv from "dotenv";

import "./keepAlive.js";

import ready from "./events/ready.js";
import guildMemberUpdate from "./events/guildMemberUpdate.js";


dotenv.config();


const client = new Client({

    intents:[

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers

    ]

});


client.once(
"ready",
()=>ready(client)
);



client.on(
"guildMemberUpdate",
(oldMember,newMember)=>
guildMemberUpdate(oldMember,newMember)
);



client.login(
process.env.TOKEN
);
