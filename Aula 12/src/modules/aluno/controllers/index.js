const AlunoModel = require('../models/index');

class AlunoController{
    static async criar(requisicao, resposta){
        try {
            const { matricula, nome, email, senha } = requisicao.body;
            if(!matricula || !nome || !email || !senha){
                return resposta.status(200).json({mensagem: "Todos os campos devem ser preenchidos"})
            }
            const novoAluno = await AlunoModel.criar(matricula, nome, email, senha);
            resposta.status(201).json({mensagem: "Aluno criado com sucesso", aluno: novoAluno})
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao criar o aluno!", erro: error.message})
        }
    }
    static async editar(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const { nome, email, senha } = requisicao.body;
            if (!nome || !email || !senha) {
                return resposta.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const alunoEditado = await AlunoModel.editar(matricula, nome, email, senha);
            if(alunoEditado.length === 0){
                return resposta.status(400).json({mensagem: "matricula está errada ou não existe"});
            }
            resposta.status(201).json({mensagem: "Aluno editado com sucesso", aluno: alunoEditado});
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao editar o aluno!", erro: error.message})
        }
    }
    static async listarTodos(requisicao, resposta){
        try {
            // const { matricula, nome, email, senha } = requisicao.body;
            const alunos = await AlunoModel.listar();
            if (alunos.length === 0) {
                return resposta.status(400).json({ mensagem: "Banco de dados vazio" });
            }
            resposta.status(200).json(alunos);
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao listar alunos!", erro: error.message})
        }
    }
    static async listarPorMatricula(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const aluno = await AlunoModel.listarPorMatricula(matricula)
            if (aluno.length === 0) {
                return resposta.status(400).json({ mensagem: "Aluno não encontrado" });
            }
            resposta.status(200).json(aluno);
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao listar aluno!", erro: error.message})
        }
    }
    static async excluirPorMatricula(requisicao, resposta){
            try {
                const matricula = requisicao.params.matricula;
                const aluno = await AlunoModel.listarPorMatricula(matricula);
                if (!aluno) {
                    return resposta.status(400).json({ mensagem: "aluno não encontrado" });
                }
                await AlunoModel.excluirPorMatricula(matricula);
                resposta.status(200).json({mensagem: "aluno deletado com sucesso"});
            } catch (error) {
                resposta.status(500).json({mensagem: "Erro ao deletar aluno!", erro: error.message});
            }
    }
    static async excluirTodos(requisicao, resposta){
        try {
            await AlunoModel.excluirTodos();
            resposta.status(200).json({mensagem: "Todos os alunos foram deletados"});
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao deletar alunos!", erro: error.message});
        }
    }
}

module.exports = AlunoController ;