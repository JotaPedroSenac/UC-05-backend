const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/configDb');
// const alunoRoutes = require('./src/modules/aluno/routes/index');
// const enderecoRoutes = require('./src/modules/endereco/routes/index');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());
// rota de aluno
// app.use(alunoRoutes); 
// app.use("/api", professorRoutes); 
// rota de endereco
// app.use(enderecoRoutes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado com sucesso');
  } catch (error) {
    console.error('Falha na conexão com o banco', error);
  }
  console.log(`Servidor rodando em http://localhost:${port}`);
});
