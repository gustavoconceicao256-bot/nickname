import cargos from "./cargos.js";


export async function atualizarNick(member){


    try {


        if(member.user.bot)
            return false;



        let cargoPrincipal = null;



        // Procura somente cargos cadastrados no cargos.js

        for(const cargoId in cargos){


            if(member.roles.cache.has(cargoId)){


                const cargo = cargos[cargoId];



                if(
                    !cargoPrincipal ||
                    cargo.prioridade > cargoPrincipal.prioridade
                ){

                    cargoPrincipal = cargo;

                }


            }


        }



        // Se não tiver cargo da hierarquia, não mexe

        if(!cargoPrincipal)
            return false;



        let nickAtual =
            member.nickname ||
            member.user.username;



        let nomeLimpo = nickAtual;



        // Remove prefixos cadastrados no sistema

        for(const cargoId in cargos){


            nomeLimpo = nomeLimpo.replace(
                cargos[cargoId].prefixo,
                ""
            );


        }



        // Remove apenas prefixos no formato 『M』 『FAR』 『VIP』
        // somente se estiverem no começo do nome

        nomeLimpo = nomeLimpo.replace(
            /^『[^』]+』\s*/g,
            ""
        );



        nomeLimpo = nomeLimpo.trim();



        // Cria o nickname correto

        const novoNick =
            `${cargoPrincipal.prefixo} ${nomeLimpo}`;



        // Evita editar se já estiver certo

        if(nickAtual === novoNick)
            return false;



        await member.setNickname(novoNick);



        console.log(
            `Nick atualizado: ${member.user.tag} -> ${novoNick}`
        );



        return true;



    } catch(error){


        console.log(
            `Erro alterando nick de ${member.user.tag}:`,
            error.message
        );


        return false;


    }


}
