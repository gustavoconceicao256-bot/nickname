client.once(
"ready",
async ()=>{

    ready(client);


    console.log("🤖 Scanner de nomes iniciado");


    // Faz uma verificação assim que liga
    for(const guild of client.guilds.cache.values()){

        scanner(guild);

    }


    // Repete a cada 1 minuto
    setInterval(()=>{

        for(const guild of client.guilds.cache.values()){

            scanner(guild);

        }

    },60000);


});
