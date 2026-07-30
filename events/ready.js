import { scanner } from "../utils/scanner.js";


export default async function(client){


    console.log(
        `Online como ${client.user.tag}`
    );


    const guild = 
    client.guilds.cache.get(
        process.env.GUILD_ID
    );


    if(!guild){

        console.log(
            "Servidor não encontrado"
        );

        return;

    }



    console.log(
        "Iniciando primeira varredura..."
    );


    await scanner(guild);



    setInterval(async ()=>{


        console.log(
            "Executando varredura automática..."
        );


        await scanner(guild);



    }, 600000);



}
