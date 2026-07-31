import {
    Client,
    GatewayIntentBits
} from "discord.js";

import dotenv from "dotenv";

import "./keepAlive.js";

import ready from "./Eventos/ready.js";
import guildMemberUpdate from "./Eventos/guildMemberUpdate.js";
import { scanner } from "./utils/scanner.js";


dotenv.config();


const client = new Client({

    intents:[

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers

    ]

});



client.once(
"ready",
async ()=>{

    ready(client);


    console.log("🤖 Scanner de nomes iniciado");


    // Faz a primeira verificação quando o bot liga
    for(const guild of client.guilds.cache.values()){

        scanner(guild);

    }



    // Verifica a cada 1 minuto
    setInterval(()=>{

        for(const guild of client.guilds.cache.values()){

            scanner(guild);

        }

    },60000);


});



client.on(
"guildMemberUpdate",
(oldMember,newMember)=>
guildMemberUpdate(oldMember,newMember)
);



client.login(
process.env.TOKEN
);
