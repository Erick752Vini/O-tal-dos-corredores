const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando")
});

app.use((req, res, next)=> {
    res.status(404).json ({
        erro: "Rota não encontrada"
    })
});

module.exports = app;
