import { atualizarNick } from "../utils/nickname.js";


export default async function(
oldMember,
newMember
){


    const cargosAntigos = oldMember.roles.cache
        .map(role => role.id)
        .sort()
        .join(",");



    const cargosNovos = newMember.roles.cache
        .map(role => role.id)
        .sort()
        .join(",");



    // Se os cargos forem iguais, não faz nada
    if(cargosAntigos === cargosNovos){

        return;

    }



    // Se algum cargo mudou, atualiza o nickname
    await atualizarNick(newMember);


}
