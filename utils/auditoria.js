export async function pegarNickAntigo(guild, member){

    try {

        const logs = await guild.fetchAuditLogs({

            limit: 50,
            type: 24

        });


        const registro = logs.entries.find(log =>

            log.target?.id === member.id &&
            log.changes?.some(
                c => c.key === "nick"
            )

        );


        if(!registro)
            return null;


        const mudanca = registro.changes.find(
            c => c.key === "nick"
        );


        return mudanca.old || null;


    } catch(error){

        console.log(
            "Erro lendo auditoria:",
            error.message
        );

        return null;

    }

}
