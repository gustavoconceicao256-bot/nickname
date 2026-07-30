import { scanner } from "../utils/scanner.js";


export default async function(client){


    console.log(
        `Online como ${client.user.tag}`
    );


    let guild =
    client.guilds.cache.get(
        process.env.GUILD_ID
    );


    if(guild){


        scanner(guild);


        setInterval(()=>{

            scanner(guild);

        },600000);


    }


}
