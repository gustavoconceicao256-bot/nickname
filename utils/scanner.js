import { atualizarNick } from "./nickname.js";


export async function scanner(guild){

    try {

        console.log("🔎 Iniciando varredura...");


        await guild.members.fetch();



        let corrigidos = 0;



        for(const membro of guild.members.cache.values()){


            const resultado = await atualizarNick(membro);


            if(resultado){

                corrigidos++;

            }


        }



        console.log(
            `✅ Varredura finalizada. Corrigidos: ${corrigidos}`
        );



    } catch(error){

        console.log(
            "Erro na varredura:",
            error
        );

    }


}
