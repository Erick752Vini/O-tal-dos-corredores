const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

app.get("/pace-de-moto", (req, res, next) => {
    return res.status(200).sendFile("senna.html", {root: './'});
});

// Dados mock para pilotos
const pilotos = [
    { id_piloto: 1, nome: "Ayrton Senna", nacionalidade: "Brasil", equipe: "McLaren", titulos: 3 },
    { id_piloto: 2, nome: "Alain Prost", nacionalidade: "França", equipe: "McLaren", titulos: 4 },
    { id_piloto: 3, nome: "Michael Schumacher", nacionalidade: "Alemanha", equipe: "Ferrari", titulos: 7 },
    { id_piloto: 4, nome: "Lewis Hamilton", nacionalidade: "Reino Unido", equipe: "Mercedes", titulos: 7 },
    { id_piloto: 5, nome: "Nelson Piquet", nacionalidade: "Brasil", equipe: "Williams", titulos: 3 }
];

// Dados mock para equipes
const equipes = [
    { nome: "McLaren" },
    { nome: "Ferrari" },
    { nome: "Williams" },
    { nome: "Mercedes" },
    { nome: "Red Bull" }
];

// Dados mock para temporadas
let temporadas = [
    { id: 1, ano: 2024 },
    { id: 2, ano: 2023 }
];

app.get("/pilotos", (req, res) => {
    return res.status(200).json(pilotos);
});

app.get("/pilotos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const piloto = pilotos.find(p => p.id_piloto === id);
    if (piloto) {
        return res.status(200).json([piloto]);
    }
    return res.status(200).json([]);
});

app.get("/equipes", (req, res) => {
    return res.status(200).json(equipes);
});

app.post("/temporada", (req, res) => {
    const temporada = req.body.temporada;
    const novaTemporada = { id: temporadas.length + 1, ano: temporada };
    temporadas.push(novaTemporada);
    return res.status(201).json([{ insertId: novaTemporada.id }]);
});

app.use((req, res, next) => {
    const error = new Error("Not found...");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;
