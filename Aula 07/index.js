
const express = require('express');
const pool = require('./src/config/database');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());


app.get('/produtos', async (requisicao, resposta) => {
  try {

    const consulta = `select * from produto`;
    const produtos = await pool.query(consulta);

    if (produtos.rows.length === 0) {
      return resposta.status(200).json({ mensagem: "Banco de dados vazio" });
    }

    resposta.status(200).json(produtos.rows);

  } catch (error) {
    resposta.status(500).json(
      {
        msg: "Erro ao buscar produtos",
        erro: error.mensagem
      }
    );
  }

});


// outro get

app.get('/produtos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const produto = bancoDados.find(elemento => elemento.id === id);
    if (!produto) {
      return resposta.status(404).json({mensagem: "Produto não encontrado"})
    }

    resposta.status(200).json(produto);
  } catch (error) {
    resposta.status(500).json(
      {
        msg: "Erro ao buscar produto",
        erro: error.mensagem
      }
    );
  }
})

app.post('/produtos', async (requisicao, resposta) => {
  try {
    const { nome, preco, quantidade } = requisicao.body;

    if (!nome || !preco || !quantidade) {
      return resposta.status(200).json({ mensagem: "todos os dados devem ser informados" })
    }

    const novoProduto = [id, nome, preco, quantidade ];
    const consulta = `insert into produto (nome, preco, quantidade) values ($1, $2, $3) returning * `

    await pool.query(consulta, novoProduto);

    resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json(
      {
        msg: "Erro ao cadastrar produtos",
        erro: error.mensagem
      }
    );
  }
});



app.put('/produtos/:id', async (requisicao, resposta) => {

  try {

    const id = requisicao.params.id;
  if(!id){
    return resposta.status(404).json({mensagem: "Informe um parâmetro"})
  }

  const {novoNome, novoPreco, novaQuantidade} = requisicao.body;

  const parametro = [id];
  const consulta = `select * from where id=$1`;
  const resultado = await pool.query(consulta, parametro);

  if(resultado.rows.length === 0){
    return resposta.status(404).json({mensagem: "Produto não encontrado"})
  }

  const dados = [id, novoNome, novoPreco, novaQuantidade]
  const consulta2 = `update produto set nome = $2, preco = $3, quantidade = $4 where id = 1 returning *`;

  await pool.query(consulta2, dados)

  resposta.status(200).json({msg: "Produto atualizado com sucesso"});
    
  } catch (error) {
    resposta.status(500).json(
      {
        msg: "Erro ao atualizar produtos",
        erro: error.mensagem
      }
    );
  }
  

})

app.delete('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const parametro = [id];
    const consulta = `select * from where id=$1`;
    const resultado = await pool.query(consulta, parametro);

    if (resultado.rows.length === 0) {
      return resposta.status(404).json({mensagem: "Produto não encontrado"});
    }

    const consulta2 = `delete from produto where id = $1`;
    

    resposta.status(200).json({mensagem: "Produto deletado com sucesso"})
  } catch (error) {
    resposta.status(500).json(
      {
        msg: "Erro ao deletar produtos",
        erro: error.mensagem
      }
    );
  }
});

// deletar tudo

app.delete('/produtos', (requisicao, resposta) => {

  try {
    bancoDados.length = 0;
    resposta.status(200).json({mensagem: "Produtos deletados com sucesso"})

  } catch (error) {
    resposta.status(500).json(
      {
        msg: "Erro ao deletar produtos",
        erro: error.mensagem
      }
    );
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
