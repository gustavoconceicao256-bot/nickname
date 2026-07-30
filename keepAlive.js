import express from "express";

const app = express();

app.get("/", (req,res)=>{

    res.send("Nickname Bot Online");

});


app.listen(process.env.PORT || 3000, ()=>{

    console.log("KeepAlive iniciado");

});
