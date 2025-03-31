// importando a biblioteca axios (consumir api externa)
const axios = require('axios');
const { pool } = require('../../../config/database');

class EnderecoModel{
    static async listarEnderecos(){
        const consulta = `select * from endereco`
        const resultado = await pool.query(consulta);
        return resultado.rows
    }

    static async listarEndereco(matricula){
        const dados = [matricula];
        const consulta = `select aluno.*, endereco.*
         from aluno
         join endereco on aluno.matricula = endereco.matricula_id
         where aluno.matricula = $1`
        // o segundo parametro sempre tem que ser um array
        const resultado = await pool.query(consulta, dados);
        return resultado.rows
    }

    static async listarEnderecoCEP(cep){
        const dados = [cep];
        const consulta = `select * from endereco where cep = $1`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows
    }

    static async listarEnderecoCidade(cidade){ 
        const dados = [`%${cidade}%`];
        const consulta = `select * from endereco where lower(localidade) like lower($1)`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows
    }

    static async criarEndereco(matricula, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        // Desestruturação do objeto
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data;
        // const logradouro = resposta.data.logradouro;
        // const complemento = resposta.data.complemento;
        // const bairro = resposta.data.bairro;
        // const localidade = resposta.data.localidade;
        // const uf = resposta.data.uf;
        // montando o array para a query
        const dados = [
            matricula,
            cep, 
            logradouro,
            numero,
            bairro, 
            complemento,
            uf,
            localidade,
            ponto_referencia
        ]

        const consulta = `insert into endereco(matricula_id, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia)
        values($1, $2, $3, $4, $6, $5, $8, $7, $9) returning *`;

        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async editarEndereco(matricula, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data;

        const dados = [
            cep, 
            logradouro,
            numero,
            bairro, 
            complemento,
            uf,
            localidade,
            ponto_referencia,
            matricula
        ]
        

        const consulta = `update endereco set cep = $1, logradouro = $2, numero = $3, complemento = $5, bairro = $4, localidade = $7, 
        uf = $6, ponto_referencia = $8
        where matricula_id = $9 returning *`;

        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }
}

module.exports = EnderecoModel;