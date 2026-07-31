import cargos from "./cargos.js";


export async function atualizarNick(member){


    try {


        if(member.user.bot)
            return false;



        let cargoPrincipal = null;



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



        if(!cargoPrincipal)
            return false;



        let nickAtual =
            member.nickname ||
            member.user.username;



        let nomeLimpo = nickAtual;



        // Remove somente prefixos do seu sistema
        for(const cargoId in cargos){


            nomeLimpo = nomeLimpo.replace(
                cargos[cargoId].prefixo,
                ""
            );


        }



        // Remove somente 『ALGUMA COISA』 no começo
        while(
            /^『[^』]+』\s*/.test(nomeLimpo)
        ){

            nomeLimpo = nomeLimpo.replace(
                /^『[^』]+』\s*/,
                ""
            );

        }



        nomeLimpo = nomeLimpo.trim();



        // Segurança: se o nome ficar vazio, não altera

        if(
            !nomeLimpo ||
            nomeLimpo.length < 3
        ){

            console.log(
                `Ignorado para segurança: ${member.user.tag}`
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
