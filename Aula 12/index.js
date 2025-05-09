const express = require('express');
const dotenv = require('dotenv');
const alunoRoutes = require('./src/modules/aluno/routes/index');
const enderecoRoutes = require('./src/modules/endereco/routes/index');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());
// rota de aluno
app.use(alunoRoutes); 
// app.use("/api", professorRoutes); 
// rota de endereco
app.use(enderecoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
