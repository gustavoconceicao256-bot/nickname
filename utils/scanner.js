import { atualizarNick } from "./nickname.js";


export async function scanner(guild){

    try {

        console.log("🔎 Iniciando varredura...");


        await guild.members.fetch();


        let corrigidos = 0;


        const membros = [
            ...guild.members.cache.values()
        ];



        // Processa 10 membros por vez

        for(let i = 0; i < membros.length; i += 10){


            const lote = membros.slice(i, i + 10);



            const resultados = await Promise.all(
                lote.map(membro => atualizarNick(membro))
            );



            corrigidos += resultados.filter(Boolean).length;



            // pequena pausa para não tomar rate limit

            await new Promise(resolve =>
                setTimeout(resolve, 1000)
            );


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
