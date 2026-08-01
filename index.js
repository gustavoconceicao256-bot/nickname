import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import "./keepAlive.js";

import ready from "./events/ready.js";
import guildMemberUpdate from "./events/guildMemberUpdate.js";
import { scanner } from "./utils/scanner.js";


dotenv.config();



const client = new Client({

    intents:[

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers

    ]

});



// ===============================
// ERROS PARA NÃO DERRUBAR O BOT
// ===============================

process.on(
    "unhandledRejection",
    error => {

        console.error(
            "Erro não tratado:",
            error
        );

    }
);


process.on(
    "uncaughtException",
    error => {

        console.error(
            "Erro crítico:",
            error
        );

    }
);



// ===============================
// BOT ONLINE
// ===============================

client.once(
    "ready",
    async ()=>{


        await ready(client);


        console.log(
            "🤖 Scanner iniciado"
        );



        async function iniciarScanner(){


            try{


                for(
                    const guild of client.guilds.cache.values()
                ){

                    await scanner(guild);

                }



                console.log(
                    "✅ Scanner finalizado:",
                    new Date().toLocaleString()
                );



            }catch(error){


                console.error(
                    "Erro no scanner:",
                    error
                );


            }



            // espera 1 minuto antes do próximo

            setTimeout(
                iniciarScanner,
                60000
            );


        }



        iniciarScanner();


    }
);



// ===============================
// ALTERAÇÃO DE CARGO/NICK
// ===============================

client.on(
    "guildMemberUpdate",
    async(
        oldMember,
        newMember
    )=>{


        try{

            await guildMemberUpdate(
                oldMember,
                newMember
            );


        }catch(error){


            console.error(
                "Erro guildMemberUpdate:",
                error
            );


        }


    }
);



// ===============================
// CONEXÃO
// ===============================

client.on(
    "disconnect",
    ()=>{

        console.log(
            "⚠️ Discord desconectou"
        );

    }
);



client.on(
    "reconnecting",
    ()=>{

        console.log(
            "🔄 Reconectando..."
        );

    }
);



// ===============================
// LOGIN
// ===============================

client.login(
    process.env.TOKEN
);
