const express = require('express');

const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {

// Criar uma tabela de exemplo
db.run("CREATE TABLE user (id INT,name TEXT)");

const stmt = db.prepare("INSERT INTO user(id, name) VALUES (?, ?)");
stmt.run(1, 'Thiago');
stmt.run(1, 'Ana');
stmt.finalize();
});


// Definindo uma rota básica
app.get('/users', (req, res) => {
    db.all("SELECT * FROM user", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});







