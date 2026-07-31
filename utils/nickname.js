import cargos from "./cargos.js";
import ignorados from "./ignorados.js";


export async function atualizarNick(member){


    try {


        if(member.user.bot)
            return false;



        let cargoPrincipal = null;



        // Procura somente cargos da hierarquia

        for(const cargoId in cargos){


            // ignora cargos bloqueados

            if(ignorados.includes(cargoId))
                continue;



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



        // Se não tem cargo da hierarquia, não altera

        if(!cargoPrincipal)
            return false;



        let nickAtual =
            member.nickname ||
            member.user.username;



        let nomeLimpo = nickAtual;



        // Remove prefixos da própria hierarquia

        for(const cargoId in cargos){


            nomeLimpo = nomeLimpo.replace(
                cargos[cargoId].prefixo,
                ""
            );


        }



        // Remove prefixos cosméticos que aparecerem no nick

        while(
            /^『[^』]+』\s*/.test(nomeLimpo)
        ){

            nomeLimpo = nomeLimpo.replace(
                /^『[^』]+』\s*/,
                ""
            );

        }



        nomeLimpo = nomeLimpo.trim();



        // Proteção contra apagar nome

        if(
            !nomeLimpo ||
            nomeLimpo.length < 3
        ){

            console.log(
                `Ignorado por segurança: ${member.user.tag}`
            );

            return false;

        }



        const novoNick =
            `${cargoPrincipal.prefixo} ${nomeLimpo}`;



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
