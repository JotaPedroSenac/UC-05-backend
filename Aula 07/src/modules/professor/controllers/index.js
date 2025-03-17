const ProfessorModel = require('../models/index');

class professorController{
    static async criar(requisicao, resposta){
        try {
            const { matricula, nome, email, senha, turma } = requisicao.body;
            if(!matricula || !nome || !email || !senha || !turma){
                return resposta.status(200).json({mensagem: "Todos os campos devem ser preenchidos"})
            }
            const novoProfessor = await ProfessorModel.criar(matricula, nome, email, senha, turma);
            resposta.status(201).json({mensagem: "Professor criado com sucesso", professor: novoProfessor})
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao criar o professor!", erro: error.message})
        }
    }
    static async editar(requisicao, resposta){

    }
    static async listarTodos(requisicao, resposta){
        try {
            // const { matricula, nome, email, senha } = requisicao.body;
            const professores = await ProfessorModel.listar();
            if (professores.length === 0) {
                return resposta.status(400).json({ mensagem: "Banco de dados vazio" });
            }
            resposta.status(200).json(professores);
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao listar professores!", erro: error.message})
        }
    }
    static async listarPorMatricula(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const professor = await ProfessorModel.listarPorMatricula(matricula)
            if (!professor) {
                return resposta.status(400).json({ mensagem: "professor não encontrado" });
            }
            resposta.status(200).json(professor);
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao listar professor!", erro: error.message});
        }
    }
    static async excluirPorMatricula(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula;
            const exclusao = await ProfessorModel.excluirPorMatricula(matricula);
            if (!exclusao) {
                return resposta.status(400).json({ mensagem: "professor não encontrado" });
            }
            resposta.status(200).json({mensagem: "professor deletado com sucesso"});
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao deletar professor!", erro: error.message});
        }
    }
    static async excluirTodos(requisicao, resposta){
        try {
            await ProfessorModel.excluirTodos;
            resposta.status(200).json({mensagem: "Todos os professores foram deletados"});
        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao deletar professores!", erro: error.message});
        }
    }
}