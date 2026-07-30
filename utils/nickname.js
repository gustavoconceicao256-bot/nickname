import cargos from "./cargos.js";


export async function atualizarNick(member){


    if(member.user.bot) return;


    let cargoEncontrado = null;


    for(const id in cargos){


        if(member.roles.cache.has(id)){


            let cargo = cargos[id];


            if(
                !cargoEncontrado ||
                cargo.prioridade > cargoEncontrado.prioridade
            ){

                cargoEncontrado = cargo;

            }

        }

    }


    if(!cargoEncontrado) return;


    let nickAtual = member.nickname || member.user.username;


    let nomeLimpo = nickAtual;


    for(const id in cargos){

        nomeLimpo = nomeLimpo.replace(
            cargos[id].prefixo,
            ""
        );

    }


    nomeLimpo = nomeLimpo.trim();


    let novoNick =
    `${cargoEncontrado.prefixo}${nomeLimpo}`;


    if(nickAtual === novoNick) return;


    await member.setNickname(novoNick)
    .catch(()=>{});


}
