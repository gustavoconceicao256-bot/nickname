import { atualizarNick } from "./nickname.js";


export async function scanner(guild){


    console.log("Iniciando varredura...");


    await guild.members.fetch();


    for(const member of guild.members.cache.values()){


        await atualizarNick(member);


    }


    console.log("Varredura finalizada");


}
