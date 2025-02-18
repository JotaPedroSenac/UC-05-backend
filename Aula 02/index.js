// Importando com (ESM)
// import express from 'express';
// import dotenv from 'dotenv';

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

const bancoDados = [];

app.get('/produtos', (requisicao, resposta) => {
  try {
    if (bancoDados.length === 0) {
      return resposta.status(200).json({ mensagem: "Banco de dados vazio" });
    }

    resposta.status(200).json(bancoDados);

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

app.post('/produtos', (requisicao, resposta) => {
  try {
    const { id, nome, preco } = requisicao.body;

    if (!id || !nome || !preco) {
      return resposta.status(200).json({ mensagem: "todos os dados devem ser informados" })
    }

    const novoProduto = { id, nome, preco };
    bancoDados.push(novoProduto);
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

app.put('/produtos/:id', (requisicao, resposta) => {

  try {

    const id = requisicao.params.id;
  if(!id){
    return resposta.status(404).json({mensagem: "Informe um parâmetro"})
  }
  const produto = bancoDados.find((produtos) => produtos.id === id);
  if(!produto){
    return resposta.status(404).json({mensagem: "Produto não encontrado"})
  }

  const {novoNome, novoPreco} = requisicao.body;

  if (produto) {
      produto.nome = novoNome
      produto.preco = novoPreco
  }

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

app.delete('/produtos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const index = bancoDados.findIndex(elemento => elemento.id === id);
    if (index === -1) {
      return resposta.status(404).json({mensagem: "Produto não encontrado"});
    }

    bancoDados.splice(index, 1);
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
