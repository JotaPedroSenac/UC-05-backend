const express = require('express');
const dotenv = require('dotenv');
const alunoRoutes = require('./src/modules/aluno/routes/index');
const enderecoRoutes = require('./src/modules/endereco/routes/index');
const cors = require('cors');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());
app.use(cors());
app.use(alunoRoutes); 
// app.use("/api", professorRoutes); 
app.use(enderecoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
