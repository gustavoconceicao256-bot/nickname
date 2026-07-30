import { atualizarNick } from "../utils/nickname.js";


export default async function(oldMember,newMember){


    if(
        oldMember.roles.cache.size !==
        newMember.roles.cache.size
    ){

        atualizarNick(newMember);

    }


}
